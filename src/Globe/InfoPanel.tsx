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
        width: '15rem',
      }}
    >
      {spaceObject && (
        <>
          <div>
            <strong>{spaceObject.name}</strong>
          </div>
          <hr />
          <div>Description: {spaceObject.description}</div>
          <div>Demi grand axe: {spaceObject.semiMajorAxisKm} kg</div>
          <div>Eccentricité: {spaceObject.eccentricity} m</div>
          <div>Inclinaison: {spaceObject.inclinationDeg} °</div>
          <div>RAAN: {spaceObject.raanDeg} °</div>
          <div>Arg. du périgée: {spaceObject.argOfPerigeeDeg} °</div>
          <div>Anomalie moyenne à l'époque: {spaceObject.meanAnomalyDegAtEpoch} °</div>
          <div>Époque: {spaceObject.epochIso}</div>
        </>
      )}
    </div>
  );
};

export default InfoPanel;
