// src/types/spaceObject.ts

export type OrbitType = "LEO" | "MEO" | "HEO" | "GEO";

export interface SpaceObject {
  id: string;                 
  name: string;                

  orbitType: OrbitType;        

  // Éléments orbitaux 
  semiMajorAxisKm: number;     // a : demi-grand axe en km
  eccentricity: number;        // e : excentricité (0 = cercle)
  inclinationDeg: number;      // i : inclinaison en degrés
  raanDeg: number;             // Ω : Right Ascension of Ascending Node
  argOfPerigeeDeg: number;     // ω : argument du périgée
  meanAnomalyDegAtEpoch: number; // M0 : anomalie moyenne à l'époque, en degrés

  epochIso: string;            // date de référence des éléments (ISO 8601)

  // Infos dérivées / pratiques pour l'affichage ou le debug
  description?: string;
}
