import { mockSpaceObjects } from '../mocks/mock-spaceObjects';
import SpaceObjectVisualization from './SpaceObjectVisualization';



const Entities: React.FC = () => {
    return mockSpaceObjects.map(so => <SpaceObjectVisualization key={so.id} so={so} />)
  ;
};

export default Entities