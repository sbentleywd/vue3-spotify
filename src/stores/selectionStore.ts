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
    },
    getSelectedTrackIds(): string[] {
      return this.selectedTracks.map((track: track) => track.id)
    }
  },
  actions: {
    toggleArtistSelection(artist: artist) {
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
    },
    toggleTrackSelection(track: track) {
      if (this.getSelectedTrackIds.includes(track.id)) {
        this.unselectTrack(track.id)
      } else {
        this.selectTrack(track)
      }
    },
    selectTrack(track: track): void {
      if (this.selectedTracks.length < 5) this.selectedTracks.push(track)
    },
    unselectTrack(trackId: string): void {
      this.selectedTracks = this.selectedTracks.filter((track: track) => track.id !== trackId)
    }
  }
})
