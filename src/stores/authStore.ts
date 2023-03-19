import { defineStore } from 'pinia'
import spotifyAPI from '../services/spotify'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    sessionToken: null as null | string
  }),
  actions: {
    checkAuth() {
      console.log(window.location.href)
      if (this.sessionToken) return

      // check for token in session storage
      const sessionToken = sessionStorage.getItem('spotifyToken')
      if (sessionToken) {
        this.sessionToken = sessionToken
        return
      }

      // check for access token match in location
      const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/)
      const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/)

      if (accessTokenMatch && expiresInMatch) {
        sessionStorage.setItem('spotifyToken', accessTokenMatch[1])
        this.sessionToken = accessTokenMatch[1]
        const expiresIn = Number(expiresInMatch[1])
        window.setTimeout(() => this.refreshToken(), expiresIn * 1000)
        window.history.pushState('Access Token', '', '/')
      } else {
        this.getAuthToken()
      }
    },
    getAuthToken(): void {
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
    },
    refreshToken(): void {
      // on token expiry generate refresh token
      sessionStorage.removeItem('spotifyToken')
      this.sessionToken = null
    }
  }
})
