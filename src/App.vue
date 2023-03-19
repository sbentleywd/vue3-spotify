<script setup lang="ts">
import { onMounted } from 'vue'
import { useAuthStore } from './stores/authStore'
import Welcome from './components/Welcome.vue'
import MainSection from './components/MainSection.vue'

const store = useAuthStore()

onMounted(() => {
  store.checkAuth()
})
</script>

<template>
  <v-container>
    <Welcome v-if="!store.sessionToken" />
    <MainSection v-else />
  </v-container>
</template>

<style scoped></style>
