import { Cartesian3 } from 'cesium';
import type { SpaceObject } from '../types/spaceObject';
import { propagateKepler } from './propagation-helper';

export const computePropagationPoints = (
  spaceObject: SpaceObject,
  options: {
    startDate: Date;
    endDate: Date;
    stepSeconds: number;
  },
): Cartesian3[] => {
  const { startDate, endDate, stepSeconds } = options;

  const startMs = startDate.getTime();
  const endMs = endDate.getTime();
  const stepMs = stepSeconds * 1000;

  const positions: Cartesian3[] = [];

  if (stepMs <= 0 || endMs <= startMs) {
    return positions;
  }

  for (let t = startMs; t <= endMs; t += stepMs) {
    const date = new Date(t);
    const pos = propagateKepler(spaceObject, date);
    positions.push(pos);
  }

  return positions;
};
