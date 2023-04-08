<script setup lang="ts">
import { useUserStore } from '../../stores/userStore'
import { useSelectionStore } from '@/stores/selectionStore'

import { computed } from '@vue/reactivity'
import TrackItem from '@/components//Selection/TrackItem.vue'
const userStore = useUserStore()
const selectionStore = useSelectionStore()
const topTracks = computed(() => userStore.topTracks)
const selectedTrackIds = computed(() => selectionStore.getSelectedTrackIds)

userStore.getTopTracks()
</script>

<template>
  <v-list class="rounded-lg  elevation-2">
    <TrackItem
      v-for="(track, index) in topTracks"
      :key="index"
      :track-data="track"
      :selected="selectedTrackIds.includes(track.id)"
      :disabled="selectedTrackIds.length > 4 && !selectedTrackIds.includes(track.id)"
      mode="selection"
    />
  </v-list>
</template>
