<script setup lang="ts">
import { useSelectionStore } from '@/stores/selectionStore'
import { computed } from '@vue/reactivity'
import TrackItem from '@/components//Selection/TrackItem.vue'

const selectionStore = useSelectionStore()
const recommendations = computed(() => selectionStore.recommendations)
</script>

<template>
  <div class="fill-height d-flex flex-column">
    <v-list class="rounded-lg">
      <TrackItem
        v-for="(track, index) in recommendations"
        :key="index"
        :track-data="track"
        mode="results"
      />
    </v-list>
  </div>
</template>

<style scoped></style>
