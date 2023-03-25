<script setup lang="ts">
import { useUserStore } from '../../stores/userStore'
import { useSelectionStore } from '@/stores/selectionStore'
import { computed } from '@vue/reactivity'
import ArtistItem from '@/components/Selection/ArtistItem.vue'
const userStore = useUserStore()
const selectionStore = useSelectionStore()
const topArtists = computed(() => userStore.topArtists)
const selectedArtistIds = computed(() => selectionStore.getSelectedArtistIds)

userStore.getTopArtists()
</script>

<template>
  <v-list class="rounded-lg">
    <ArtistItem
      v-for="(artist, index) in topArtists"
      :key="index"
      :item-data="artist"
      :selected="selectedArtistIds.includes(artist.id)"
      :disabled="selectedArtistIds.length > 4 && !selectedArtistIds.includes(artist.id)"
    />
  </v-list>
</template>

<style scoped></style>
