import {
    Viewer as CesiumViewer
} from "cesium";
import type React from "react";
import { useEffect, useRef } from "react";
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


  return (
    <Viewer ref={viewerRef} full>
      <Entities />
    </Viewer>
  );
}

export default Globe;