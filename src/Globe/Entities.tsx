// src/Globe/Entities.tsx

import { Fragment } from 'react';
import { mockSpaceObjects } from '../mocks/mock-spaceObjects';
import PropagationWaypointsVisualization from './PropagationWaypointsVisualisation';
import SpaceObjectsPropagations from './SpaceObjectsPropagations';
import SpaceObjectVisualization from './SpaceObjectVisualization';

interface PerObjectVisibility {
  showOrbit: boolean;
  showPoints: boolean;
}

interface EntitiesProps {
  perObjectVisibility: Record<string, PerObjectVisibility>;
  activePropagation?: {
    startIso: string;
    endIso: string;
    stepSeconds: number;
  };
  onClickSpaceObject?: (so: import('../types/spaceObject').SpaceObject) => void; // ⬅️ nouveau
}

const Entities: React.FC<EntitiesProps> = ({ perObjectVisibility, activePropagation, onClickSpaceObject }) => {
  return (
    <>
      {mockSpaceObjects.map((so) => {
        const visibility: PerObjectVisibility = perObjectVisibility[so.id] ?? {
          showOrbit: false,
          showPoints: false,
        };

        return (
          <Fragment key={so.id}>
            {/* ⬇️ on passe le callback ici */}
            <SpaceObjectVisualization so={so} onClick={onClickSpaceObject} />

            {visibility.showOrbit && <SpaceObjectsPropagations key={`orbit-${so.id}`} so={so} />}

            {visibility.showPoints && activePropagation && (
              <PropagationWaypointsVisualization
                key={`dots-${so.id}`}
                so={so}
                startIso={activePropagation.startIso}
                endIso={activePropagation.endIso}
                stepSeconds={activePropagation.stepSeconds}
              />
            )}
          </Fragment>
        );
      })}
    </>
  );
};

export default Entities;
