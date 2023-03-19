import { defineStore } from 'pinia'
import spotifyAPI from '../services/spotify'

export const useUserStore = defineStore('artists', {
  state: () => ({
    topArtists: [] as SpotifyApi.ArtistObjectFull[],
    topTracks: [] as SpotifyApi.TrackObjectFull[]
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
