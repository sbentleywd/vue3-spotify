import { defineStore } from 'pinia';
import type { track } from '@/types';
import spotify from '@/services/spotify';
import { formatArtists } from '@/helpers';

export const usePlayerStore = defineStore({
  id: 'player',
  state: () => ({
    deviceId: '',
    playerState: null as null | any
  }),
  getters: {
    getCurrentTrack(): track {
      return this.playerState?.track_window?.current_track;
    },
    getTrackImage(): string {
      return this.getCurrentTrack.album.images.find((img) => img.height === 64)?.url || '';
    },
    getArtistName(): string {
      return this.getCurrentTrack ? formatArtists(this.getCurrentTrack.artists) : '';
    }
  },
  actions: {
    async playTracks(tracks: track[]) {
      const uris = tracks.map((track: track) => track.uri);
      await spotify.play(uris, this.deviceId);
    },
    async getQueue() {
      return await spotify.getQueue();
    }
  }
});
