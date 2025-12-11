import { Cartesian3, Color } from 'cesium';
import { useMemo } from 'react';
import { Entity } from 'resium';
import type { SpaceObject } from '../types/spaceObject';
import { computeOrbitalPeriodSeconds, getOrbitColor, propagateKepler } from '../utils/propagation-helper';

interface SpaceObjectsPropagationsProps {
  so: SpaceObject;
}
const SpaceOjectsPropagagions: React.FC<SpaceObjectsPropagationsProps> = ({ so }) => {
  const orbitColor = getOrbitColor(so.orbitType);

  const orbitPositions = useMemo(() => {
    const positions: Cartesian3[] = [];
    const epoch = new Date(so.epochIso);
    const periodSeconds = computeOrbitalPeriodSeconds(so.semiMajorAxisKm);

    const steps = 256;
    // dt is the time step in seconds for each propagation step
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
      polyline={{
        positions: orbitPositions,
        width: 2,
        material: Color.fromAlpha(orbitColor, 0.3),
      }}
    />
  );
};
export default SpaceOjectsPropagagions;
