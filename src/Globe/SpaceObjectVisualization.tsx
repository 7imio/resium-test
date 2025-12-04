import {
    CallbackProperty,
    Cartesian2,
    Cartesian3,
    Color,
    JulianDate,
    NearFarScalar
} from "cesium";
import React from "react";
import { Entity } from "resium";
import type { SpaceObject } from "../types/spaceObject";
import { computeOrbitalPeriodSeconds, propagateKepler } from "../utils/propagation-helper";

interface SpaceObjectVisualizationProps {
  so: SpaceObject;
  showPropagation:boolean
}

function getOrbitColor(orbitType: SpaceObject["orbitType"]): Color {
  switch (orbitType) {
    case "LEO":
      return Color.LIME;
    case "MEO":
      return Color.ORANGE;
    case "HEO":
      return Color.MAGENTA;
    case "GEO":
      return Color.CYAN;
    default:
      return Color.WHITE;
  }
}

export const SpaceObjectVisualization: React.FC<SpaceObjectVisualizationProps> = ({ so, showPropagation }) => {

     const orbitColor = getOrbitColor(so.orbitType);

  const positionProperty = React.useMemo(
    () =>
      new CallbackProperty((time, result) => {
        if (!time) return result as Cartesian3 | undefined;

        const jsDate = JulianDate.toDate(time as JulianDate);
        const pos = propagateKepler(so, jsDate);

        if (result) {
          (result as Cartesian3).x = pos.x;
          (result as Cartesian3).y = pos.y;
          (result as Cartesian3).z = pos.z;
          return result as Cartesian3;
        }

        return pos;
      }, false),
    [so]
  );
  
const orbitPositions = React.useMemo(() => {
    const positions: Cartesian3[] = [];
    const epoch = new Date(so.epochIso);
    const periodSeconds = computeOrbitalPeriodSeconds(so.semiMajorAxisKm);

    const steps = 256; // résolution
    const dt = periodSeconds / steps;

    for (let i = 0; i <= steps; i++) {
      const t = epoch.getTime() + dt * 1000 * i;
      const date = new Date(t);
      const pos = propagateKepler(so, date);
      positions.push(pos);
    }

    return positions;
  }, [so]);

  return (
    <Entity
      name={so.name}
      position={positionProperty as any}
    //   point={{ pixelSize: 12, color: orbitColor}}
    model={{
        uri:`/Satellites/${so.orbitType as string}.gltf`,
        scale:5,
        minimumPixelSize:32,
        color:getOrbitColor(so.orbitType)
    }}
      polyline={showPropagation ? {
            positions: orbitPositions,
            width: 1.5,
            material: Color.fromAlpha(orbitColor, 0.5)
          }: {}}
      



      label={{
        text:so.name, 
        font: "16px sans-serif",
        fillColor:Color.ALICEBLUE,
        outlineColor:Color.BLACK,
        outlineWidth:4,
        pixelOffset: new Cartesian2(20,-20),
        translucencyByDistance: new NearFarScalar( 5000000, 1, 500000000, 0 )
        }}

      description={so.description}
    />
  );
};

export default SpaceObjectVisualization;