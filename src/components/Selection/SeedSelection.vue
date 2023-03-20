<script setup lang="ts">
import { ref } from 'vue'
import Artists from './Artists.vue'
import Tracks from './Tracks.vue'
const model = ref('Artists')
</script>

<template>
  <div>
    <v-row>
      <h1>Selections</h1>
    </v-row>
    <v-row>
      <v-col cols="12" class="d-flex align-center justify-center">
        Tracks
        <v-switch
          v-model="model"
          hide-details
          true-value="Artists"
          false-value="Tracks"
          color="secondary"
          class="flex-grow-0 mx-4"
        />
        Artists
      </v-col>
    </v-row>

    <Artists v-if="model === 'Artists'" />
    <Tracks v-else />
  </div>
</template>

<style scoped></style>
