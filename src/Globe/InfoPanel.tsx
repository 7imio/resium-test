import type { Entity } from 'cesium';
import { useEffect } from 'react';
import type { SpaceObject } from '../types/spaceObject';

interface InfoPanelProps {
  selectedEntity: Entity | undefined;
  spaceObject: SpaceObject | undefined;
}

const InfoPanel: React.FC<InfoPanelProps> = ({ selectedEntity, spaceObject }) => {
  useEffect(() => {
    console.log({ spaceObject, selectedEntity });
  }, [spaceObject, selectedEntity]);

  return (
    <div
      style={{
        position: 'absolute',
        zIndex: 1,
        top: 100,
        right: 10,
        padding: '6px 10px',
        borderRadius: 8,
        background: 'rgba(0,0,0,0.6)',
        color: 'white',
        fontSize: 14,
        width: '10rem',
      }}
    >
      <p>PLOP</p>
    </div>
  );
};

export default InfoPanel;
