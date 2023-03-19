import axios from 'axios'

const accessToken = sessionStorage.getItem('spotifyToken')
const spotifyAPI = axios.create({
  baseURL: 'https://api.spotify.com/v1/',
  headers: {
    // 'Access-Control-Allow-Origin': '*',
    // 'Content-Type': 'application/json',
    Authorization: `Bearer ${accessToken}`
  }
})

export default {
  getTopArtists(term: string = 'long_term') {
    return spotifyAPI.get(`me/top/artists?&limit=50&time_range=${term}`)
  }
}
