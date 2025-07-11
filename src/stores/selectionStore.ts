import { defineStore } from 'pinia'
import type { artist, track } from '@/types'
import spotify from '@/services/spotify'
import { usePlayerStore } from './playerStore'

export const useSelectionStore = defineStore({
  id: 'selections',
  state: () => ({
    selectedArtists: [] as artist[],
    selectedTracks: [] as track[],
    recommendations: [] as track[],
    model: 'artists' as 'artists' | 'tracks',
    timeFrame: 'long_term',
    energy: 0.5,
    popularity: 0.5,
    instrumentalness: 0.5
  }),
  getters: {
    getSelectedArtistIds(): string[] {
      return this.selectedArtists.map((artist: artist) => artist.id)
    },
    getSelectedTrackIds(): string[] {
      return this.selectedTracks.map((track: track) => track.id)
    },
    getSeeds(): string[] {
      return this.model === 'artists' ? this.getSelectedArtistIds : this.getSelectedTrackIds
    }
  },
  actions: {
    toggleArtistSelection(artist: artist) {
      if (this.getSelectedArtistIds.includes(artist.id)) {
        this.unselectArtist(artist.id)
      } else {
        this.selectArtist(artist)
      }
      this.getRecommendations()
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
      this.getRecommendations()
    },
    selectTrack(track: track): void {
      if (this.selectedTracks.length < 5) this.selectedTracks.push(track)
    },
    unselectTrack(trackId: string) {
      this.selectedTracks = this.selectedTracks.filter((track: track) => track.id !== trackId)
    },
    async getRecommendations() {
      if (!this.getSeeds.length) {
        this.recommendations = []
        return
      }
      const response = await spotify.getRecommendations(this.model, this.getSeeds)
      if ((response.status = 200)) {
        this.recommendations = response.data.tracks
        const playerStore = usePlayerStore()
        await playerStore.playTracks(response.data.tracks)
      }
    },
    skipToTrack(track: track) {
      if (!this.recommendations) return
      const recommendationIndex = this.recommendations.findIndex(
        (recommendation: track) => track.id === recommendation.id
      )
      const newQueue = this.recommendations.slice(recommendationIndex)
      const playerStore = usePlayerStore()
      playerStore.playTracks(newQueue)
    },
    resetRecommendationSettings() {
      this.energy = 0.5
      this.popularity = 0.5
      this.instrumentalness = 0.5
    }
  }
})
