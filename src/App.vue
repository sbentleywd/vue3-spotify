<script setup lang="ts">
import Welcome from './components/Welcome.vue'
import MainSection from './components/MainSection.vue'
import { useAuthStore } from './stores/authStore'

const authStore = useAuthStore()
</script>

<template>
  <v-app>
    <v-container>
      <Welcome v-if="!authStore.sessionToken" />
      <MainSection v-else />
    </v-container>
  </v-app>
</template>

<style scoped></style>
