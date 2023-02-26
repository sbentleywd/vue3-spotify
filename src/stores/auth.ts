import { defineStore } from 'pinia'
import spotifyAPI from '../services/spotify'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: ''
  }),
  actions: {
    getAuth(): void {
      // If token exists do nothing
      if (this.token.length) return

      const sessionToken = sessionStorage.getItem('spotifyToken')
      if (sessionToken) {
        this.token = sessionToken
        return
      }

      // check for access token match in location
      const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/)
      const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/)

      if (accessTokenMatch && expiresInMatch) {
        this.token = accessTokenMatch[1]
        sessionStorage.setItem('spotifyToken', accessTokenMatch[1])
        const expiresIn = Number(expiresInMatch[1])
        window.setTimeout(() => this.refreshToken(), expiresIn * 1000)
        window.history.pushState('Access Token', '', '/')
      } else {
        // redirect to spotify auth
        const clientId = '2605e63cad504fc6889cb31b91f1eff3'
        const scopes =
          'playlist-modify-public user-library-read user-top-read streaming user-read-email user-read-private user-library-modify user-read-recently-played'
        const redirectUri =
          process.env.NODE_ENV === 'production'
            ? 'https://spotify-recommend.netlify.app'
            : 'http://127.0.0.1:5173'
        const accessUri = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=${encodeURIComponent(
          scopes
        )}&redirect_uri=${redirectUri}`
        window.location.href = accessUri
      }
    },
    refreshToken(): void {
      // on token expiry generate refresh token
      this.token = ''
      sessionStorage.removeItem('spotifyToken')
    }
  }
})
