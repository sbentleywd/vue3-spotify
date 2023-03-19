<script setup lang="ts">
import { useUserStore } from '../../stores/userStore'
import { computed } from '@vue/reactivity'
const userStore = useUserStore()
const topTracks = computed(() => userStore.topTracks)

userStore.getTopTracks()
</script>

<template>
  <h2>Tracks</h2>
  <p v-for="(track, index) in topTracks" :key="index">{{ track.name }}</p>
</template>

<style scoped></style>
