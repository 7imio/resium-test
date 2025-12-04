import {
    Viewer as CesiumViewer
} from "cesium";
import type React from "react";
import { useEffect, useRef, useState } from "react";
import {
    Viewer,
    type CesiumComponentRef
} from "resium";
import Entities from './Entities';

const Globe : React.FC = () => {
      const viewerRef = useRef<CesiumComponentRef<CesiumViewer> | null>(null);




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
            style={{ marginRight: 6 }}
          />
          Afficher les propagations
        </label>
      </div>
    <Viewer ref={viewerRef} full>
      <Entities showPropagation={showPropagation}/>
    </Viewer>
</>
  );
}

export default Globe;