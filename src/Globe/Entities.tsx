import { Color } from 'cesium'
import { useEffect, useState } from 'react'
import { Entity } from 'resium'
import { mockSpaceObjects } from '../mocks/mock-spaceObjects'
import { propagateKepler } from '../utils/propagation-helper'

const Entities: React.FC = () => {
    const [time, setTime] = useState(()=> new Date());
    
    useEffect(()=>{
        const tickMs = 100;
        const speedFactor = 60;

        const intervalId = setInterval(()=>{
            setTime(prev=>{
                const next = new Date(prev.getTime()+tickMs*speedFactor);
                return next;
            })
        }, tickMs)
        return ()=> clearInterval(intervalId);
    },[])

    return mockSpaceObjects.map((so)=> {
        const position = propagateKepler(so, time);

        return <Entity 
            key={so.id}
            name={so.name}
            position={position}
            point={{pixelSize:12, color:Color.CYAN}}
            description={so.description}
        />

    })
} 

export default Entities