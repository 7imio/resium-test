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
  },
    // --- EXTRA LEO ---
  {
    id: "leo-4",
    name: "LEO Imaging Ultra",
    orbitType: "LEO",
    semiMajorAxisKm: 6950,            // ~572 km altitude
    eccentricity: 0.0008,
    inclinationDeg: 97.8,             // SSO (Sun-Synchronous)
    raanDeg: 340,
    argOfPerigeeDeg: 87,
    meanAnomalyDegAtEpoch: 15,
    epochIso: "2025-12-04T10:00:00Z",
    description: "Satellite d’imagerie haute résolution en orbite héliosynchrone."
  },
  {
    id: "leo-5",
    name: "LEO Radar Scout",
    orbitType: "LEO",
    semiMajorAxisKm: 7100,            // ~722 km altitude
    eccentricity: 0.0012,
    inclinationDeg: 74,
    raanDeg: 60,
    argOfPerigeeDeg: 10,
    meanAnomalyDegAtEpoch: 120,
    epochIso: "2025-12-04T10:00:00Z",
    description: "Plateforme radar SAR capable de cartographier le sol par tous les temps."
  },
  {
    id: "leo-6",
    name: "LEO Fleet Node 12",
    orbitType: "LEO",
    semiMajorAxisKm: 6670,            // ~300 km altitude (train encore bas)
    eccentricity: 0.0021,
    inclinationDeg: 53,
    raanDeg: 150,
    argOfPerigeeDeg: 40,
    meanAnomalyDegAtEpoch: 260,
    epochIso: "2025-12-04T10:00:00Z",
    description: "Noeud d'une méga-constellation en cours de déploiement."
  },

  // --- EXTRA MEO ---
  {
    id: "meo-4",
    name: "MEO Galileo Testbed",
    orbitType: "MEO",
    semiMajorAxisKm: 29600,           // typique Galileo
    eccentricity: 0.001,
    inclinationDeg: 56,
    raanDeg: 10,
    argOfPerigeeDeg: 0,
    meanAnomalyDegAtEpoch: 80,
    epochIso: "2025-12-04T10:00:00Z",
    description: "Prototype dérivé du système Galileo pour tests de précision."
  },
  {
    id: "meo-5",
    name: "MEO Orbit Transfer Demo",
    orbitType: "MEO",
    semiMajorAxisKm: 20000,           // Transition orbit
    eccentricity: 0.10,
    inclinationDeg: 25,
    raanDeg: 280,
    argOfPerigeeDeg: 145,
    meanAnomalyDegAtEpoch: 290,
    epochIso: "2025-12-04T10:00:00Z",
    description: "Démo d’orbite de transfert MEO→GEO avec manoeuvres programmées."
  },
  {
    id: "meo-6",
    name: "MEO Research Pathfinder",
    orbitType: "MEO",
    semiMajorAxisKm: 23000,
    eccentricity: 0.08,
    inclinationDeg: 63,
    raanDeg: 200,
    argOfPerigeeDeg: 300,
    meanAnomalyDegAtEpoch: 10,
    epochIso: "2025-12-04T10:00:00Z",
    description: "Plateforme expérimentale pour mesures de radiation intense."
  },

  // --- EXTRA GEO ---
  {
    id: "geo-3",
    name: "GEO Broadcast Zenith",
    orbitType: "GEO",
    semiMajorAxisKm: 42164,
    eccentricity: 0.0003,
    inclinationDeg: 0.05,
    raanDeg: 180,
    argOfPerigeeDeg: 10,
    meanAnomalyDegAtEpoch: 50,
    epochIso: "2025-12-04T10:00:00Z",
    description: "Diffuseur télé en position orbitale stable Est."
  },
  {
    id: "geo-4",
    name: "GEO Station Drifter",
    orbitType: "GEO",
    semiMajorAxisKm: 42190,           // drift GEO légèrement en dehors
    eccentricity: 0.01,
    inclinationDeg: 1.1,
    raanDeg: 45,
    argOfPerigeeDeg: 300,
    meanAnomalyDegAtEpoch: 200,
    epochIso: "2025-12-04T10:00:00Z",
    description: "Satellite vieillissant en légère dérive pour tests de repositionnement."
  },
  {
    id: "geo-5",
    name: "GEO Jammer Sentinel",
    orbitType: "GEO",
    semiMajorAxisKm: 42170,
    eccentricity: 0.0025,
    inclinationDeg: 0.2,
    raanDeg: 300,
    argOfPerigeeDeg: 45,
    meanAnomalyDegAtEpoch: 270,
    epochIso: "2025-12-04T10:00:00Z",
    description: "Plateforme militaire dédiée à la surveillance spectrale."
  },

  // --- EXTRA HEO ---
  {
    id: "heo-3",
    name: "HEO Tundra Observer",
    orbitType: "HEO",
    semiMajorAxisKm: 42164,           // Tundra = similar to GEO SMA but high ecc
    eccentricity: 0.4,
    inclinationDeg: 63.4,
    raanDeg: 80,
    argOfPerigeeDeg: 270,
    meanAnomalyDegAtEpoch: 0,
    epochIso: "2025-12-04T10:00:00Z",
    description: "Satellite en orbite Tundra garantissant une longue vue sur les hautes latitudes."
  },
  {
    id: "heo-4",
    name: "HEO Long Echo",
    orbitType: "HEO",
    semiMajorAxisKm: 35000,
    eccentricity: 0.55,
    inclinationDeg: 50,
    raanDeg: 100,
    argOfPerigeeDeg: 180,
    meanAnomalyDegAtEpoch: 310,
    epochIso: "2025-12-04T10:00:00Z",
    description: "Plateforme scientifique étudiant les queues de plasma dans la magnétosphère."
  },
  {
    id: "heo-5",
    name: "HEO Graveyard Drift",
    orbitType: "HEO",
    semiMajorAxisKm: 45000,           // supersynchronous disposal
    eccentricity: 0.15,
    inclinationDeg: 7,
    raanDeg: 250,
    argOfPerigeeDeg: 10,
    meanAnomalyDegAtEpoch: 90,
    epochIso: "2025-12-04T10:00:00Z",
    description: "Satellite GEO retiré en orbite de rebut très elliptique."
  }

];
