import type { artist, trackArtist } from '@/types';

export const formatArtists = (artists: Array<artist | trackArtist>) => {
  return artists.map((artist) => artist.name).join(', ');
};
