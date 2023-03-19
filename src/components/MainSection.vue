<script setup lang="ts">
import SeedSelection from './Selection/SeedSelection.vue'
import Seeds from './Seeds.vue'
import Results from './Results.vue'
</script>

<template>
  <v-row>
    <v-col lg="4" md="6" sm="12" class="text-center">
      <SeedSelection />
    </v-col>
    <v-col lg="4" md="6" sm="12" class="text-center">
      <Seeds />
    </v-col>
    <v-col lg="4" md="6" sm="12" class="text-center">
      <Results />
    </v-col>
  </v-row>
</template>

<style scoped></style>
