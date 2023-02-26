<script setup lang="ts">
import { ref } from 'vue'
import Artists from './Artists.vue'
import Tracks from './Tracks.vue'
const model = ref('Artists')
</script>

<template>
  <div>
    <h1>Selections</h1>
    <v-switch v-model="model" hide-details true-value="Artists" false-value="Tracks" />
    <Artists v-if="model === 'Artists'" />
    <Tracks v-else />
  </div>
</template>

<style scoped></style>
