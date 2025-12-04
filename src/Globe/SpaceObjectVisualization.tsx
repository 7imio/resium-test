import {
    CallbackProperty,
    Cartesian3,
    Color,
    JulianDate
} from "cesium";
import React from "react";
import { Entity } from "resium";
import type { SpaceObject } from "../types/spaceObject";
import { propagateKepler } from "../utils/propagation-helper";

interface SpaceObjectVisualizationProps {
  so: SpaceObject;
}

export const SpaceObjectVisualization: React.FC<SpaceObjectVisualizationProps> = ({ so }) => {
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

  return (
    <Entity
      name={so.name}
      // petit cast pour calmer TS : CallbackProperty est bien accepté par Cesium côté runtime
      position={positionProperty as any}
      point={{ pixelSize: 12, color: Color.CYAN }}
      description={so.description}
    />
  );
};

export default SpaceObjectVisualization;