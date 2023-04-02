<script setup lang="ts">
import Artists from './Artists.vue'
import Tracks from './Tracks.vue'
import { useSelectionStore } from '@/stores/selectionStore'
const selectionStore = useSelectionStore()
</script>

<template>
  <div class="fill-height d-flex flex-column justify-start">
    <v-row>
      <v-col cols="12" class="d-flex align-center justify-center">
        Tracks
        <v-switch
          v-model="selectionStore.model"
          hide-details
          true-value="artists"
          false-value="tracks"
          color="secondary"
          class="flex-grow-0 mx-4"
        />
        Artists
      </v-col>
    </v-row>

    <Artists v-if="selectionStore.model === 'artists'" />
    <Tracks v-else />
  </div>
</template>

<style scoped></style>
