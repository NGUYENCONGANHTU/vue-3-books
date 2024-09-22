<template>
  <!-- Dialog component with v-model for controlling its state -->
  <v-dialog v-model="dialog" max-width="600">
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn v-bind="activatorProps" color="green" variant="flat">
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
    </template>
    <template v-slot:default="{ isActive }">
      <v-card>
        <div class="title">{{ $t("Edit Note") }}</div>
        <v-divider></v-divider>
        <v-card-text>
          <v-form>
            <v-date-picker
              class="w-100"
              v-model="datePicker"
              @update:model-value="getValueDate"
              show-adjacent-months
              color="#FF6767"
            ></v-date-picker>
            <div v-show="showNote" class="border mt-3">
              <div class="py-2">
                <h3 class="px-2">{{ formattedDate }}</h3>
              </div>
              <v-form ref="form" v-model="valid" lazy-validation>
                <v-text-field
                  :label="$t('Title:')"
                  v-model="title"
                  :rules="titleRules"
                ></v-text-field>
                <v-textarea
                  :label="$t('Content')"
                  v-model="content"
                  :rules="contentRules"
                ></v-textarea>
              </v-form>
            </div>
            <!-- button actions  -->
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                :text="$t('Cancel')"
                @click="isActive.value = false"
                variant="tonal"
                class="close-note"
              ></v-btn>
              <v-btn
                :text="$t('Update')"
                @click="editNoteHandle"
                variant="tonal"
                class="done-note"
              ></v-btn>
            </v-card-actions>
          </v-form>
        </v-card-text>
      </v-card>
    </template>
  </v-dialog>
</template>

<script setup>
import { ref, computed, defineProps, watch } from "vue";
import { useNoteStore } from "@/stores/noteStore.js";
import { toast } from "vue3-toastify";
import { useI18n } from "vue-i18n";
const { t } = useI18n();
import moment from "moment";
// props
const props = defineProps(["item"]);
// import { useI18n } from "vue-i18n";
// const { t } = useI18n();
// app store
const noteStore = useNoteStore();
// active modal
const dialog = ref(false);
const showNote = ref(true);
// request form
const id = ref("");
const title = ref("");
const content = ref("");
const datePicker = ref(null);
// validate
const titleRules = [(v) => !!v || t("Title is invalid")];
const contentRules = [(v) => !!v || t("Content is required")];

const formattedDate = computed(() => {
  return moment(datePicker.value).format("DD-MM-YYYY");
});

const detail = computed(() => {
  if (!props.item) {
    return null;
  } else {
    return props.item;
  }
});

const parseDate = (dataString) => {
  if (!dataString) return;
  const [day, month, year] = dataString.split("-").map(Number);
  return new Date(year, month - 1, day);
};

watch(
  detail,
  (newDetail) => {
    if (newDetail) {
      datePicker.value = parseDate(newDetail.DataBook);
      id.value = newDetail.Id;
      title.value = newDetail.Name || "";
      content.value = newDetail.Content || "";
    }
  },
  { immediate: true }
);

const getValueDate = async (date) => {
  showNote.value = true;
  datePicker.value = date;
};

const editNoteHandle = async () => {
  try {
    const body = {
      name: title.value || "",
      notes: content.value || "",
      time_boos: formattedDate.value || null,
    };
    await noteStore.editNote(id.value, body);
    toast("Edit note success!!", {
      theme: "auto",
      type: "success",
      dangerouslyHTMLString: true,
    });
    // reset data
    title.value = "";
    content.value = "";

    // close modal
    showNote.value = false;
    dialog.value = false;
  } catch (error) {
    toast(`${error.message}`, {
      theme: "auto",
      type: "error",
      dangerouslyHTMLString: true,
    });
  }
};
</script>

<style scoped>
.date-picker {
  border: 2px solid #fbc192;
}
.done-note {
  background-color: #4ecbb2;
  color: white;
}
.close-note {
  background-color: #f27f76;
  color: white;
}
.title {
  padding: 18px;
  font-size: 18px;
  font-weight: bold;
  color: rgb(0, 0, 0);
}
.v-card-text {
  padding: 15px;
}
</style>
