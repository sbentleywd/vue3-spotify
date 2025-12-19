import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    sessionToken: null as null | string,
    clientId: '2605e63cad504fc6889cb31b91f1eff3',
    // @ts-ignore
    redirectUri: process.env.NODE_ENV === 'production' ? 'https://recommend-me3.netlify.app' : 'http://127.0.0.1:5173',
    codeVerifier: null as null | string
  }),

  actions: {
    async checkAuth() {
      if (this.sessionToken) return;

      // check for token in session storage
      const sessionToken = localStorage.getItem('spotifyToken');
      const tokenExpiry = Number(localStorage.getItem('spotifyTokenExpiry'));
      if (sessionToken && tokenExpiry && tokenExpiry > Date.now()) {
        this.sessionToken = sessionToken;
        return;
      }

      // check for refresh token
      const refreshToken = localStorage.getItem('spotifyRefreshToken');
      if (refreshToken) {
        this.refreshToken();
        return;
      }

      // check for code verifier in local storage
      this.codeVerifier = localStorage.getItem('spotifyVerifier');

      // check for code in location to exchange for token
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get('code');

      if (code) {
        await this.getAuthToken(code);
      } else {
        await this.getAuthCode();
      }
    },

    async getAuthCode(): Promise<void> {
      // redirect to spotify auth
      const scopes =
        'playlist-modify-public user-library-read user-top-read streaming user-read-email user-read-private user-library-modify user-read-recently-played user-read-playback-state';

      const params = new URLSearchParams({
        client_id: this.clientId,
        response_type: 'code',
        scope: encodeURIComponent(scopes),
        redirect_uri: this.redirectUri,
        code_challenge_method: 'S256',
        code_challenge: await this.generateChallenge()
      });
      const accessUri = `https://accounts.spotify.com/authorize?${params.toString()}`;

      window.location.href = accessUri;
    },

    async getAuthToken(code: string): Promise<void> {
      // exchange code for token
      const payload = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
          client_id: this.clientId,
          grant_type: 'authorization_code',
          code: code,
          redirect_uri: this.redirectUri,
          code_verifier: this.codeVerifier as string
        })
      };

      const url = 'https://accounts.spotify.com/api/token';
      const response = await fetch(url, payload);

      if (response.status === 200) {
        const data = await response.json();
        this.setAccessTokenFromResponse(data);

        // remove code from url
        const url = new URL(window.location.href);
        // Remove query param
        url.searchParams.delete('code');
        // Replace the URL in the address bar without reloading
        window.history.replaceState({}, '', url);
      }
    },

    setAccessTokenFromResponse(tokenResponse: any): void {
      this.sessionToken = tokenResponse.access_token;
      localStorage.setItem('spotifyToken', tokenResponse.access_token);
      localStorage.setItem('spotifyRefreshToken', tokenResponse.refresh_token);
      const expiresIn = Number(tokenResponse.expires_in) * 1000;
      const tokenExpiry = Date.now() + expiresIn;
      localStorage.setItem('spotifyTokenExpiry', tokenExpiry.toString());
      if (tokenResponse.refresh_token) window.setTimeout(() => this.refreshToken(), expiresIn);
    },

    async refreshToken(): Promise<void> {
      // use refresh token to get new access token
      localStorage.removeItem('spotifyToken');
      this.sessionToken = null;

      const refreshToken = localStorage.getItem('spotifyRefreshToken');

      const url = 'https://accounts.spotify.com/api/token';

      const payload = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
          grant_type: 'refresh_token',
          refresh_token: refreshToken as string,
          client_id: this.clientId
        })
      };
      const response = await fetch(url, payload);
      if (response.status === 200) {
        const data = await response.json();
        this.setAccessTokenFromResponse(data);
      }
    },

    async generateChallenge(): Promise<string> {
      // generate code challenge for PKCE flow
      // see https://developer.spotify.com/documentation/web-api/tutorials/code-pkce-flow
      const generateRandomString = (length: number) => {
        const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const values = crypto.getRandomValues(new Uint8Array(length));
        return values.reduce((acc, x) => acc + possible[x % possible.length], '');
      };

      this.codeVerifier = generateRandomString(64);

      localStorage.setItem('spotifyVerifier', this.codeVerifier);

      const sha256 = async (plain: string) => {
        const encoder = new TextEncoder();
        const data = encoder.encode(plain);
        return window.crypto.subtle.digest('SHA-256', data);
      };

      const base64encode = (input: ArrayBuffer) => {
        return btoa(String.fromCharCode(...new Uint8Array(input)))
          .replace(/=/g, '')
          .replace(/\+/g, '-')
          .replace(/\//g, '_');
      };

      const hashed = await sha256(this.codeVerifier);
      const codeChallenge = base64encode(hashed);
      return codeChallenge;
    }
  }
});
