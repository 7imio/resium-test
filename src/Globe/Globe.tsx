import { Cartesian3, Color } from 'cesium';
import type React from 'react';
import { Entity, Viewer } from 'resium';

const Globe : React.FC = () => {
    return (
    <Viewer full>
        <Entity
            name='Hello Resium'
            position={Cartesian3.fromDegrees(1.4442, 43.6045,100)}
            point={{pixelSize:10, color: Color.CYAN}}
            description="COUCOU DEPUIS CESIUM"
            />
    </Viewer>)
}

export default Globe;