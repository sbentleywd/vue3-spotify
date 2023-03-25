<script setup lang="ts">
import SeedSelection from './Selection/SeedSelection.vue'
import Results from './Results.vue'
</script>

<template>
  <v-row>
    <v-col cols="6" sm="6" xs="12" class="text-center">
      <SeedSelection />
    </v-col>
    <v-col cols="6" sm="6" xs="12" class="text-center">
      <Results />
    </v-col>
  </v-row>
</template>

<style scoped></style>
