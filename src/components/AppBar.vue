<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useUserStore } from '@/stores/userStore'
import { useSelectionStore } from '@/stores/selectionStore'
import { useTheme } from 'vuetify/lib/framework.mjs'

const userStore = useUserStore()
const selectionStore = useSelectionStore()
const settingsOpen = ref(false)
const userDetails = computed(() => userStore.userDetails)
const userImageUrl = computed(() => {
  return userDetails.value?.images ? userDetails.value?.images[0].url : undefined
})
const theme = useTheme()

const toggleTheme = () => {
  theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
}

const timeFrames = [
  { text: 'Long Term', value: 'long_term' },
  { text: 'Medium Term', value: 'medium_term' },
  { text: 'Short Term', value: 'short_term' }
]

const selectedTimeframe = computed(() => selectionStore.timeFrame)
watch(selectedTimeframe, () => {
  const model = selectionStore.model
  if (model === 'artists') {
    userStore.getTopArtists(selectedTimeframe.value)
  } else {
    userStore.getTopTracks(selectedTimeframe.value)
  }
})
</script>
<template>
  <v-app-bar rounded>
    <template v-slot:prepend>
      <v-app-bar-nav-icon @click="settingsOpen = !settingsOpen"></v-app-bar-nav-icon>
    </template>
    <v-app-bar-title>Spotify Recommend</v-app-bar-title>
    <template v-slot:append>
      <v-btn
        :icon="theme.global.current.value.dark ? 'mdi-white-balance-sunny' : 'mdi-weather-night'"
        @click="toggleTheme"
      ></v-btn>
    </template>
  </v-app-bar>
  <v-navigation-drawer v-model="settingsOpen" temporary>
    <v-list>
      <v-list-item
        :prepend-avatar="userImageUrl"
        :title="userDetails?.display_name"
        :subtitle="userDetails?.email"
      ></v-list-item>
      <v-divider class="my-2" />
      <v-list-group fluid value="selection">
        <template v-slot:activator="{ props }">
          <v-list-item v-bind="props" title="Selection settings"></v-list-item>
        </template>
        <v-list-item class="pl-2"
          >Time frame<v-select
            v-model="selectionStore.timeFrame"
            label="Select"
            :items="timeFrames"
            item-title="text"
            item-value="value"
            solo
            density="compact"
          ></v-select
        ></v-list-item>
      </v-list-group>
      <v-divider class="my-2" />

      <v-list-group fluid value="results">
        <template v-slot:activator="{ props }">
          <v-list-item v-bind="props" title="Recommendation settings"></v-list-item>
        </template>
        <v-list-item class="pl-2"
          >Energy:
          <v-slider
            min="0"
            max="1"
            v-model="selectionStore.energy"
            hide-details
            color="secondary"
          ></v-slider
        ></v-list-item>
        <v-list-item class="pl-2"
          >Popularity:
          <v-slider
            min="0"
            max="1"
            v-model="selectionStore.popularity"
            hide-details
            color="secondary"
          ></v-slider
        ></v-list-item>
        <v-list-item class="pl-2"
          >Instrumentalness:
          <v-slider
            min="0"
            max="1"
            v-model="selectionStore.instrumentalness"
            hide-details
            color="secondary"
          ></v-slider
        ></v-list-item>
        <v-list-item>
          <v-btn @click="selectionStore.resetRecommendationSettings" color="secondary">Reset</v-btn>
        </v-list-item>
      </v-list-group>
    </v-list>
  </v-navigation-drawer>
</template>

<style scoped></style>
