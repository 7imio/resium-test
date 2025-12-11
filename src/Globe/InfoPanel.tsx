import type { Entity } from 'cesium';
import type { SpaceObject } from '../types/spaceObject';
import type { TimeUnit } from '../utils/globe-helper';

interface PropagationUiParams {
  startIso: string;
  endIso: string;
  stepValue: number;
  stepUnit: TimeUnit;
}

interface InfoPanelProps {
  selectedEntity: Entity | undefined;
  spaceObject: SpaceObject | undefined;
  showOrbit: boolean;
  showPoints: boolean;
  onToggleOrbit: (show: boolean) => void;
  onTogglePoints: (show: boolean) => void;
  propagationParams: PropagationUiParams | undefined;
  onChangePropagationParams: (params: PropagationUiParams) => void;
  onZoomOutFromObject: () => void;
  onRecenterOnObject: () => void;
  handleRefocusOnObject: () => void;
}

const InfoPanel: React.FC<InfoPanelProps> = ({
  spaceObject,
  showOrbit,
  showPoints,
  onToggleOrbit,
  onTogglePoints,
  propagationParams,
  onChangePropagationParams,
  onRecenterOnObject,
  onZoomOutFromObject,
  handleRefocusOnObject,
}) => {
  if (!spaceObject) {
    return null;
  }

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
        width: '18rem',
      }}
    >
      <div>
        <strong>{spaceObject.name}</strong>
      </div>
      <hr />
      {/* Bloc caméra */}
      <div
        style={{
          marginTop: 4,
          marginBottom: 8,
          display: 'flex',
          flexDirection: 'column',
          gap: 4,
        }}
      >
        <span style={{ fontWeight: 600 }}>Caméra</span>
        <div style={{ display: 'flex', gap: 6 }}>
          <button type="button" onClick={onZoomOutFromObject} style={{ flex: 1, fontSize: 12 }}>
            Zoom vue propagation
          </button>
          <button type="button" onClick={onRecenterOnObject} style={{ flex: 1, fontSize: 12 }}>
            Recentrer
          </button>
          <button type="button" onClick={handleRefocusOnObject} style={{ flex: 1, fontSize: 12 }}>
            Refocus
          </button>
        </div>
      </div>
      <hr />
      <div>Description: {spaceObject.description}</div>
      <div>Demi grand axe: {spaceObject.semiMajorAxisKm} km</div>
      <div>Eccentricité: {spaceObject.eccentricity}</div>
      <div>Inclinaison: {spaceObject.inclinationDeg} °</div>
      <div>RAAN: {spaceObject.raanDeg} °</div>
      <div>Arg. du périgée: {spaceObject.argOfPerigeeDeg} °</div>
      <div>Anomalie moyenne à l'époque: {spaceObject.meanAnomalyDegAtEpoch} °</div>
      <div>Époque: {spaceObject.epochIso}</div>

      <hr />

      <div style={{ marginTop: 8, display: 'flex', flexDirection: 'column', gap: 4 }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <input type="checkbox" checked={showOrbit} onChange={(e) => onToggleOrbit(e.target.checked)} />
          Afficher l’orbite (trait)
        </label>

        <label style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <input type="checkbox" checked={showPoints} onChange={(e) => onTogglePoints(e.target.checked)} />
          Afficher les points de propagation
        </label>
      </div>

      {showPoints && propagationParams && (
        <div
          style={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            gap: 6,
          }}
        >
          <label style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <span>Début propagation</span>
            <input
              type="datetime-local"
              value={propagationParams.startIso}
              onChange={(e) =>
                onChangePropagationParams({
                  ...propagationParams,
                  startIso: e.target.value,
                })
              }
            />
          </label>

          <label style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <span>Fin propagation</span>
            <input
              type="datetime-local"
              value={propagationParams.endIso}
              onChange={(e) =>
                onChangePropagationParams({
                  ...propagationParams,
                  endIso: e.target.value,
                })
              }
            />
          </label>

          <label
            style={{
              display: 'flex',
              flexDirection: 'row',
              gap: 4,
              alignItems: 'center',
            }}
          >
            <span>Pas</span>
            <input
              type="number"
              min={1}
              style={{ width: 70 }}
              value={propagationParams.stepValue}
              onChange={(e) =>
                onChangePropagationParams({
                  ...propagationParams,
                  stepValue: Number(e.target.value) || 1,
                })
              }
            />
            <select
              value={propagationParams.stepUnit}
              onChange={(e) =>
                onChangePropagationParams({
                  ...propagationParams,
                  stepUnit: e.target.value as TimeUnit,
                })
              }
            >
              <option value="seconds">secondes</option>
              <option value="minutes">minutes</option>
              <option value="hours">heures</option>
            </select>
          </label>
        </div>
      )}
    </div>
  );
};

export default InfoPanel;
