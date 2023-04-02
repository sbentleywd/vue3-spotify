<template>
  <h2>Player</h2>
  <p>Script loaded: {{ scriptLoaded }}</p>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/stores/authStore'
import { usePlayerStore } from '@/stores/playerStore'

const authStore = useAuthStore()
const playerStore = usePlayerStore()

const scriptLoaded = ref(false)
const spotifyPlayer = ref<any>(null)

const loadScript = async () => {
  const script = document.createElement('script')
  script.src = 'https://sdk.scdn.co/spotify-player.js'
  script.async = true
  script.onload = () => (scriptLoaded.value = true)
  await document.body.appendChild(script)

  // @ts-ignore
  window.onSpotifyWebPlaybackSDKReady = () => {
    // @ts-ignore
    const player = new window.Spotify.Player({
      name: 'Web Playback SDK',
      getOAuthToken: (cb: (token: string) => void) => {
        cb(authStore.sessionToken as string)
      },
      volume: 0.5
    })

    spotifyPlayer.value = player

    // @ts-ignore
    player.addListener('ready', ({ device_id }) => {
      console.log('Ready with Device ID', device_id)
      playerStore.deviceId = device_id
    })

    // @ts-ignore
    player.addListener('not_ready', ({ device_id }) => {
      console.log('Device ID has gone offline', device_id)
    })

    player.connect()
  }
}

loadScript()
</script>
