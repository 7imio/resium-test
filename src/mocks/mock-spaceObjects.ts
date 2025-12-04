// src/mocks/mock-spaceObjects.ts

import type { SpaceObject } from '../types/spaceObject';



export const mockSpaceObjects: SpaceObject[] = [
  // --- LEO (Low Earth Orbit) ---
  {
    id: "leo-1",
    name: "LEO Sentinel 1",
    orbitType: "LEO",
    semiMajorAxisKm: 6778, // ~400 km d'altitude
    eccentricity: 0.001,
    inclinationDeg: 51.6,
    raanDeg: 120,
    argOfPerigeeDeg: 45,
    meanAnomalyDegAtEpoch: 10,
    epochIso: "2025-12-04T10:00:00Z",
    description: "Satellite d'observation en orbite basse proche de l'ISS."
  },
  {
    id: "leo-2",
    name: "LEO Comms Alpha",
    orbitType: "LEO",
    semiMajorAxisKm: 7078, // ~700 km d'altitude
    eccentricity: 0.005,
    inclinationDeg: 98, // héliosynchrone-ish
    raanDeg: 200,
    argOfPerigeeDeg: 80,
    meanAnomalyDegAtEpoch: 230,
    epochIso: "2025-12-04T10:00:00Z",
    description: "Satellite de communication en orbite quasi polaire."
  },
  {
    id: "leo-3",
    name: "LEO Tracker Beta",
    orbitType: "LEO",
    semiMajorAxisKm: 6878, // ~500 km altitude
    eccentricity: 0.002,
    inclinationDeg: 30,
    raanDeg: 310,
    argOfPerigeeDeg: 10,
    meanAnomalyDegAtEpoch: 300,
    epochIso: "2025-12-04T10:00:00Z",
    description: "Satellite expérimental pour le suivi des débris."
  },

  // --- MEO (Medium Earth Orbit) ---
  {
    id: "meo-1",
    name: "MEO Nav A",
    orbitType: "MEO",
    semiMajorAxisKm: 26560, // ~20 200 km altitude (GPS-like)
    eccentricity: 0.01,
    inclinationDeg: 55,
    raanDeg: 40,
    argOfPerigeeDeg: 0,
    meanAnomalyDegAtEpoch: 120,
    epochIso: "2025-12-04T10:00:00Z",
    description: "Satellite de navigation en orbite moyenne."
  },
  {
    id: "meo-2",
    name: "MEO Nav B",
    orbitType: "MEO",
    semiMajorAxisKm: 26600,
    eccentricity: 0.02,
    inclinationDeg: 56,
    raanDeg: 130,
    argOfPerigeeDeg: 270,
    meanAnomalyDegAtEpoch: 45,
    epochIso: "2025-12-04T10:00:00Z",
    description: "Deuxième satellite de la constellation MEO."
  },
  {
    id: "meo-3",
    name: "MEO Science 1",
    orbitType: "MEO",
    semiMajorAxisKm: 24000,
    eccentricity: 0.05,
    inclinationDeg: 20,
    raanDeg: 300,
    argOfPerigeeDeg: 60,
    meanAnomalyDegAtEpoch: 5,
    epochIso: "2025-12-04T10:00:00Z",
    description: "Plateforme scientifique pour expériences de rayonnements."
  },

  // --- GEO (Geostationary Orbit) ---
  {
    id: "geo-1",
    name: "GEO Telecom East",

    orbitType: "GEO",
    semiMajorAxisKm: 42164, // ~35786 km altitude
    eccentricity: 0.0005,
    inclinationDeg: 0.1,
    raanDeg: 90,
    argOfPerigeeDeg: 0,
    meanAnomalyDegAtEpoch: 180,
    epochIso: "2025-12-04T10:00:00Z",
    description: "Satellite géostationnaire de télécommunication."
  },
  {
    id: "geo-2",
    name: "GEO Weather West",
    orbitType: "GEO",
    semiMajorAxisKm: 42164,
    eccentricity: 0.002,
    inclinationDeg: 0.5,
    raanDeg: 250,
    argOfPerigeeDeg: 180,
    meanAnomalyDegAtEpoch: 300,
    epochIso: "2025-12-04T10:00:00Z",
    description: "Satellite météo en GEO légèrement incliné."
  },

  // --- HEO (Highly Elliptical Orbit) ---
  {
    id: "heo-1",
    name: "HEO Molniya Alpha",
    orbitType: "HEO",
    semiMajorAxisKm: 26600,      // ~Molniya-like
    eccentricity: 0.74,
    inclinationDeg: 63.4,        // inclination critique Molniya
    raanDeg: 10,
    argOfPerigeeDeg: 270,
    meanAnomalyDegAtEpoch: 0,
    epochIso: "2025-12-04T10:00:00Z",
    description: "Satellite en orbite Molniya pour couverture haute latitude."
  },
  {
    id: "heo-2",
    name: "HEO Science Long-Period",
    orbitType: "HEO",
    semiMajorAxisKm: 30000,
    eccentricity: 0.6,
    inclinationDeg: 50,
    raanDeg: 190,
    argOfPerigeeDeg: 45,
    meanAnomalyDegAtEpoch: 210,
    epochIso: "2025-12-04T10:00:00Z",
    description: "Orbiteur scientifique en orbite très elliptique."
  }
];
