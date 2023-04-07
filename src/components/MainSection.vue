<script setup lang="ts">
import SeedSelection from './Selection/SeedSelection.vue'
import Results from './Results/Results.vue'
</script>

<template>
  <v-row id="mainRow">
    <v-col cols="12" md="6" xs="12" class="text-center mainCol">
      <SeedSelection />
    </v-col>
    <v-col cols="12" md="6" xs="12" class="text-center mainCol">
      <Results />
    </v-col>
  </v-row>
</template>

<style lang="scss">
#mainRow {
  .mainCol {
    height: calc(100vh - var(--player-height) - var(--header-height));
  }
}
</style>
