<template>
  <v-row>
    <v-col cols="12" lg="4" md="4">
      <v-card class="mx-auto overflow-visible" max-width="auto">
        <v-sheet
          class="v-sheet--offset mx-auto mb-3"
          color="green"
          elevation="12"
          max-width="calc(100% - 32px)"
          rounded="lg"
        >
          <v-sparkline
            :labels="labels_user"
            :model-value="value_user"
            color="white"
            line-width="2"
            padding="16"
          ></v-sparkline>
        </v-sheet>

        <v-card-text class="pt-0">
          <div class="text-h6 font-weight-light mb-2">
            {{ $t("User Sign in") }}
          </div>
          <div class="subheading font-weight-light text-grey">
            {{ $t("Last Campaign Performance") }}
          </div>
          <v-divider class="my-2"></v-divider>
          <v-icon class="me-2" size="small"> mdi-clock </v-icon>
          <span class="text-caption text-grey font-weight-light">
            {{ $t("Last registration 26 minutes ago") }}
          </span>
        </v-card-text>
      </v-card>
    </v-col>
    <v-col cols="12" lg="4" md="4">
      <v-card class="mx-auto overflow-visible" max-width="auto">
        <v-sheet
          class="v-sheet--offset mx-auto mb-3"
          color="pink"
          elevation="12"
          max-width="calc(100% - 32px)"
          rounded="lg"
        >
          <v-sparkline
            :labels="labels_login"
            :model-value="value_login"
            color="white"
            line-width="2"
            padding="16"
          ></v-sparkline>
        </v-sheet>

        <v-card-text class="pt-0">
          <div class="text-h6 font-weight-light mb-2">
            {{ $t("User Registrations") }}
          </div>
          <div class="subheading font-weight-light text-grey">
            {{ $t("Last Campaign Performance") }}
          </div>
          <v-divider class="my-2"></v-divider>
          <v-icon class="me-2" size="small"> mdi-clock </v-icon>
          <span class="text-caption text-grey font-weight-light">
            {{ $t("Last registration 26 minutes ago") }}
          </span>
        </v-card-text>
      </v-card>
    </v-col>
    <v-col cols="12" lg="4" md="4">
      <v-card class="mx-auto overflow-visible" max-width="auto">
        <v-sheet
          class="v-sheet--offset mx-auto mb-3"
          color="cyan"
          elevation="12"
          max-width="calc(100% - 32px)"
          rounded="lg"
        >
          <v-sparkline
            :labels="labels_note"
            :model-value="value_note"
            color="white"
            line-width="2"
            padding="16"
          ></v-sparkline>
        </v-sheet>

        <v-card-text class="pt-0">
          <div class="text-h6 font-weight-light mb-2">
            {{ $t("Completed Notes") }}
          </div>
          <div class="subheading font-weight-light text-grey">
            {{ $t("Last Campaign Performance") }}
          </div>
          <v-divider class="my-2"></v-divider>
          <v-icon class="me-2" size="small"> mdi-clock </v-icon>
          <span class="text-caption text-grey font-weight-light">
            {{ $t("Last registration 26 minutes ago") }}
          </span>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script setup>
import { ref } from "vue";
const labels_user = ref([
  "12am",
  "3am",
  "6am",
  "9am",
  "12pm",
  "3pm",
  "6pm",
  "9pm",
]);
const value_user = ref([200, 675, 410, 390, 310, 460, 250, 800]);
const labels_login = ref([
  "12am",
  "3am",
  "6am",
  "9am",
  "12pm",
  "3pm",
  "6pm",
  "9pm",
]);
const value_login = ref([400, 275, 510, 290, 310, 460, 350, 500]);
const labels_note = ref([
  "12am",
  "3am",
  "6am",
  "9am",
  "12pm",
  "3pm",
  "6pm",
  "9pm",
]);
const value_note = ref([400, 275, 510, 290, 310, 460, 350, 500]);
</script>

<style scoped></style>
