<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useAuthStore } from './stores/auth'
const store = useAuthStore()

onMounted(() => {
  store.getAuth()
})
</script>

<template>
  <h1>Welcome, your token is: {{ store.token }}</h1>
</template>

<style scoped></style>
