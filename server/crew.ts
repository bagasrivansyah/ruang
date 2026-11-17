// The Noblesse crew: the fixed local roster that fills the Ruang office when this machine
// reports no Hermes profiles. Hermes is not installed here and must never be, so the office
// never depends on the Hermes CLI — this file is the crew's source of truth. Edit the roster
// below to change who works in the office, their rooms, or what each of them is doing.
//
// Rooms follow the Mission Control layout: A Script, B Animation, C Audio, D Upload &
// Meeting, plus the Lounge (Ruang Istirahat) and the pantry. One crew member rests each
// hour (server UTC hour), so the lounge and pantry see use and the office feels alive.

export type CrewRoom = 'Workspace' | 'Lounge'
export type CrewState = 'Idle' | 'Working' | 'Reviewing' | 'Collaborating' | 'Offline' | 'Unknown'

export interface CrewMember {
  /** Stable lowercase id, also used for the agent's look and desk seat. */
  id: string
  name: string
  /** Job title, with the team it belongs to. Shown in the office labels and detail view. */
  role: string
  team: 'YouTube' | 'Facebook'
  room: CrewRoom
  /** Named room within the office; the UI renders these slugs as "Ruang A · Script" etc. */
  roomPosition: string
  state: CrewState
  currentTask: string
  /** Short label of what the crew member is doing now (shown above their name). */
  activity: string
  recentActivity: string
}

export const NOBLESSE_CREW: CrewMember[] = [
  { id: 'sinta', name: 'Sinta', role: 'Naskah · YouTube', team: 'YouTube', room: 'Workspace', roomPosition: 'ruang-a-script', state: 'Working', currentTask: 'Menulis naskah Short hari ini', activity: 'Menulis naskah Short', recentActivity: 'Menyiapkan naskah Short Islami hari ini' },
  { id: 'bima', name: 'Bima', role: 'Animasi AI · YouTube', team: 'YouTube', room: 'Workspace', roomPosition: 'ruang-b-animation', state: 'Working', currentTask: 'Membuat animasi AI untuk Short', activity: 'Menganimasikan Short', recentActivity: 'Membuat animasi AI untuk Short hari ini' },
  { id: 'raka', name: 'Raka', role: 'Audio & Voiceover · YouTube', team: 'YouTube', room: 'Workspace', roomPosition: 'ruang-c-audio', state: 'Working', currentTask: 'Merekam voiceover Short', activity: 'Merekam voiceover', recentActivity: 'Merekam voiceover untuk Short hari ini' },
  { id: 'dewi', name: 'Dewi', role: 'QC · YouTube', team: 'YouTube', room: 'Workspace', roomPosition: 'ruang-d-upload', state: 'Reviewing', currentTask: 'QC video sebelum upload', activity: 'Memeriksa kualitas video', recentActivity: 'Memeriksa kualitas video sebelum diunggah' },
  { id: 'nadia', name: 'Nadia', role: 'Hooks · Facebook', team: 'Facebook', room: 'Workspace', roomPosition: 'ruang-a-script', state: 'Working', currentTask: 'Menulis hook Reels', activity: 'Meracik hook Reels', recentActivity: 'Menulis hook pembuka untuk Reels hari ini' },
  { id: 'fajar', name: 'Fajar', role: 'Editing Reels · Facebook', team: 'Facebook', room: 'Workspace', roomPosition: 'ruang-b-animation', state: 'Working', currentTask: 'Mengedit Reels hari ini', activity: 'Mengedit Reels', recentActivity: 'Mengedit Reels untuk posting hari ini' },
  { id: 'maya', name: 'Maya', role: 'Analitik · Facebook', team: 'Facebook', room: 'Workspace', roomPosition: 'ruang-d-upload', state: 'Working', currentTask: 'Menganalisis performa konten', activity: 'Menganalisis insight', recentActivity: 'Menganalisis performa konten minggu ini' },
  { id: 'rian', name: 'Rian', role: 'Komunitas · Facebook', team: 'Facebook', room: 'Workspace', roomPosition: 'meeting-area', state: 'Collaborating', currentTask: 'Membalas komentar komunitas', activity: 'Membalas komentar', recentActivity: 'Membalas komentar penonton dan komunitas' },
]

/** Which crew member rests this hour (server UTC hour, so it is the same everywhere). */
export function breakIndex(now: number): number {
  return new Date(now).getUTCHours() % NOBLESSE_CREW.length
}

export interface PlacedCrew { state: CrewState; room: CrewRoom; roomPosition: string; currentTask: string; activity: string; recentActivity: string }

/** Where a crew member is at a given time: at their desk, or on their hourly break in the lounge. */
export function crewStation(member: CrewMember, index: number, now: number): PlacedCrew {
  if (index === breakIndex(now)) {
    return { state: 'Idle', room: 'Lounge', roomPosition: `lounge-seat-${index + 1}`, currentTask: 'Istirahat', activity: 'Istirahat sejenak', recentActivity: 'Istirahat di lounge dan pantry' }
  }
  return { state: member.state, room: member.room, roomPosition: member.roomPosition, currentTask: member.currentTask, activity: member.activity, recentActivity: member.recentActivity }
}
