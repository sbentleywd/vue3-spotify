import { useAuthStore } from '@/stores/authStore';
import { useSelectionStore } from '@/stores/selectionStore';

const baseURL = 'https://api.spotify.com/v1/';

export const spotifyAPI = {
  async createRequest(method: string, url: string, body?: Record<string, unknown>) {
    const authStore = useAuthStore();
    if (!authStore.sessionToken) {
      await authStore.checkAuth();
    }

    const payload = {
      headers: {
        Authorization: `Bearer ${authStore.sessionToken}`
      },
      method
    } as RequestInit;

    if (body) payload.body = JSON.stringify(body);

    const response = await fetch(baseURL + url, payload);
    if (response.status === 200) {
      return await response.json();
    }
  }
};

export default {
  getTopItems(type: string, limit: number = 20, term: string = 'long_term') {
    return spotifyAPI.createRequest('GET', `me/top/${type}?&limit=${limit}&time_range=${term}`);
  },

  getRecommendations(type: string, seeds: string[]) {
    const selectionStore = useSelectionStore();
    const typeString = type === 'artists' ? 'seed_artists' : 'seed_tracks';
    const seedString = seeds.join(',');
    return spotifyAPI.createRequest(
      'GET',
      `recommendations?&${typeString}=${seedString}&energy=${selectionStore.energy.toString()}&instrumentalness=${
        selectionStore.instrumentalness
      }&popularity=${selectionStore.popularity}`
    );
  },

  getUserDetails() {
    return spotifyAPI.createRequest('GET', 'me');
  },

  play(uris: string[], deviceId: string) {
    return spotifyAPI.createRequest('PUT', `me/player/play?device_id=${deviceId}`, { uris, position_ms: 0 });
  },

  getQueue() {
    return spotifyAPI.createRequest('GET', 'me/player/queue');
  },

  checkLikes() {
    // check if tracks are in users saved tracks
  }
};
