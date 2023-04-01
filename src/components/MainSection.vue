<script setup lang="ts">
import SeedSelection from './Selection/SeedSelection.vue'
import Results from './Results.vue'
</script>

<template>
  <v-row style="width: 100%">
    <v-col cols="12" md="6" xs="12" class="text-center appSection">
      <SeedSelection />
    </v-col>
    <v-col cols="12" md="6" xs="12" class="text-center appSection">
      <Results />
    </v-col>
  </v-row>
</template>

<style scoped lang="scss">
.appSection {
  height: calc(100vh - 100px - 10px);
  overflow: hidden;
}
</style>
