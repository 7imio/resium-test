import { Color, type Cartesian3 } from 'cesium';
import React from 'react';
import { Entity } from 'resium';
import type { SpaceObject } from '../types/spaceObject';
import { computePropagationPoints } from '../utils/obitSampling';
import { getOrbitColor } from '../utils/propagation-helper';

interface PropagationWaypointsVisualizationProps {
  so: SpaceObject;
  startIso: string;
  endIso: string;
  stepSeconds: number;
}

const PropagationWaypointsVisualization: React.FC<PropagationWaypointsVisualizationProps> = ({ so, startIso, endIso, stepSeconds }) => {
  const positions = React.useMemo<Cartesian3[]>(() => {
    const startDate = new Date(startIso);
    const endDate = new Date(endIso);

    if (Number.isNaN(startDate.getTime()) || Number.isNaN(endDate.getTime()) || stepSeconds <= 0) {
      return [];
    }

    return computePropagationPoints(so, {
      startDate,
      endDate,
      stepSeconds,
    });
  }, [so, startIso, endIso, stepSeconds]);

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
