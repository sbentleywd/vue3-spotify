<script setup lang="ts">
import { useSelectionStore } from '@/stores/selectionStore';
import { computed } from '@vue/reactivity';
import TrackItem from '@/components//Selection/TrackItem.vue';
import { usePlayerStore } from '@/stores/playerStore';

const selectionStore = useSelectionStore();
const playerStore = usePlayerStore();
const recommendations = computed(() => selectionStore.recommendations);
const currentTrackId = computed(() => playerStore.getCurrentTrack?.id);
</script>

<template>
  <div class="fill-height d-flex flex-column justify-start">
    <v-row class="flex-grow-0 flex-shrink-0" style="height: 80px">
      <v-col cols="12" class="d-flex align-center justify-center">
        <span>Recommendations</span>
        <v-btn icon="mdi-refresh" class="ms-auto" @click="selectionStore.getRecommendations()"></v-btn
      ></v-col>
    </v-row>
    <span class="test-body-2" v-if="!recommendations.length">Select up to 5 seeds to generate recommendations</span>
    <v-list v-else class="rounded-lg elevation-2 flex-grow-1">
      <TrackItem
        v-for="(track, index) in recommendations"
        :key="index"
        :track-data="track"
        :now-playing="currentTrackId === track.id"
        mode="results"
      />
    </v-list>
  </div>
</template>

<style scoped></style>
