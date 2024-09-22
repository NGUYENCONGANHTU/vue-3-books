// src/stores/useNoteStore.js
import { defineStore } from "pinia";
import { showInfoUser, update } from "@/service/user.service";
import { changeUserLang } from "@/utils/cookie";
import localStorage from "@/utils/localStorage";
export const useUserStore = defineStore("userStore", {
  state: () => ({
    user: {} || null,
  }),
  getters: {},
  actions: {
    // fetch api
    async userInFo() {
      const result = await showInfoUser();
      if (result) {
        this.user = result.data;
      }
    },

    async updateProFile(data) {
      const result = await update(data);
      if (result) {
        changeUserLang(result.data.lang);
        this.user = result.data;
      }
    },
  },
});
