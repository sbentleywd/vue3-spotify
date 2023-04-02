import { defineStore } from 'pinia'
import type { track } from '@/types'
import spotify from '@/services/spotify'

export const usePlayerStore = defineStore({
  id: 'player',
  state: () => ({
    deviceId: ''
  }),
  actions: {
    playTracks(tracks: track[]) {
      const uris = tracks.map((track: track) => track.uri)
      spotify.play(uris, this.deviceId)
    }
  }
})
