<script setup lang="ts">
import { useSelectionStore } from '@/stores/selectionStore'
import type { artist } from '@/types'

const selectionStore = useSelectionStore()
const props = defineProps<{ itemData: artist; selected: boolean; disabled: boolean }>()
</script>

<template>
  <v-list-item
    :prepend-avatar="props.itemData.images[2].url"
    @click="selectionStore.toggleArtistSelection(itemData)"
    :disabled="props.disabled"
    >{{ props.itemData.name }}
    <template v-slot:append>
      <v-icon color="secondary">{{ props.selected ? 'mdi-check' : '' }}</v-icon>
    </template>
  </v-list-item>
</template>
