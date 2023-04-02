<script setup lang="ts">
import { ref, computed } from 'vue'
import { useUserStore } from '@/stores/userStore'
const userStore = useUserStore()
const settingsOpen = ref(false)
const userDetails = computed(() => userStore.userDetails)
const userImageUrl = computed(() => {
  return userDetails.value?.images ? userDetails.value?.images[0].url : undefined
})
</script>
<template>
  <v-app-bar rounded>
    <template v-slot:prepend>
      <v-app-bar-nav-icon @click="settingsOpen = !settingsOpen"></v-app-bar-nav-icon>
    </template>
    <v-app-bar-title>Spotify Recommend</v-app-bar-title>
  </v-app-bar>
  <v-navigation-drawer v-model="settingsOpen" temporary>
    <v-list>
      <v-list-item
        :prepend-avatar="userImageUrl"
        :title="userDetails?.display_name"
        :subtitle="userDetails?.email"
      ></v-list-item>
      <v-divider class="my-2" />
      <v-list-group value="selection">
        <template v-slot:activator="{ props }">
          <v-list-item v-bind="props" title="Selection settings"></v-list-item>
        </template>
        <v-list-item :title="'test'" :value="'test'"></v-list-item>
      </v-list-group>
      <v-divider class="my-2" />

      <v-list-group value="results">
        <template v-slot:activator="{ props }">
          <v-list-item v-bind="props" title="Recommendation settings"></v-list-item>
        </template>
        <v-list-item :title="'test'" :value="'test'"></v-list-item>
      </v-list-group>
    </v-list>
  </v-navigation-drawer>
</template>

<style scoped></style>
