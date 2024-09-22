// src/stores/useNoteStore.js
import { defineStore } from "pinia";
import {
  loginApp,
  createUser,
  getTokenUser,
  removeTokenUser,
  setTokenUser,
} from "@/service/auth.service";
import { removeLangUser, setLangUser } from "@/utils/cookie";
import localStorage from "@/utils/localStorage";

export const useAuthStore = defineStore("useAuthStore", {
  state: () => ({
    token: getTokenUser() || null,
    // TODO: chưa triển khai trong dự án!
    role: null,
    error: null,
  }),
  getters: {
    isAuthenticated: (state) => !!state.token,
  },
  actions: {
    async login(body) {
      try {
        const result = await loginApp(body);
        if (result) {
          this.error = null;
          this.token = result.token;
          this.role = result.data?.role;
          // save token cookie
          setTokenUser(result?.token);
          // set user lang
          setLangUser("lang", result.data?.lang);
          // set user info
          localStorage.setUserLocalStorage("user-", result.data);
        }
      } catch (error) {
        this.error = error;
      }
    },

    async register(body) {
      try {
        await createUser(body);
      } catch (error) {
        this.error = error;
      }
    },

    logout() {
      this.token = null;
      this.role = null;
      removeTokenUser();
      removeLangUser("lang");
    },
  },
});
