<script setup lang="ts">
import { useSelectionStore } from '@/stores/selectionStore'
import { computed } from '@vue/reactivity'
import type { track } from '@/types'
import { formatArtists } from '@/helpers'

const selectionStore = useSelectionStore()
const props = defineProps<{
  trackData: track
  selected?: boolean
  disabled?: boolean
  mode: 'selection' | 'results'
}>()

const artistsList = computed(() => formatArtists(props.trackData.artists))

const handleClick = () => {
  if (props.mode === 'selection') {
    selectionStore.toggleTrackSelection(props.trackData)
  } else {
    console.log('play track')
  }
}
</script>

<template>
  <v-list-item
    :prepend-avatar="props.trackData.album.images[2].url"
    @click="handleClick"
    :disabled="props.disabled"
    ><span class="text-truncate px-2">{{ props.trackData.name + ' - ' + artistsList }}</span>
    <template v-slot:append>
      <v-icon color="secondary">{{ props.selected ? 'mdi-check' : '' }}</v-icon>
    </template>
  </v-list-item>
</template>
