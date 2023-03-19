<script setup lang="ts">
import { useUserStore } from '../../stores/userStore'
import { computed } from '@vue/reactivity'
const userStore = useUserStore()
const topArtists = computed(() => userStore.topArtists)

userStore.getTopArtists()
</script>

<template>
  <h2>Artists</h2>
  <p v-for="(artist, index) in topArtists" :key="index">{{ artist.name }}</p>
</template>

<style scoped></style>
