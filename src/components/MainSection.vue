<script setup lang="ts">
import SeedSelection from './Selection/SeedSelection.vue'
import Results from './Results/Results.vue'
</script>

<template>
  <v-row style="width: 100%" id="mainRow">
    <v-col cols="12" md="6" xs="12" class="text-center mainCol">
      <SeedSelection />
    </v-col>
    <v-col cols="12" md="6" xs="12" class="text-center mainCol">
      <Results />
    </v-col>
  </v-row>
</template>

<style scoped lang="scss">
#mainRow {
  .mainCol {
    height: 550px;
  }
}

@media (min-width: 600px) {
  #mainRow {
    height: 100%;
    .mainCol {
      height: 100%;
    }
  }
}
</style>
