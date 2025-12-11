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
