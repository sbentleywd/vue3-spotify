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
  getTopItems(type: string, limit: number = 20, term: string = 'long_term') {
    return spotifyAPI.get(`me/top/${type}?&limit=${limit}&time_range=${term}`)
  }
}
