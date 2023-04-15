import { defineStore } from 'pinia'
import spotifyAPI from '../services/spotify'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    sessionToken: null as null | string
  }),
  actions: {
    checkAuth() {
      if (this.sessionToken) return

      // check for token in session storage
      const sessionToken = sessionStorage.getItem('spotifyToken')
      const tokenExpiry = Number(sessionStorage.getItem('spotifyTokenExpiry'))
      if (sessionToken && tokenExpiry && tokenExpiry > Date.now()) {
        this.sessionToken = sessionToken
        return
      }

      // check for access token match in location
      const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/)
      const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/)

      if (accessTokenMatch && expiresInMatch) {
        sessionStorage.setItem('spotifyToken', accessTokenMatch[1])
        this.sessionToken = accessTokenMatch[1]
        const expiresIn = Number(expiresInMatch[1]) * 1000
        const tokenExpiry = Date.now() + expiresIn
        sessionStorage.setItem('spotifyTokenExpiry', tokenExpiry.toString())
        window.setTimeout(() => this.refreshToken(), expiresIn)
        window.history.pushState('Access Token', '', '/')
      } else {
        this.getAuthToken()
      }
    },
    getAuthToken(): void {
      // redirect to spotify auth
      const clientId = '7b398c9e4ed743678c514522af3e9f95'
      const scopes =
        'playlist-modify-public user-library-read user-top-read streaming user-read-email user-read-private user-library-modify user-read-recently-played'
      const redirectUri =
        process.env.NODE_ENV === 'production'
          ? 'https://recommend-me3.netlify.app'
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
