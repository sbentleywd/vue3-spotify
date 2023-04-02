<script setup lang="ts">
import Welcome from '@/components/Welcome.vue'
import MainSection from '@/components/MainSection.vue'
import AppBar from '@/components/AppBar.vue'
import Player from '@/components/Player/Player.vue'
import { useAuthStore } from './stores/authStore'
import { useUserStore } from './stores/userStore'

const authStore = useAuthStore()
const userStore = useUserStore()

userStore.getUserInfo()
</script>

<template>
  <v-app id="app">
    <AppBar />
    <v-main class="fill-height">
      <v-container id="appContainer" fluid class="fill-height">
        <Welcome v-if="!authStore.sessionToken" />
        <MainSection v-else />
      </v-container>
    </v-main>
    <v-bottom-navigation><Player /></v-bottom-navigation>
  </v-app>
</template>

<style scoped lang="scss">
@media (min-width: 600px) {
  #app {
    height: 100vh;
  }
}
</style>
