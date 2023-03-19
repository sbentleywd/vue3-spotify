import { defineStore } from 'pinia'
import spotifyAPI from '../services/spotify'

export const useArtistsStore = defineStore('artists', {
  state: () => ({
    topArtists: [] as SpotifyApi.ArtistObjectFull[]
  }),
  actions: {
    async getTopArtists(): Promise<void> {
      const response = await spotifyAPI.getTopArtists()
      this.topArtists = response.data.items
    }
  }
})
