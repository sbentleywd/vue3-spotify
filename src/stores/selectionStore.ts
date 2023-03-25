import { defineStore } from 'pinia'
import type { artist, track } from '@/types'

export const useSelectionStore = defineStore({
  id: 'selections',
  state: () => ({
    selectedArtists: [] as artist[],
    selectedTracks: [] as track[]
  }),
  getters: {
    getSelectedArtistIds(): string[] {
      return this.selectedArtists.map((artist: artist) => artist.id)
    }
  },
  actions: {
    toggleArtistSelection(artist: artist) {
      console.log(artist.name)
      if (this.getSelectedArtistIds.includes(artist.id)) {
        this.unselectArtist(artist.id)
      } else {
        this.selectArtist(artist)
      }
    },
    selectArtist(artist: artist): void {
      if (this.selectedArtists.length < 5) this.selectedArtists.push(artist)
    },
    unselectArtist(artistId: string): void {
      this.selectedArtists = this.selectedArtists.filter((artist: artist) => artist.id !== artistId)
    }
  }
})
