// src/utils/orbitSampling.ts
import { Cartesian3 } from 'cesium';
import type { SpaceObject } from '../types/spaceObject';
import { propagateKepler } from './propagation-helper';

export function computePropagationPoints(
  spaceObject: SpaceObject,
  options?: {
    stepMinutes?: number; // pas en minutes entre deux points
    durationHours?: number; // durée totale à couvrir
    centerOnEpoch?: boolean; // true: fenêtre centrée sur epoch, false: epoch -> epoch+durée
  },
): Cartesian3[] {
  const stepMinutes = options?.stepMinutes ?? 30; // 30 min par défaut
  const durationHours = options?.durationHours ?? 24; // 24 h par défaut
  const centerOnEpoch = options?.centerOnEpoch ?? true;

  const stepMs = stepMinutes * 60 * 1000;
  const durationMs = durationHours * 3600 * 1000;

  const epoch = new Date(spaceObject.epochIso);

  let startMs: number;
  let endMs: number;

  if (centerOnEpoch) {
    const half = durationMs / 2;
    startMs = epoch.getTime() - half;
    endMs = epoch.getTime() + half;
  } else {
    startMs = epoch.getTime();
    endMs = epoch.getTime() + durationMs;
  }

  const positions: Cartesian3[] = [];

  for (let t = startMs; t <= endMs; t += stepMs) {
    const date = new Date(t);
    const pos = propagateKepler(spaceObject, date);
    positions.push(pos);
  }

  return positions;
}
