<template>
  <!-- Dialog component with v-model for controlling its state -->
  <v-dialog v-model="dialog" max-width="600">
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn v-bind="activatorProps" color="#02877F" variant="flat">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </template>

    <template v-slot:default="{ isActive }">
      <v-card>
        <v-card-title class="title"> {{ $t("Add New Note") }} </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-form>
            <v-date-picker
              class="w-100"
              v-model="datePicker"
              @update:model-value="getValueDate"
              show-adjacent-months
              color="red-darken-2"
            ></v-date-picker>
            <div v-show="showNote" class="mt-3">
              <div class="py-2 border rounded">
                <h3 class="px-2">{{ formattedDate }}</h3>
              </div>
              <v-form ref="form" v-model="valid" lazy-validation class="mt-2">
                <v-text-field
                  :label="$t('Title')"
                  v-model="title"
                  variant="solo"
                  :error-messages="titleErrors"
                  @input="validateTitle"
                ></v-text-field>
                <v-textarea
                  :label="$t('Content')"
                  v-model="content"
                  variant="solo"
                  :error-messages="contentErrors"
                  @input="validateContent"
                ></v-textarea>
              </v-form>
            </div>
            <!-- button actions  -->
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                :text="$t('Close')"
                @click="closeModal(isActive)"
                variant="tonal"
                class="close-note"
              ></v-btn>
              <v-btn
                :text="$t('Add')"
                @click="submitForm"
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
import { ref, computed } from "vue";
import moment from "moment";
import { useNoteStore } from "@/stores/noteStore.js";
import { useI18n } from "vue-i18n";
const { t } = useI18n();
import { toast } from "vue3-toastify";
const noteStore = useNoteStore();

// active modal
const dialog = ref(false);
const showNote = ref(false);
// -- end ----

// request form
const title = ref("");
const content = ref("");
const datePicker = ref(null);
// -- end ----

// validate
const titleErrors = ref([]);
const contentErrors = ref([]);
const validateTitle = () => {
  titleErrors.value = [];
  if (!title.value) {
    titleErrors.value.push(t("Title is required"));
  }
};
const validateContent = () => {
  contentErrors.value = [];
  if (!content.value) {
    contentErrors.value.push(t("Content is required"));
  }
};
// -- end ----

//FormatDate
const formattedDate = computed(() => {
  return moment(datePicker.value).format("DD-MM-YYYY");
});
// -- end ----

//Get value date form date picker
const getValueDate = async (date) => {
  showNote.value = true;
  datePicker.value = date;
};

const closeModal = (isActive) => {
  isActive.value = false;
  title.value = "";
  content.value = "";
};

//Submit
const submitForm = async () => {
  validateTitle();
  validateContent();

  if (titleErrors.value.length || contentErrors.value.length) {
    // toast(t("Please fill in all required fields"), { type: "error" });
    return;
  }
  try {
    const body = {
      name: title.value,
      notes: content.value,
      time_boos: formattedDate.value,
      status: 1,
    };
    // call api store
    await noteStore.addNote(body);

    // show toast
    toast("Add note success!!", {
      theme: "auto",
      type: "success",
      dangerouslyHTMLString: true,
    });

    // reset value
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
  border: 2px solid #f6bbb6;
}
.done-note {
  background-color: #4faf9c;
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
