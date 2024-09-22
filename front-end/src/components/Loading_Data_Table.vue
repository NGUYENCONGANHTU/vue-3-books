<template>
  <v-container>
    <v-data-table-server
      :items="items"
      :items-length="items.length"
      item-key="name"
      :loading="isLoading"
      loading-text="Loading... Please wait"
    ></v-data-table-server>
  </v-container>
</template>

<script setup>
const props = defineProps({
  isLoading: {
    type: Boolean,
    required: true,
    default: false,
  },
});
</script>

<style scoped></style>
