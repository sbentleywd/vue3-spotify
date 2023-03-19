<script setup lang="ts">
import { useArtistsStore } from '../../stores/artistsStore'
import { computed } from '@vue/reactivity'
const artistsStore = useArtistsStore()
const topArtists = computed(() => artistsStore.topArtists)

artistsStore.getTopArtists()
</script>

<template>
  <h2>Artists</h2>
  <p v-for="(artist, index) in topArtists" :key="index">{{ artist.name }}</p>
</template>

<style scoped></style>
