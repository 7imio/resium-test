import { Viewer as CesiumViewer } from 'cesium';
import { useEffect, useState } from 'react';
import type { CesiumComponentRef } from 'resium';
import { mockSpaceObjects } from '../mocks/mock-spaceObjects';
import type { SpaceObject } from '../types/spaceObject';

interface UiOverlayProps {
  handleFocusSatellite: (so: SpaceObject) => void;
  viewerRef: React.RefObject<CesiumComponentRef<CesiumViewer> | null>;
}

const UiOverlay: React.FC<UiOverlayProps> = ({ handleFocusSatellite, viewerRef }) => {
  const [showUi, setShowUi] = useState<boolean>(false);
  const [showDebug, setShowDebug] = useState<boolean>(false);

  useEffect(() => {
    if (!viewerRef.current) return;
    const viewer = viewerRef.current.cesiumElement;
    if (!viewer) return;
    viewer.scene.debugShowFramesPerSecond = showDebug;
  }, [showDebug]);

  const handleShowUi = () => {
    setShowUi(!showUi);
  };

  const handleShowDebug = () => {
    setShowDebug(!showDebug);
  };

  return (
    <div
      style={{
        position: 'absolute',
        zIndex: 1,
        top: 10,
        left: 10,
        padding: '6px 10px',
        borderRadius: 8,
        background: 'rgba(0,0,0,0.6)',
        color: 'white',
        fontSize: 14,
        width: '10rem',
      }}
    >
      <button onClick={handleShowUi}>{showUi ? 'Cacher' : 'Afficher'} UI</button>

      {showUi && (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <button onClick={handleShowDebug}>{showDebug ? 'Cacher' : 'Afficher'} Debug</button>

          <div style={{ fontWeight: 600, marginBottom: 4 }}>Focus sur un objet :</div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 4,
            }}
          >
            {mockSpaceObjects.map((so) => (
              <button
                key={so.id}
                onClick={() => handleFocusSatellite(so)}
                style={{
                  textAlign: 'left',
                  padding: '4px 6px',
                  borderRadius: 4,
                  border: '1px solid rgba(255,255,255,0.25)',
                  background: 'rgba(20,20,20,0.9)',
                  color: 'white',
                  cursor: 'pointer',
                  fontSize: 12,
                }}
              >
                {so.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
export default UiOverlay;
