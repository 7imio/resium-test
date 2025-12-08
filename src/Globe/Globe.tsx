import { Viewer as CesiumViewer, Entity, MapMode2D } from 'cesium';
import type React from 'react';
import { useEffect, useRef, useState } from 'react';
import { Viewer, type CesiumComponentRef } from 'resium';
import type { SpaceObject } from '../types/spaceObject';
import Entities from './Entities';
import UiOverlay from './UiOverlay';

const Globe: React.FC = () => {
  const viewerRef = useRef<CesiumComponentRef<CesiumViewer> | null>(null);

  const [selectedEntity, setSelectedEntity] = useState<Entity | undefined>(undefined);

  const handleFocusSatellite = (so: SpaceObject) => {
    const viewer = viewerRef.current?.cesiumElement;
    if (!viewer) return;

    const entity = viewer.entities.getById(so.id); // adapte selon ta structure
    if (!entity) {
      console.warn('Aucune entité trouvée pour', so.id);
      return;
    }

    setSelectedEntity(entity);
  };

  useEffect(() => {
    const viewer = viewerRef.current?.cesiumElement;
    if (!viewer) return;

    viewer.clock.multiplier = 60; // vitesse du temps (x60 ici)
    viewer.clock.shouldAnimate = true; // play
  }, []);
  const [showPropagation, setShowPropagation] = useState<boolean>(false);

  return (
    <>
      {/* UI overlay */}
      <UiOverlay viewerRef={viewerRef} showPropagation={showPropagation} setShowPropagation={setShowPropagation} handleFocusSatellite={handleFocusSatellite} />
      <Viewer ref={viewerRef} full trackedEntity={selectedEntity} mapMode2D={MapMode2D.ROTATE}>
        <Entities showPropagation={showPropagation} />
      </Viewer>
    </>
  );
};

export default Globe;
