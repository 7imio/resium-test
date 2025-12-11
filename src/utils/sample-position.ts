import { Cartesian3, JulianDate, SampledPositionProperty } from 'cesium';
import type { SpaceObject } from '../types/spaceObject';
import { propagateKepler } from './propagation-helper';

export function buildSampledPositionForOrbit(
  spaceObject: SpaceObject,
  options?: {
    stepSeconds?: number; // ex: 1800 = 30 min
    durationSeconds?: number; // ex: 24h
  },
) {
  const stepSeconds = options?.stepSeconds ?? 1800;
  const durationSeconds = options?.durationSeconds ?? 24 * 3600;

  const position = new SampledPositionProperty();

  const now = new Date();
  const halfDuration = durationSeconds / 2;

  const startMs = now.getTime() - halfDuration * 1000;
  const endMs = now.getTime() + halfDuration * 1000;

  for (let t = startMs; t <= endMs; t += stepSeconds * 1000) {
    const date = new Date(t);
    const jd = JulianDate.fromDate(date);

    const pos: Cartesian3 = propagateKepler(spaceObject, date);
    position.addSample(jd, pos);
  }

  return position;
}
