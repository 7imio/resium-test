import type { Viewer as CesiumViewer, Entity } from 'cesium';
import type { CesiumComponentRef } from 'resium';
import { mockSpaceObjects } from '../mocks/mock-spaceObjects';
import type { SpaceObject } from '../types/spaceObject';

export interface PerObjectVisibility {
  showOrbit: boolean;
  showPoints: boolean;
}

export type TimeUnit = 'seconds' | 'minutes' | 'hours';

export interface PropagationUiParams {
  startIso: string;
  endIso: string;
  stepValue: number;
  stepUnit: TimeUnit;
}

export interface ActivePropagationConfig {
  startIso: string;
  endIso: string;
  stepSeconds: number;
}

export const setOrbitVisibility = (
  id: string,
  show: boolean,
  setPerObjectVisibility: React.Dispatch<React.SetStateAction<Record<string, PerObjectVisibility>>>,
) => {
  setPerObjectVisibility((prev) => {
    const current = prev[id] ?? { showOrbit: false, showPoints: false };
    return {
      ...prev,
      [id]: {
        ...current,
        showOrbit: show,
      },
    };
  });
};

export const setPointsVisibility = (
  id: string,
  show: boolean,
  setPerObjectVisibility: React.Dispatch<React.SetStateAction<Record<string, PerObjectVisibility>>>,
) => {
  setPerObjectVisibility((prev) => {
    const current = prev[id] ?? { showOrbit: false, showPoints: false };
    return {
      ...prev,
      [id]: {
        ...current,
        showPoints: show,
      },
    };
  });
};

export const getVisibilityFor = (id: string, perObjectVisibility: Record<string, PerObjectVisibility>): PerObjectVisibility => {
  return (
    perObjectVisibility[id] ?? {
      showOrbit: false,
      showPoints: false,
    }
  );
};

export const tweakPerformances = (viewer: CesiumViewer | undefined) => {
  if (!viewer) return;
  viewer.shadows = false;
  viewer.scene.globe.enableLighting = false;
  viewer.scene.globe.showGroundAtmosphere = false;
  viewer.scene.highDynamicRange = false;
};

export const processStepValue = (stepUnit: TimeUnit, stepValue: number): number => {
  if (stepUnit === 'seconds') {
    return stepValue;
  } else if (stepUnit === 'minutes') {
    return stepValue * 60;
  } else {
    return stepValue * 3600;
  }
};

export const handleFocusSatellite = (
  so: SpaceObject,
  viewerRef: React.RefObject<CesiumComponentRef<CesiumViewer> | null>,
  setSelectedEntity: React.Dispatch<React.SetStateAction<Entity | undefined>>,
  setSpaceObject: React.Dispatch<React.SetStateAction<SpaceObject | undefined>>,
) => {
  const viewer = viewerRef.current?.cesiumElement;
  if (!viewer) return;

  const entity = viewer.entities.getById(so.id);
  if (!entity) {
    return;
  }

  setSelectedEntity((prev: Entity | undefined) => {
    if (!prev) return entity;
    if (prev.id === entity.id) return undefined;
    return entity;
  });

  const currentSpaceObject = mockSpaceObjects.find((candidate) => candidate.id === entity.id);

  setSpaceObject((prev: SpaceObject | undefined) => {
    if (!prev) return currentSpaceObject;
    if (prev.id === entity.id) return undefined;
    return currentSpaceObject;
  });
};
