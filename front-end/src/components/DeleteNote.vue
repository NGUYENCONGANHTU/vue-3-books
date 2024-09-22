<template>
  <v-dialog v-model="dialog" max-width="500">
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn v-bind="activatorProps" color="#FF5252" variant="flat">
        <v-icon>mdi-delete</v-icon>
      </v-btn>
    </template>

    <template v-slot:default="{ isActive }">
      <v-card>
        <div class="title">{{ $t("Delete") }}</div>
        <v-divider></v-divider>

        <v-card-text>
          <p>
            {{ $t("Are you sure you want to delete this note") }}
            <b>{{ detail.Name }}</b
            >?
          </p>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            :text="$t('Cancel')"
            @click="isActive.value = false"
            variant="tonal"
            class="cancel-delete"
          ></v-btn>
          <v-btn
            :text="$t('Delete')"
            @click="deleteNoteHandler"
            variant="tonal"
            class="confirm-delete"
          ></v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>

<script setup>
import { ref, computed } from "vue";
import { toast } from "vue3-toastify";
import { useNoteStore } from "@/stores/noteStore";
const noteStore = useNoteStore();
// props
const props = defineProps(["item"]);
//active modal
const dialog = ref(false);

const detail = computed(() => {
  if (!props.item) {
    return null;
  } else {
    return props.item;
  }
});

// Hàm xử lý xóa ghi chú
async function deleteNoteHandler() {
  try {
    await noteStore.deleteNote(detail.value.Id);
    toast("Delete note success!!", {
      theme: "auto",
      type: "success",
      dangerouslyHTMLString: true,
    });
    dialog.value = false;
  } catch (error) {
    toast(`${error.message}`, {
      theme: "auto",
      type: "error",
      dangerouslyHTMLString: true,
    });
  }
}
</script>

<style scoped>
.confirm-delete {
  background-color: #ff5252;
  color: white;
}
.cancel-delete {
  background-color: #4caf50;
  color: white;
}
.v-btn {
  margin-right: 10px;
}
.title {
  padding: 12px 12px 12px 15px;
  font-size: 18px;
  font-weight: bold;
  color: rgb(232, 13, 13);
}
</style>
