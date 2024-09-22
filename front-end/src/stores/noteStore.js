import { defineStore } from "pinia";
import moment from "moment";
import {
  store,
  show,
  update,
  remove,
  search,
  userNotes,
} from "@/service/books.service";
export const useNoteStore = defineStore("noteStore", {
  state: () => ({
    isFormValid: false,
    // save data notes
    dataNotes: [],
    userNotes: [],
    itemIdEdit: "",
    note: {},
    meta: null,
    // select language
  }),
  getters: {
    // headerApp
    formattedDate(state) {
      return state.due ? moment(state.due).format("D/M/YYYY") : "";
    },
    // selectLanguage
  },
  actions: {
    // fetch api
    async listNotesByUser() {
      const result = await userNotes();
      if (result) {
        this.userNotes = result.data.data;

        this.meta = result.meta;
      }
    },

    async searchBooks(param, page, limit) {
      const result = await search(param, page, limit);
      this.userNotes = result.data.data;
      this.meta = result.data.meta;
    },
    // action item id
    setItemEdit(id) {
      this.itemIdEdit = id;
    },

    saveNote(item) {
      this.note = item;
    },
    async addNote(data) {
      if (data) {
        const result = await store(data);
        this.userNotes.unshift(result.data);
        this.dataNotes.unshift(result.data);
      }
    },
    async deleteNote(id) {
      if (id) {
        await remove(id);
        this.userNotes = this.userNotes.filter((note) => note.id !== id);
        this.dataNotes = this.dataNotes.filter((note) => note.id !== id);
      }
    },

    async editNote(id, data) {
      if (id) {
        const updateData = await update(id, data);
        if (updateData) {
          // update user note
          const index = this.userNotes.findIndex((item) => item.id == id);
          if (index - 1) {
            this.userNotes[index] = updateData.data;
          }

          // update user note
          const indexNotes = this.dataNotes.findIndex((item) => item.id == id);
          if (indexNotes - 1) {
            this.dataNotes[index] = updateData.data;
          }
        }
      }
    },
    async show(id) {
      if (id) {
        const result = await show(id);
        this.note = result.data;
      }
    },
    searchName(name) {
      this.boosUser = this.boosUser.filter((n) => n.name == name);
    },
  },
});
export const useAdminStore = defineStore("adminStore", {
  state: () => ({
    isActive: (path) => routeLocationKey.path === path,
    drawer: false,
    selectedItem: "Minh Hy",
    items: [
      {
        title: "Dashboard",
        icon: "mdi-view-dashboard",
        path: "/dashboard",
      },
      {
        title: "Notes",
        icon: "mdi-note",
        path: "/notes",
      },
      {
        title: "Profile",
        icon: "mdi-account",
        path: "/profile",
      },
    ],
  }),
  actions: {
    toggleDrawer() {
      this.drawer = !this.drawer;
    },
  },
});
