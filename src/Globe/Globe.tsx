import { Viewer as CesiumViewer, Entity, MapMode2D } from 'cesium';
import type React from 'react';
import { useEffect, useRef, useState } from 'react';
import { Viewer, type CesiumComponentRef } from 'resium';
import type { SpaceObject } from '../types/spaceObject';
import Entities from './Entities';
import InfoPanel from './InfoPanel';
import UiOverlay from './UiOverlay';

const Globe: React.FC = () => {
  const viewerRef = useRef<CesiumComponentRef<CesiumViewer> | null>(null);

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

  const [selectedEntity, setSelectedEntity] = useState<Entity | undefined>(undefined);
  const [spaceObject, setSpaceObject] = useState<SpaceObject | undefined>(undefined);

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
  };

  useEffect(() => {
    const viewer = viewerRef.current?.cesiumElement;
    if (!viewer) return;

    viewer.clock.multiplier = 60; // vitesse du temps (x60 ici)
    viewer.clock.shouldAnimate = true; // play
  }, []);
  const [showPropagation, setShowPropagation] = useState<boolean>(false);

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

  return (
    <>
      {/* UI overlay */}
      <UiOverlay viewerRef={viewerRef} showPropagation={showPropagation} setShowPropagation={setShowPropagation} handleFocusSatellite={handleFocusSatellite} />
      {selectedEntity && <InfoPanel spaceObject={spaceObject} selectedEntity={selectedEntity} />}
      <Viewer ref={viewerRef} full infoBox={false} selectedEntity={selectedEntity} trackedEntity={selectedEntity} mapMode2D={MapMode2D.ROTATE}>
        <Entities showPropagation={showPropagation} />
      </Viewer>
    </>
  );
};

export default Globe;
