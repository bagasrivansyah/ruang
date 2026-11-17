// The office crew is the Noblesse roster (server/crew.ts), so each member has a fixed
// anime look: hair colour and style, eye colour and outfit. Unknown ids fall back to a
// hash-derived look, so nothing here breaks if the roster grows.

export type HairStyle = 'short' | 'long' | 'bob' | 'ponytail' | 'spiky'

export interface AgentLook { hair: string; skin: string; shirt: string; pants: string; eyes: string; hairStyle: HairStyle }

const CREW_LOOKS: Record<string, AgentLook> = {
  sinta: { hair: '#2b2118', skin: '#f1c9a0', shirt: '#f4a3b4', pants: '#374052', eyes: '#7b2d8b', hairStyle: 'long' },
  bima: { hair: '#b03030', skin: '#e9b57d', shirt: '#5a8dee', pants: '#36475d', eyes: '#1d3557', hairStyle: 'spiky' },
  raka: { hair: '#11151c', skin: '#dca06e', shirt: '#93ca67', pants: '#2f3a44', eyes: '#3a2a1a', hairStyle: 'short' },
  dewi: { hair: '#3b2a20', skin: '#f1c9a0', shirt: '#e6b34e', pants: '#4a3b2f', eyes: '#2a9d8f', hairStyle: 'bob' },
  nadia: { hair: '#e07b39', skin: '#e9b57d', shirt: '#8f7ae6', pants: '#3d2f4a', eyes: '#6a4c93', hairStyle: 'ponytail' },
  fajar: { hair: '#1d293c', skin: '#c98e5a', shirt: '#70bdcb', pants: '#344349', eyes: '#1d3557', hairStyle: 'short' },
  maya: { hair: '#6a4d8d', skin: '#f1c9a0', shirt: '#e76f51', pants: '#374052', eyes: '#7b2d8b', hairStyle: 'long' },
  rian: { hair: '#2f4f3a', skin: '#e9b57d', shirt: '#4f9c7a', pants: '#36475d', eyes: '#2a9d8f', hairStyle: 'spiky' },
}

const HAIR = ['#1d293c', '#b54b45', '#6a4d8d', '#3b2a20', '#c9a24a', '#2f4f3a', '#8b5a2b', '#11151c']
const SKIN = ['#e9b57d', '#c98e5a', '#f1c9a0', '#a8714a', '#dca06e']
const SHIRT = ['#e6b34e', '#70bdcb', '#93ca67', '#e76f51', '#8f7ae6', '#f4a3b4', '#4f9c7a', '#d9534f', '#5a8dee', '#c7a17a']
const PANTS = ['#36475d', '#374052', '#344349', '#4a3b2f', '#2f3a44', '#3d2f4a']
const EYES = ['#3a2a1a', '#1d3557', '#6a4c93', '#2a9d8f', '#7b2d8b']

/** A small stable hash (FNV-1a) so an agent keeps the same look on every device. */
export function hashName(name: string): number {
  let hash = 2166136261
  for (let index = 0; index < name.length; index += 1) {
    hash ^= name.charCodeAt(index)
    hash = Math.imul(hash, 16777619)
  }
  return hash >>> 0
}

export function agentLook(id: string): AgentLook {
  const crew = CREW_LOOKS[id.toLowerCase()]
  if (crew) return crew
  const hash = hashName(id)
  return { hair: HAIR[hash % HAIR.length], skin: SKIN[(hash >>> 4) % SKIN.length], shirt: SHIRT[(hash >>> 8) % SHIRT.length], pants: PANTS[(hash >>> 12) % PANTS.length], eyes: EYES[(hash >>> 16) % EYES.length], hairStyle: 'short' }
}
