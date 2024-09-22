<template>
  <nav>
    <v-layout>
      <v-navigation-drawer v-model="adminStore.drawer" app class="side-bar">
        <!-- profile  -->
        <v-list-item class="profile border">
          <div class="account-settings">
            <div class="user-profile text-center">
              <v-avatar size="70">
                <img src="@/assets/avatar.jpg" alt="Minh Hy Admin" />
              </v-avatar>
              <h5 class="user-name mt-3">{{ user?.name }}</h5>
              <h6 class="user-email">{{ user?.email }}</h6>
            </div>
          </div>
        </v-list-item>
        <!-- items  -->
        <v-list density="compact" nav>
          <v-list-item
            v-for="(item, index) in adminStore.items"
            :key="index"
            :prepend-icon="item.icon"
            :title="$t(`${item.title}`)"
            :to="item.path"
            :value="$t(`${item.title}`)"
            :active-class="'v-list-item--active'"
            @click="adminStore.selectedItem = $t(`${item.title}`)"
            :active="adminStore.selectedItem === $t(`${item.title}`)"
          ></v-list-item>
        </v-list>

        <!-------log out------>
        <template v-slot:append>
          <div class="pa-2">
            <v-btn @click="logout" block prepend-icon="mdi-export"
              >{{ $t("Logout") }}
            </v-btn>
          </div>
        </template>
      </v-navigation-drawer>

      <v-main>
        <v-toolbar class="tool-bar" flat app>
          <v-app-bar-nav-icon
            @click.stop="adminStore.toggleDrawer"
          ></v-app-bar-nav-icon>
          <v-toolbar-title>
            <Title_Item />
          </v-toolbar-title>
          <v-btn icon :to="'/dashboard'">
            <v-icon>mdi-view-dashboard</v-icon>
          </v-btn>
          <v-btn icon :to="'/profile'">
            <v-icon>mdi-account</v-icon>
          </v-btn>
        </v-toolbar>
        <v-sheet>
          <router-view />
        </v-sheet>
      </v-main>
    </v-layout>
  </nav>
</template>

<script setup>
import { computed, onMounted } from "vue";
import { useAdminStore } from "@/stores/noteStore.js";
import { useAuthStore } from "@/stores/authStore";
import { useUserStore } from "@/stores/userStore";

const adminStore = useAdminStore();
const authStore = useAuthStore();
const userStore = useUserStore();

import Title_Item from "@/components/Title_Item.vue";
import { useRouter } from "vue-router";
const user = computed(() => {
  return userStore?.user;
});

const router = useRouter();

const logout = () => {
  authStore.logout();
  router.push(`/login`);
};

onMounted(() => {
  userStore.userInFo();
});
</script>

<style scoped>
.v-sheet {
  padding: 30px 20px 20px 20px;
  height: 100vh;
}
.side-bar {
  background-color: #ff6766;
}
.tool-bar {
  background-color: rgb(246, 246, 243);
}
.profile {
  padding: 12px;
}
.v-list-title {
  border: 1px solid;
  display: inline-block;
}
.v-list {
  padding: 20px 10px 0px 10px;
}
.v-list-item {
  color: #fff;
  font-weight: bold;
}
.v-list-item-title {
  font-size: 50px;
}
.v-list-item--active {
  background-color: #fff;
  color: #ff6766;
}
.dash-text {
  color: #ef5350;
  font-weight: bold;
}
.fist-text {
  font-weight: bold;
  color: #ff6767;
}
.second-text {
  font-weight: bold;
}
.v-btn--active {
  background-color: #fb5252;
  color: #fff;
}
</style>
