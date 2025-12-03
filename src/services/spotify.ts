import axios from 'axios';
import { useAuthStore } from '@/stores/authStore';
import { useSelectionStore } from '@/stores/selectionStore';

const spotifyAPI = axios.create({
  baseURL: 'https://api.spotify.com/v1/'
});

spotifyAPI.interceptors.request.use(async (config) => {
  const authStore = useAuthStore();
  await authStore.checkAuth();
  config.headers.Authorization = `Bearer ${authStore.sessionToken}`;
  return config;
});

export default {
  getTopItems(type: string, limit: number = 20, term: string = 'long_term') {
    return spotifyAPI.get(`me/top/${type}?&limit=${limit}&time_range=${term}`);
  },
  getRecommendations(type: string, seeds: string[]) {
    const selectionStore = useSelectionStore();
    const typeString = type === 'artists' ? 'seed_artists' : 'seed_tracks';
    const seedString = seeds.join(',');
    return spotifyAPI.get(
      `recommendations?&${typeString}=${seedString}&energy=${selectionStore.energy.toString()}&instrumentalness=${
        selectionStore.instrumentalness
      }&popularity=${selectionStore.popularity}`
    );
  },
  getUserDetails() {
    return spotifyAPI.get('me');
  },
  play(uris: string[], deviceId: string) {
    return spotifyAPI.put(`me/player/play?device_id=${deviceId}`, JSON.stringify({ uris, position_ms: 0 }));
  },
  getQueue() {
    return spotifyAPI.get('me/player/queue');
  }
};
