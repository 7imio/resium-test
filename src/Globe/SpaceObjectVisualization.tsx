import { CallbackPositionProperty, Cartesian2, Color, JulianDate, NearFarScalar } from 'cesium';
import React from 'react';
import { Entity, PathGraphics } from 'resium';
import type { SpaceObject } from '../types/spaceObject';
import { getOrbitColor, propagateKepler } from '../utils/propagation-helper';

interface SpaceObjectVisualizationProps {
  so: SpaceObject;
}

export const SpaceObjectVisualization: React.FC<SpaceObjectVisualizationProps> = ({ so }) => {
  const positionProperty = React.useMemo(
    () =>
      new CallbackPositionProperty((time, result) => {
        if (!time) return result;

        const jsDate = JulianDate.toDate(time);
        const pos = propagateKepler(so, jsDate);

        if (result) {
          result.x = pos.x;
          result.y = pos.y;
          result.z = pos.z;
          return result;
        }

        return pos;
      }, false),
    [so],
  );

  const color = getOrbitColor(so.orbitType);

  return (
    <Entity
      id={so.id}
      name={so.name}
      position={positionProperty}
      //   point={{ pixelSize: 12, color: orbitColor}}
      model={{
        uri: `/Satellites/${so.orbitType as string}.gltf`,
        scale: 5,
        minimumPixelSize: 32,
        color,
      }}
      label={{
        text: so.name,
        font: '16px sans-serif',
        fillColor: Color.ALICEBLUE,
        outlineColor: Color.BLACK,
        outlineWidth: 4,
        pixelOffset: new Cartesian2(20, -20),
        translucencyByDistance: new NearFarScalar(5000000, 1, 500000000, 0),
      }}
      description={so.description}
    >
      <PathGraphics show={true} leadTime={60 * 20} trailTime={60 * 10} width={4} material={color} />
    </Entity>
  );
};

export default SpaceObjectVisualization;
