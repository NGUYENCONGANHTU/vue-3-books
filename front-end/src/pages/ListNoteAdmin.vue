<template>
  <v-card class="border">
    <v-container>
      <v-row>
        <v-col cols="12">
          <h3>{{ $t("Notes") }}</h3>
        </v-col>
        <v-col cols="12" class="d-flex justify-end">
          <add-note />
        </v-col>
        <v-col cols="12">
          <v-card class="border"> <list-note /></v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script setup>
import AddNote from "@/components/AddNote.vue";
import ListNote from "@/components/ListNote.vue";
</script>

<style scoped>
.v-col h3 {
  position: relative;
  display: inline-block;
  margin: 0;
}

.v-col h3::after {
  content: "";
  position: absolute;
  bottom: -5px;
  left: 0;
  width: 60%;
  height: 1.5px;
  background-color: #ff6767;
}
</style>
