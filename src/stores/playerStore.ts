import { defineStore } from 'pinia'
import type { track } from '@/types'
import spotify from '@/services/spotify'

export const usePlayerStore = defineStore({
  id: 'player',
  state: () => ({
    deviceId: ''
  }),
  actions: {
    async playTracks(tracks: track[]) {
      const uris = tracks.map((track: track) => track.uri)
      await spotify.play(uris, this.deviceId)
    },
    async getQueue() {
      return await spotify.getQueue()
    }
  }
})
