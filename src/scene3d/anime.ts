import * as THREE from 'three'

// Shared anime look for the 3D office: cel (toon) shading via a stepped gradient map, so
// every surface renders in flat bands of light instead of a smooth PBR gradient. No extra
// dependencies — MeshToonMaterial is part of three.js.

let gradient: THREE.DataTexture | undefined

/** Four-step greyscale gradient (deep shade → shade → lit → highlight) for MeshToonMaterial. */
export function toonGradient(): THREE.DataTexture {
  if (!gradient) {
    const steps = new Uint8Array([110, 160, 205, 255])
    gradient = new THREE.DataTexture(steps, steps.length, 1, THREE.RedFormat)
    gradient.minFilter = THREE.NearestFilter
    gradient.magFilter = THREE.NearestFilter
    gradient.generateMipmaps = false
    gradient.needsUpdate = true
  }
  return gradient
}
