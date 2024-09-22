<template>
  <v-toolbar-title class="grey--text">
    <template v-if="adminStore.selectedItem === 'Minh Hy'">
      <span class="fist-text">{{ $t("Minh-Hy") }}</span>
    </template>
    <template v-if="adminStore.selectedItem === $t('Dashboard')">
      <span class="fist-text">{{ $t("Dashboard") }}</span>
    </template>
    <template v-if="adminStore.selectedItem === $t('Notes')">
      <span class="fist-text">{{ $t("Notes") }}</span>
    </template>
    <template v-if="adminStore.selectedItem === $t('Profile')">
      <span class="fist-text">{{ $t("Profile") }}</span>
    </template>
  </v-toolbar-title>
</template>
<script setup>
import { useAdminStore } from "@/stores/noteStore.js";
const adminStore = useAdminStore();
</script>

<style scoped>
.fist-text {
  font-weight: bold;
  color: #ff6767;
}
.second-text {
  font-weight: bold;
}
</style>
