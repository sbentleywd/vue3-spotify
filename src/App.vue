<script setup lang="ts">
import { onMounted } from 'vue'
import { useAuthStore } from './stores/auth'
import Welcome from './components/Welcome.vue'
import MainSection from './components/MainSection.vue'
const store = useAuthStore()

onMounted(() => {
  store.getAuth()
})
</script>

<template>
  <v-container>
    <Welcome v-if="!store.authorised"/>
    <MainSection v-else />
  </v-container>
</template>

<style scoped></style>
