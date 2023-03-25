<script setup lang="ts">
import { defineProps } from 'vue'
import type { artist } from '@/types'

const props = defineProps<{ itemData: artist }>()
</script>

<template>
  <v-list-item :prepend-avatar="props.itemData.images[2].url">{{
    props.itemData.name
  }}</v-list-item>
</template>
