import { Cartesian3 } from 'cesium';
import type { SpaceObject } from '../types/spaceObject';

// constante gravit. standard de la terre en km3/s2 (valeurs classiques de mécaspa)
const MU_EARTH_KM3_S2 = 398600.4418;
const DEG2RAD = Math.PI /180;
const TWO_PI = 2* Math.PI;

const normalizeAngleRad =(angle:number) => {
    let a = angle%TWO_PI;
    if (a<0) a+= TWO_PI;
    return a;
}

/**
 * résout l'équation de Kepler pour obtenir l'excentric anomaly E
 * à partir de la mean anomaly M et de l'excentricité e
 * Methode Newton-Raphson
 */
const solveKepler =(M:number, e:number, maxIter=50, tol = 1e-10):number=>{
    M = normalizeAngleRad(M);

    let E = M;
    if (e>0.8){
        // meilleure initialisation pour les orbites très excentriques
        E = Math.PI;
    } else {
        // approximation classique
        E = M+e*Math.sin(M) * (1+e*Math.cos(M));
    }

    for (let i = 0; i< maxIter; i++){
        const f = E-e*Math.sin(E)-M;
        const fPrime = 1-e*Math.cos(e);
        const delta = f / fPrime;
        E-=delta;
        if (Math.abs(delta)<tol){
            break;
        }
    }
    return normalizeAngleRad(E);
}

/**
 * Propage un objet spatial selon un modèle képlérien simple.
 *
 * @param spaceObject L'objet spatial contenant les éléments orbitaux
 * @param date La date pour laquelle on veut la position
 * @returns Position en Cartesian3 (mètres), dans un référentiel Terre-centré inertiel approx.
 */
export const propagateKepler=(spaceObject: SpaceObject, date: Date): Cartesian3 =>{
  const {
    semiMajorAxisKm: a,
    eccentricity: e,
    inclinationDeg,
    raanDeg,
    argOfPerigeeDeg,
    meanAnomalyDegAtEpoch,
    epochIso
  } = spaceObject;

  // 1. Temps écoulé depuis l'époque (en secondes)
  const epochDate = new Date(epochIso);
  const dtSeconds = (date.getTime() - epochDate.getTime()) / 1000;

  // 2. Mean motion n (rad/s) : n = sqrt(mu / a^3)
  const n = Math.sqrt(MU_EARTH_KM3_S2 / (a * a * a));

  // 3. Mean anomaly à t : M(t) = M0 + n * dt
  const M0 = meanAnomalyDegAtEpoch * DEG2RAD;
  const M = normalizeAngleRad(M0 + n * dtSeconds);

  // 4. Résoudre l'équation de Kepler pour obtenir l'excentric anomaly E
  const E = solveKepler(M, e);

  // 5. True anomaly ν
  const cosE = Math.cos(E);
  const sinE = Math.sin(E);

  const sqrtOneMinusESq = Math.sqrt(1 - e * e);
  const sinNu = (sqrtOneMinusESq * sinE) / (1 - e * cosE);
  const cosNu = (cosE - e) / (1 - e * cosE);
  const nu = Math.atan2(sinNu, cosNu); // true anomaly

  // 6. Distance au centre de la Terre : r = a(1 - e cos E)
  const rKm = a * (1 - e * cosE);

  // 7. Angle argument of latitude u = ω + ν
  const i = inclinationDeg * DEG2RAD;
  const raan = raanDeg * DEG2RAD;
  const argPer = argOfPerigeeDeg * DEG2RAD;
  const u = argPer + nu;

  const cosRAAN = Math.cos(raan);
  const sinRAAN = Math.sin(raan);
  const cosU = Math.cos(u);
  const sinU = Math.sin(u);
  const cosI = Math.cos(i);
  const sinI = Math.sin(i);

  // 8. Coordonnées ECI (Terre-centré inertiel) en km
  // Formules classiques :
  // x = r (cosΩ cos u - sinΩ sin u cos i)
  // y = r (sinΩ cos u + cosΩ sin u cos i)
  // z = r (sin u sin i)
  const xKm = rKm * (cosRAAN * cosU - sinRAAN * sinU * cosI);
  const yKm = rKm * (sinRAAN * cosU + cosRAAN * sinU * cosI);
  const zKm = rKm * (sinU * sinI);

  // 9. Conversion en mètres pour Cesium
  const xMeters = xKm * 1000;
  const yMeters = yKm * 1000;
  const zMeters = zKm * 1000;

  return new Cartesian3(xMeters, yMeters, zMeters);
}