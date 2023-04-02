import { defineStore } from 'pinia'
import spotify from '../services/spotify'
import type { track, artist, currentUser } from '@/types'

export const useUserStore = defineStore('user', {
  state: () => ({
    topArtists: [] as artist[],
    topTracks: [] as track[],
    userDetails: null as null | currentUser
  }),
  actions: {
    async getTopArtists(): Promise<void> {
      if (this.topArtists.length) return
      const response = await spotify.getTopItems('artists', 20)
      this.topArtists = response.data.items
    },
    async getTopTracks(): Promise<void> {
      if (this.topTracks.length) return
      const response = await spotify.getTopItems('tracks', 20)
      this.topTracks = response.data.items
    },
    async getUserInfo(): Promise<void> {
      const response = await spotify.getUserDetails()
      if (response.status === 200) {
        this.userDetails = response.data
      }
    }
  }
})
