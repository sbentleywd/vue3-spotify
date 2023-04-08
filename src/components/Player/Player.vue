<template>
  <v-row no-gutters v-if="currentTrack" class="fill-height">
    <v-col cols="3" md="2" xs="3" class="d-flex align-center justify-center">
      <v-img :src="trackImageUrl" alt="Track image" max-height="90"></v-img>
    </v-col>
    <v-col cols="9" md="10" xs="9">
      <v-row no-gutters class="fill-height">
        <v-col cols="12" md="6" xs="12" class="d-flex align-center justify-center"
          ><span class="text-truncate px-2">{{
            currentTrack.name + ' - ' + artistName
          }}</span></v-col
        >
        <v-col cols="6" md="4" xs="6" class="d-flex align-center justify-center">
          <v-icon @click="spotifyPlayer.previousTrack()" icon="mdi-skip-previous" class="mx-2" />
          <v-icon
            v-if="!playerState.paused"
            @click="spotifyPlayer.togglePlay()"
            icon="mdi-pause"
            class="mx-2"
          />
          <v-icon v-else @click="spotifyPlayer.togglePlay()" icon="mdi-play" class="mx-2" />
          <v-icon @click="spotifyPlayer.nextTrack()" icon="mdi-skip-next" class="mx-2" />
        </v-col>
        <v-col cols="6" md="2" xs="6" class="d-flex align-center justify-center"
          ><v-slider
            min="0"
            max="1"
            v-model="volume"
            hide-details
            color="secondary"
          ></v-slider></v-col
      ></v-row>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useAuthStore } from '@/stores/authStore'
import { usePlayerStore } from '@/stores/playerStore'
import type { track } from '@/types'
import { formatArtists } from '@/helpers'

const authStore = useAuthStore()
const playerStore = usePlayerStore()

const scriptLoaded = ref(false)
const spotifyPlayer = ref<any>(null)
const playerState = ref<null | any>(null)
const currentTrack = computed<track | null>(
  () => playerState?.value?.track_window.current_track || null
)
const trackImageUrl = computed(
  () => currentTrack.value?.album.images.find((img) => img.height === 64)?.url || ''
)
const artistName = computed(() =>
  currentTrack.value ? formatArtists(currentTrack.value.artists) : ''
)

const volume = ref(0.5)

watch(volume, (val) => spotifyPlayer.value.setVolume(val))

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

    // @ts-ignore
    player.addListener('autoplay_failed', ({ device_id }) => {
      console.log('Device ID has gone offline', device_id)
    })

    // @ts-ignore
    player.addListener('player_state_changed', (state) => {
      playerState.value = state
      console.log(state)
    })

    player.connect()
  }
}

loadScript()
</script>
