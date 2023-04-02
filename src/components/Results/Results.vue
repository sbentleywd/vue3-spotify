<script setup lang="ts">
import { useSelectionStore } from '@/stores/selectionStore'
import { computed } from '@vue/reactivity'
import TrackItem from '@/components//Selection/TrackItem.vue'

const selectionStore = useSelectionStore()
const recommendations = computed(() => selectionStore.recommendations)
</script>

<template>
  <div class="fill-height d-flex flex-column justify-start">
    <v-row class="flex-grow-0 flex-shrink-0" style="height: 80px">
      <v-col cols="12" class="d-flex align-center justify-center"> Recommendations </v-col>
    </v-row>
    <span class="test-body-2" v-if="!recommendations.length"
      >Select up to 5 seeds to generate recommendations</span
    >
    <v-list v-else class="rounded-lg flex-grow-1">
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
