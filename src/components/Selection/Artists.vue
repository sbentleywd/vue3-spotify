<script setup lang="ts">
import { useUserStore } from '../../stores/userStore'
import { computed } from '@vue/reactivity'
import ArtistItem from '@/components/Selection/ArtistItem.vue'
const userStore = useUserStore()
const topArtists = computed(() => userStore.topArtists)

userStore.getTopArtists()
</script>

<template>
  <v-list class="rounded-lg">
    <ArtistItem v-for="(artist, index) in topArtists" :key="index" :item-data="artist" />
  </v-list>
</template>

<style scoped></style>
