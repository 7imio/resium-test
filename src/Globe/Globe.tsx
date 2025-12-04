import type React from 'react';
import { Viewer } from 'resium';
import Entities from './Entities';

const Globe : React.FC = () => {
    return (
    <Viewer full>
        <Entities />
    </Viewer>)
}

export default Globe;