<template>
  <v-overlay
    :model-value="show"
    class="align-center justify-center"
    @click.stop
  >
    <v-progress-circular
      color="primary"
      size="64"
      indeterminate
    ></v-progress-circular>
  </v-overlay>
</template>

<script setup>
defineProps({
  show: {
    type: Boolean,
    default: false,
  },
});
</script>

<style scoped>
.v-overlay {
  opacity: 0.8;
  z-index: 999;
}
</style>
