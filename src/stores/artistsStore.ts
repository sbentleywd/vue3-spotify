import { defineStore } from 'pinia'
import spotifyAPI from '../services/spotify'

export const useArtistsStore = defineStore('artists', {
  state: () => ({
    topArtists: [] as SpotifyApi.ArtistObjectFull[]
  }),
  actions: {
    async getTopArtists(): Promise<void> {
      if (this.topArtists.length) return
      const response = await spotifyAPI.getTopArtists()
      this.topArtists = response.data.items
    }
  }
})
