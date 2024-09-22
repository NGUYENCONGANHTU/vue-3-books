<template>
  <v-card :title="$t('Search')" flat>
    <template v-slot:text>
      <v-row>
        <v-col cols="12" md="12"
          ><v-text-field
            v-model="param.name"
            :label="$t('Search')"
            prepend-inner-icon="mdi-magnify"
            variant="outlined"
            hide-details
            single-line
          ></v-text-field
        ></v-col>
      </v-row>
    </template>

    <v-data-table-server
      :items="formattedBooks"
      :items-length="totalBook"
      v-model:items-per-page="limit"
      item-value="name"
      :search="param.name"
      :items-per-page="limit"
      v-model:page="page"
      @update:options="fetchData"
    >
      <template v-slot:[`item.Actions`]="{ item }">
        <DeleteNote class="icon-delete" :item="item" />
        <EditNote class="icon-edit" :item="item" />
      </template>
    </v-data-table-server>
  </v-card>
</template>

<script setup>
import { onMounted, computed, watch } from "vue";
import EditNote from "./EditNote.vue";
import DeleteNote from "./DeleteNote.vue";
import { useNoteStore } from "@/stores/noteStore.js";
import localStorage from "@/utils/localStorage";
import { localStorageKey } from "@/constants/appKey";
const noteStore = useNoteStore();
import { ref } from "vue";
const page = ref(1);
const limit = ref(10);
const param = ref({
  name: "",
  time_boos: "",
});

const totalBook = computed(() => {
  return noteStore.meta?.total || 0;
});

console.log(totalBook.value);

const formattedBooks = computed(() => {
  return noteStore.userNotes.map((book) => ({
    Id: book.id,
    User:
      JSON.parse(localStorage.getUserLocalStorage(localStorageKey)).id ==
      book.user_id
        ? JSON.parse(localStorage.getUserLocalStorage(localStorageKey)).name
        : book.user_id,
    Name: book.name,
    Content: book.notes,
    DataBook: book.time_boos,
    Actions: book.actions,
  }));
});

const fetchData = async () => {
  await noteStore.searchBooks(param.value, page.value, limit.value);
};

onMounted(() => {
  fetchData();
});

watch([param, page, limit], fetchData);
</script>

<style scoped></style>
