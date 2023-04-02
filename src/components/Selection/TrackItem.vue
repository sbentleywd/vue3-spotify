<script setup lang="ts">
import { useSelectionStore } from '@/stores/selectionStore'
import type { track } from '@/types'

const selectionStore = useSelectionStore()
const props = defineProps<{
  trackData: track
  selected?: boolean
  disabled?: boolean
  mode: 'selection' | 'results'
}>()

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
    >{{ props.trackData.name + ' - ' + props.trackData.artists[0].name }}
    <template v-slot:append>
      <v-icon color="secondary">{{ props.selected ? 'mdi-check' : '' }}</v-icon>
    </template>
  </v-list-item>
</template>
