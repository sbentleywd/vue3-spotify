import { defineStore } from 'pinia'
import spotifyAPI from '../services/spotify'
import type { track, artist } from '@/types'

export const useUserStore = defineStore('user', {
  state: () => ({
    topArtists: [] as artist[],
    topTracks: [] as track[]
  }),
  actions: {
    async getTopArtists(): Promise<void> {
      if (this.topArtists.length) return
      const response = await spotifyAPI.getTopItems('artists', 20)
      this.topArtists = response.data.items
    },
    async getTopTracks(): Promise<void> {
      if (this.topTracks.length) return
      const response = await spotifyAPI.getTopItems('tracks', 20)
      this.topTracks = response.data.items
    }
  }
})
