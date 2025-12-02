<script setup lang="ts">
import Welcome from '@/components/Welcome.vue'
import MainSection from '@/components/MainSection.vue'
import AppBar from '@/components/AppBar.vue'
import Player from '@/components/Player/Player.vue'
import { useAuthStore } from './stores/authStore'
import { useUserStore } from './stores/userStore'
import { useSelectionStore } from './stores/selectionStore'
import { computed } from 'vue'

const authStore = useAuthStore()
const userStore = useUserStore()
const selectionStore = useSelectionStore()

const recommendations = computed(() => selectionStore.recommendations)

userStore.getUserInfo()
</script>

<template>
  <v-app>
    <AppBar />
    <v-main>
      <v-container fluid>
        <Welcome v-if="!authStore.sessionToken" />
        <MainSection v-else />
      </v-container>
    </v-main>
    <div v-show="recommendations.length" id="playerContainer"><Player /></div>
  </v-app>
</template>

<style lang="scss">
.v-main {
  padding-bottom: var(--player-height) !important;
}
#playerContainer {
  height: var(--player-height);
  position: fixed;
  bottom: 0;
  width: 100%;
  background: rgb(var(--v-theme-on-surface-variant));
}
</style>
