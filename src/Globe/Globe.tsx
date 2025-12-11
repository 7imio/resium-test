import { Viewer as CesiumViewer, Entity, HeadingPitchRange, MapMode2D } from 'cesium';
import type React from 'react';
import { useEffect, useRef, useState } from 'react';
import { Viewer, type CesiumComponentRef } from 'resium';
import { mockSpaceObjects } from '../mocks/mock-spaceObjects';
import type { SpaceObject } from '../types/spaceObject';
import {
  setOrbitVisibility,
  setPointsVisibility,
  type ActivePropagationConfig,
  type PerObjectVisibility,
  type PropagationUiParams,
} from '../utils/globe-helper';
import Entities from './Entities';
import InfoPanel from './InfoPanel';
import UiOverlay from './UiOverlay';

const PROPAGATION_ZOOM_DELTA = 3_000_000.0; // à ajuster selon l’échelle de ta scène

const Globe: React.FC = () => {
  const [selectedEntity, setSelectedEntity] = useState<Entity | undefined>(undefined);
  const [spaceObject, setSpaceObject] = useState<SpaceObject | undefined>(undefined);

  // visibilité par OS
  const [perObjectVisibility, setPerObjectVisibility] = useState<Record<string, PerObjectVisibility>>({});

  // paramètres globaux de sampling pour les points
  const [propagationUiParams, setPropagationUiParams] = useState<PropagationUiParams | undefined>(undefined);

  const viewerRef = useRef<CesiumComponentRef<CesiumViewer> | null>(null);
  function getVisibilityFor(id: string): PerObjectVisibility {
    return (
      perObjectVisibility[id] ?? {
        showOrbit: true, // par défaut on affiche les traits
        showPoints: false, // points off par défaut
      }
    );
  }

  const FOCUS_RANGE = 500_000; // distance "proche" pour bien voir le satellite
  const PROPAGATION_RANGE = 5_000_000; // distance "loin" pour bien voir l'orbite + points

  const handleZoomOutFromObject = () => {
    const viewer = viewerRef.current?.cesiumElement;
    if (!viewer || !spaceObject) return;

    const entity = viewer.entities.getById(spaceObject.id);
    if (!entity) return;

    const camera = viewer.camera;

    const offset = new HeadingPitchRange(camera.heading, camera.pitch, PROPAGATION_RANGE);

    viewer.camera.zoomOut(PROPAGATION_ZOOM_DELTA);
  };

  const handleRecenterOnObject = () => {
    const viewer = viewerRef.current?.cesiumElement;
    if (!viewer || !spaceObject) return;

    const entity = viewer.entities.getById(spaceObject.id);
    if (!entity) return;

    const camera = viewer.camera;
    viewer.camera.zoomIn(PROPAGATION_ZOOM_DELTA);
  };
  const handleRefocusOnObject = () => {
    const viewer = viewerRef.current?.cesiumElement;
    if (!viewer || !spaceObject) return;

    const entity = viewer.entities.getById(spaceObject.id);
    if (!entity) return;

    // Le refocus se comporte comme un vrai flyTo "centrage parfait"
    viewer.trackedEntity = entity;
  };
  const activePropagationConfig: ActivePropagationConfig | undefined = propagationUiParams
    ? (() => {
        const { startIso, endIso, stepValue, stepUnit } = propagationUiParams;
        const stepSeconds = stepUnit === 'seconds' ? stepValue : stepUnit === 'minutes' ? stepValue * 60 : stepValue * 3600;
        if (stepSeconds <= 0) return undefined;
        return {
          startIso,
          endIso,
          stepSeconds,
        };
      })()
    : undefined;

  useEffect(() => {
    if (!spaceObject) return;

    setPropagationUiParams((prev) => {
      if (prev) return prev;

      const epoch = new Date(spaceObject.epochIso);
      const halfDayMs = 12 * 3600 * 1000;

      const defaultStart = new Date(epoch.getTime() - halfDayMs);
      const defaultEnd = new Date(epoch.getTime() + halfDayMs);

      const toInputValue = (d: Date) => d.toISOString().slice(0, 16); // "YYYY-MM-DDTHH:MM"

      return {
        startIso: toInputValue(defaultStart),
        endIso: toInputValue(defaultEnd),
        stepValue: 30,
        stepUnit: 'minutes',
      };
    });
  }, [spaceObject]);

  useEffect(() => {
    if (viewerRef.current) {
      tweakPerformances(viewerRef.current.cesiumElement);
    }
  }, [viewerRef]);

  const tweakPerformances = (viewer: CesiumViewer | undefined) => {
    if (!viewer) return;
    viewer.shadows = false;
    viewer.scene.globe.enableLighting = false;
    viewer.scene.globe.showGroundAtmosphere = false;
    viewer.scene.highDynamicRange = false;
  };
  const handleFocusSatellite = (so: SpaceObject) => {
    const viewer = viewerRef.current?.cesiumElement;
    if (!viewer) return;

    const entity = viewer.entities.getById(so.id);
    if (!entity) {
      console.warn('Aucune entité trouvée pour', so.id);
      return;
    }

    setSelectedEntity((prev: Entity | undefined) => {
      if (!prev) return entity;
      if (prev.id === entity.id) return undefined;
      return entity;
    });

    const currentSpaceObject = mockSpaceObjects.find((candidate) => candidate.id === entity.id);

    setSpaceObject((prev: SpaceObject | undefined) => {
      if (!prev) return currentSpaceObject;
      if (prev.id === entity.id) return undefined;
      return currentSpaceObject;
    });
  };
  const handleClickSpaceObject = (so: SpaceObject) => {
    handleFocusSatellite(so);
  };

  useEffect(() => {
    const viewer = viewerRef.current?.cesiumElement;
    if (!viewer) return;

    viewer.clock.multiplier = 60; // vitesse du temps (x60 ici)
    viewer.clock.shouldAnimate = true; // play
  }, []);

  useEffect(() => {
    const viewer = viewerRef.current?.cesiumElement;
    if (!viewer) return;
    const handler = viewer.selectedEntityChanged.addEventListener((newEntity) => {
      if (!newEntity) {
        setSelectedEntity(undefined);
        viewer.selectedEntity = undefined;
        viewer.trackedEntity = undefined;
        return;
      }
      setSelectedEntity(newEntity);
    });
    return () => handler();
  }, []);

  const visibilityForSelected = spaceObject ? getVisibilityFor(spaceObject.id) : undefined;

  return (
    <>
      <UiOverlay viewerRef={viewerRef} handleFocusSatellite={handleFocusSatellite} />

      {selectedEntity && spaceObject && visibilityForSelected && (
        <InfoPanel
          spaceObject={spaceObject}
          selectedEntity={selectedEntity}
          showOrbit={visibilityForSelected.showOrbit}
          showPoints={visibilityForSelected.showPoints}
          onToggleOrbit={(show) => setOrbitVisibility(spaceObject.id, show, setPerObjectVisibility)}
          onTogglePoints={(show) => setPointsVisibility(spaceObject.id, show, setPerObjectVisibility)}
          propagationParams={propagationUiParams}
          onChangePropagationParams={setPropagationUiParams}
          onZoomOutFromObject={handleZoomOutFromObject}
          onRecenterOnObject={handleRecenterOnObject}
          handleRefocusOnObject={handleRefocusOnObject}
        />
      )}

      <Viewer ref={viewerRef} full infoBox={false} selectedEntity={selectedEntity} trackedEntity={selectedEntity} mapMode2D={MapMode2D.ROTATE}>
        <Entities perObjectVisibility={perObjectVisibility} activePropagation={activePropagationConfig} onClickSpaceObject={handleClickSpaceObject} />
      </Viewer>
    </>
  );
};
export default Globe;
