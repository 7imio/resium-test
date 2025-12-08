import { mockSpaceObjects } from '../mocks/mock-spaceObjects';
import PropagationWaypointsVisualization from './PropagationWaypointsVisualisation';
import SpaceObjectsPropagations from './SpaceObjectsPropagations';
import SpaceObjectVisualization from './SpaceObjectVisualization';

interface EntitiesProps {
  showPropagation: boolean;
}

const Entities: React.FC<EntitiesProps> = ({ showPropagation }) => {
  return (
    <>
      {mockSpaceObjects.map((so) => (
        <SpaceObjectVisualization key={`visu-${so.id}`} so={so} />
      ))}
      {showPropagation && mockSpaceObjects.map((so) => <SpaceObjectsPropagations key={`propa-${so.id}`} so={so} />)}
      {mockSpaceObjects.map((so) => (
        <PropagationWaypointsVisualization so={so} stepMinutes={30} durationHours={24} />
      ))}
    </>
  );
};

export default Entities;
