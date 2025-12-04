import { mockSpaceObjects } from '../mocks/mock-spaceObjects';
import SpaceObjectVisualization from './SpaceObjectVisualization';

interface EntitiesProps{
    showPropagation:boolean
}

const Entities: React.FC<EntitiesProps> = ({showPropagation}) => {
    return mockSpaceObjects.map(so => <SpaceObjectVisualization key={so.id} so={so} showPropagation={showPropagation} />)
  ;
};

export default Entities