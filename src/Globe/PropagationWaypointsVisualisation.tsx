import { Color, type Cartesian3 } from 'cesium';
import React from 'react';
import { Entity } from 'resium';
import type { SpaceObject } from '../types/spaceObject';
import { computePropagationPoints } from '../utils/obitSampling';
import { getOrbitColor } from '../utils/propagation-helper';

interface PropagationWaypointsVisualizationProps {
  so: SpaceObject;
  stepMinutes?: number;
  durationHours?: number;
}

const PropagationWaypointsVisualization: React.FC<PropagationWaypointsVisualizationProps> = ({ so, stepMinutes = 30, durationHours = 24 }) => {
  const positions = React.useMemo<Cartesian3[]>(() => {
    return computePropagationPoints(so, {
      stepMinutes,
      durationHours,
      centerOnEpoch: true,
    });
  }, [stepMinutes, durationHours, so]);

  const orbitColor = getOrbitColor(so.orbitType);

  return positions.map((pos, idx) => {
    return (
      <Entity
        key={`${so.id}-dot-${idx}`}
        position={pos}
        point={{
          pixelSize: 8,
          color: orbitColor.withAlpha(0.9),
          outlineColor: Color.BLACK,
          outlineWidth: 2,
        }}
      />
    );
  });
};

export default PropagationWaypointsVisualization;
