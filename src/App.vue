<script setup lang="ts">
import Welcome from './components/Welcome.vue'
import MainSection from './components/MainSection.vue'
import { useAuthStore } from './stores/authStore'

const authStore = useAuthStore()
</script>

<template>
  <v-app id="app">
    <v-container id="appContainer" fluid class="d-flex flex-column fill-height">
      <Welcome v-if="!authStore.sessionToken" />
      <MainSection v-else />
      <div class="flex-grow-0 pa-2" id="playerContainer">
        <h1>player</h1>
      </div>
    </v-container>
  </v-app>
</template>

<style scoped lang="scss">
@media (min-width: 600px) {
  #app {
    height: 100vh;
  }
}

#appContainer {
  margin-bottom: 100px;
  overflow-y: auto;
}

#playerContainer {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 100px;
  background: rgb(var(--v-theme-background));
}
</style>
