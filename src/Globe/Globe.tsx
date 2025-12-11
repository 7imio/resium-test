import { Viewer as CesiumViewer, Entity, MapMode2D } from 'cesium';
import type React from 'react';
import { useEffect, useRef, useState } from 'react';
import { Viewer, type CesiumComponentRef } from 'resium';
import type { SpaceObject } from '../types/spaceObject';
import {
  getVisibilityFor,
  handleFocusSatellite,
  processStepValue,
  setOrbitVisibility,
  setPointsVisibility,
  tweakPerformances,
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

  const [perObjectVisibility, setPerObjectVisibility] = useState<Record<string, PerObjectVisibility>>({});
  const [propagationUiParams, setPropagationUiParams] = useState<PropagationUiParams | undefined>(undefined);

  const viewerRef = useRef<CesiumComponentRef<CesiumViewer> | null>(null);

  // Nouvelle fonction pour zoomer hors de l’objet sélectionné
  const handleZoomOutFromObject = () => {
    const viewer = viewerRef.current?.cesiumElement;
    if (!viewer || !spaceObject) return;

    const entity = viewer.entities.getById(spaceObject.id);
    if (!entity) return;

    viewer.camera.zoomOut(PROPAGATION_ZOOM_DELTA);
  };

  // Nouvelle fonction pour recentrer sur l’objet sélectionné
  const handleRecenterOnObject = () => {
    const viewer = viewerRef.current?.cesiumElement;
    if (!viewer || !spaceObject) return;

    const entity = viewer.entities.getById(spaceObject.id);
    if (!entity) return;

    viewer.camera.zoomIn(PROPAGATION_ZOOM_DELTA);
  };

  // Nouvelle fonction pour refocus sur l’objet sélectionné
  const handleRefocusOnObject = () => {
    const viewer = viewerRef.current?.cesiumElement;
    if (!viewer || !spaceObject) return;

    const entity = viewer.entities.getById(spaceObject.id);
    if (!entity) return;

    viewer.trackedEntity = entity;
  };

  // Configuration de la propagation active à passer aux entités
  const activePropagationConfig: ActivePropagationConfig | undefined = propagationUiParams
    ? (() => {
        const { startIso, endIso, stepValue, stepUnit } = propagationUiParams;
        const stepSeconds = processStepValue(stepUnit, stepValue);
        if (stepSeconds <= 0) return undefined;

        return {
          startIso,
          endIso,
          stepSeconds,
        };
      })()
    : undefined;

  // Initialisation des paramètres de propagation lors de la sélection d’un objet spatial
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

  // Optimisation des performances du viewer
  useEffect(() => {
    if (viewerRef.current) {
      tweakPerformances(viewerRef.current.cesiumElement);
    }
  }, [viewerRef]);

  // Gestion du clic sur un objet spatial
  const handleClickSpaceObject = (so: SpaceObject) => {
    handleFocusSatellite(so, viewerRef, setSelectedEntity, setSpaceObject);
  };

  // Initialisation du viewer
  useEffect(() => {
    const viewer = viewerRef.current?.cesiumElement;
    if (!viewer) return;
    viewer.clock.multiplier = 60;
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
    return () => {
      if (typeof handler === 'function') {
        handler();
      }
    };
  }, []);

  const visibilityForSelected = spaceObject ? getVisibilityFor(spaceObject.id, perObjectVisibility) : undefined;

  return (
    <>
      <UiOverlay viewerRef={viewerRef} handleFocusSatellite={(so) => handleFocusSatellite(so, viewerRef, setSelectedEntity, setSpaceObject)} />

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
