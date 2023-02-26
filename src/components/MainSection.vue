<script setup lang="ts">
import SeedSelection from './Selection/SeedSelection.vue'
import Seeds from './Seeds.vue'
import Results from './Results.vue'
</script>

<template>
  <v-row>
    <v-col cols="4">
      <SeedSelection />
    </v-col>
    <v-col cols="4">
      <Seeds />
    </v-col>
    <v-col cols="4">
      <Results />
    </v-col>
  </v-row>
</template>

<style scoped></style>
