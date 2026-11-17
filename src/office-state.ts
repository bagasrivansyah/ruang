import type { Source } from './types.ts'

export type OfficeBadgeTone = 'good' | 'muted' | 'unknown'
export type OfficeState = 'Idle' | 'Working' | 'Reviewing' | 'Collaborating' | 'Offline' | 'Unknown'

export function officeBadge(source: Source<string> | undefined, kind: 'gateway' | 'version' = 'gateway'): { label: string; tone: OfficeBadgeTone } {
  if (!source || source.availability === 'unavailable') return { label: 'Not Available', tone: 'muted' }
  if (source.data === 'Unknown' || !source.data) return { label: 'Unknown', tone: 'unknown' }
  if (kind === 'version') return { label: 'Version Available', tone: 'good' }
  return { label: source.data, tone: source.data === 'Running' ? 'good' : 'unknown' }
}

export function officeStateBadge(state: OfficeState): { label: OfficeState; tone: OfficeBadgeTone } {
  return { label: state, tone: state === 'Offline' ? 'muted' : state === 'Unknown' || state === 'Idle' ? 'unknown' : 'good' }
}

/** Human-readable room name for a roomPosition slug (crew stations carry room slugs; Hermes stations carry desk labels, which pass through unchanged). */
export function roomPositionLabel(roomPosition: string): string {
  if (roomPosition === 'meeting-area') return 'Meeting area'
  if (roomPosition === 'ruang-a-script') return 'Ruang A · Script'
  if (roomPosition === 'ruang-b-animation') return 'Ruang B · Animation'
  if (roomPosition === 'ruang-c-audio') return 'Ruang C · Audio'
  if (roomPosition === 'ruang-d-upload') return 'Ruang D · Upload & Meeting'
  const lounge = /^lounge-seat-(\d+)$/.exec(roomPosition)
  if (lounge) return `Lounge seat ${lounge[1]}`
  const pantry = /^pantry-seat-(\d+)$/.exec(roomPosition)
  if (pantry) return `Pantry seat ${pantry[1]}`
  return roomPosition
}
