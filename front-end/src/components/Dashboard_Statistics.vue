<template>
  <v-row class="pt-15">
    <v-col cols="12" md="3" sm="6">
      <v-card class="mx-auto overflow-visible" max-width="350">
        <v-sheet
          class="v-sheet--offset hanging-sheet d-flex align-center justify-center"
          color="cyan"
          elevation="12"
          width="80"
          height="80"
          rounded="lg"
          prepend-inner-icon="mdi-twitter"
        >
          <v-icon size="40" color="white">mdi-twitter</v-icon>
        </v-sheet>

        <v-card-title class="card-title-with-icon text-end">
          <h6 class="title ml-auto">{{ $t("Followers") }}</h6>
          <p>+245</p>
        </v-card-title>

        <v-card-text class="pt-0">
          <v-divider class="my-2"></v-divider>
          <v-icon class="me-2" size="small" color="red">mdi-clock</v-icon>
          <span class="text-caption text-grey font-weight-light">
            {{ $t("Just Updated") }}
          </span>
        </v-card-text>
      </v-card>
    </v-col>
    <v-col cols="12" md="3" sm="6">
      <v-card class="mx-auto overflow-visible" max-width="350">
        <v-sheet
          class="v-sheet--offset hanging-sheet d-flex align-center justify-center"
          color="green"
          elevation="12"
          width="80"
          height="80"
          rounded="lg"
          prepend-inner-icon="mdi-twitter"
        >
          <v-icon size="40" color="white">mdi-poll</v-icon>
        </v-sheet>

        <v-card-title class="card-title-with-icon text-end">
          <h6 class="title ml-auto">{{ $t("Website Visits") }}</h6>
          <p>+75.521</p>
        </v-card-title>

        <v-card-text class="pt-0">
          <v-divider class="my-2"></v-divider>
          <v-icon class="me-2" size="small" color="green">mdi-tag</v-icon>
          <span class="text-caption text-grey font-weight-light">
            {{ $t("Tracked from Google Analytics") }}
          </span>
        </v-card-text>
      </v-card>
    </v-col>
    <v-col cols="12" md="3" sm="6">
      <v-card class="mx-auto overflow-visible" max-width="350">
        <v-sheet
          class="v-sheet--offset hanging-sheet d-flex align-center justify-center"
          color="green"
          elevation="12"
          width="80"
          height="80"
          rounded="lg"
          prepend-inner-icon="mdi-twitter"
        >
          <v-icon size="40" color="white">mdi-store</v-icon>
        </v-sheet>

        <v-card-title class="card-title-with-icon text-end">
          <h6 class="title ml-auto">{{ $t("Revenue") }}</h6>
          <p>$ 34,245</p>
        </v-card-title>

        <v-card-text class="pt-0">
          <v-divider class="my-2"></v-divider>
          <v-icon class="me-2" size="small" color="#1565C0"
            >mdi-calendar</v-icon
          >
          <span class="text-caption text-grey font-weight-light">
            {{ $t("Last 24 Hours") }}
          </span>
        </v-card-text>
      </v-card>
    </v-col>
    <v-col cols="12" md="3" sm="6">
      <v-card class="mx-auto overflow-visible" max-width="350">
        <v-sheet
          class="v-sheet--offset hanging-sheet d-flex align-center justify-center"
          color="#ff9800"
          elevation="12"
          width="80"
          height="80"
          rounded="lg"
          prepend-inner-icon="mdi-twitter"
        >
          <v-icon size="40" color="white">mdi-sofa</v-icon>
        </v-sheet>

        <v-card-title class="card-title-with-icon text-end">
          <h6 class="title ml-auto">{{ $t("Bookings") }}</h6>
          <p>184</p>
        </v-card-title>

        <v-card-text class="pt-0">
          <v-divider class="my-2"></v-divider>
          <v-icon class="me-2" size="small" color="#EF6C00">mdi-alert</v-icon>
          <span class="text-caption text-grey font-weight-light">
            {{ $t("Get More Space...") }}
          </span>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script setup></script>

<style scoped>
.hanging-sheet {
  position: absolute;
  top: -40px;
  left: 16px;
  z-index: 1;
}
.card-title-with-icon h6 {
  opacity: 0.5;
}
.card-title-with-icon p {
  opacity: 0.8;
}
</style>
