import {
  Viewer as CesiumViewer,
  Entity,
} from "cesium";
import type React from "react";
import { useEffect, useRef, useState } from "react";
import {
  Viewer,
  type CesiumComponentRef
} from "resium";
import { mockSpaceObjects } from '../mocks/mock-spaceObjects';
import type { SpaceObject } from '../types/spaceObject';
import Entities from './Entities';

const Globe : React.FC = () => {
      const viewerRef = useRef<CesiumComponentRef<CesiumViewer> | null>(null);

      const [selectedEntity, setSelectedEntity] = useState<Entity|undefined>(undefined);

 const handleFocusSatellite = (so: SpaceObject) => {
    const viewer = viewerRef.current?.cesiumElement;
    if (!viewer) return;



const entity = viewer.entities.getById(so.id); // adapte selon ta structure
  if (!entity) {
    console.warn("Aucune entité trouvée pour", so.id);
    return;
  }

  setSelectedEntity(entity)
  }


useEffect(() => {
const viewer = viewerRef.current?.cesiumElement;
    if (!viewer) return;

    viewer.clock.multiplier = 60;      // vitesse du temps (x60 ici)
    viewer.clock.shouldAnimate = true; // play
  }, []);
const [showPropagation, setShowPropagation] = useState<boolean>(false);

  return (
<>

      {/* UI overlay */}
      <div
        style={{
          position: "absolute",
          zIndex: 1,
          top: 10,
          left: 10,
          padding: "6px 10px",
          borderRadius: 4,
          background: "rgba(0,0,0,0.6)",
          color: "white",
          fontSize: 14
        }}
      >
        <label style={{ cursor: "pointer" }}>
          <input
            type="checkbox"
            checked={showPropagation}
            onChange={e => setShowPropagation(e.target.checked)}
            style={{ marginRight: 6 }} /> Afficher les propagations
        </label>

<div style={{ fontWeight: 600, marginBottom: 4 }}>
          Focus sur un objet :
        </div>

        {/* Liste de boutons satellites */}
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          
          {mockSpaceObjects.map(so => (
            <button
              key={so.id}
              onClick={() => handleFocusSatellite(so)}
              style={{
                textAlign: "left",
                padding: "4px 6px",
                borderRadius: 4,
                border: "1px solid rgba(255,255,255,0.25)",
                background: "rgba(20,20,20,0.9)",
                color: "white",
                cursor: "pointer",
                fontSize: 12
              }}
            >
              {so.name}
            </button>
          ))}
        </div>



      </div>
    <Viewer ref={viewerRef} full trackedEntity={selectedEntity}>
      <Entities showPropagation={showPropagation}/>
    </Viewer>
</>
  );
}

export default Globe;