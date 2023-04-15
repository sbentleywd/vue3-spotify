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
    async getTopArtists(term: string = 'long_term'): Promise<void> {
      const response = await spotify.getTopItems('artists', 20, term)
      this.topArtists = response.data.items
    },
    async getTopTracks(term: string = 'long_term'): Promise<void> {
      const response = await spotify.getTopItems('tracks', 20, term)
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
