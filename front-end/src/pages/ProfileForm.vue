<template>
  <Loading_Page :show="loading" />
  <v-card class="border">
    <v-col cols="12">
      <h3>{{ $t("Edit Profile") }}</h3>
    </v-col>
    <v-container class="mt-1">
      <v-row class="pt-5 pb-5">
        <!-- Left Column -->
        <v-col cols="12" md="3" class="avatar">
          <v-card class="h-100 border">
            <v-card-text>
              <div class="account-settings">
                <div class="user-profile text-center">
                  <v-avatar size="100">
                    <img src="@/assets/avatar.jpg" alt="Minh Hy Admin" />
                  </v-avatar>
                  <h5 class="user-name mt-3">
                    {{ user.name }}
                  </h5>
                  <h6 class="user-email">{{ user.email }}</h6>
                </div>

                <div class="about mt-4">
                  <h4>{{ $t("About") }}</h4>
                  <p>
                    I'm {{ user.email }}. Full Stack Designer I enjoy creating
                    user-centric, delightful and human experiences.
                  </p>
                </div>
              </div>
            </v-card-text>
          </v-card>
        </v-col>

        <!-- Right Column -->
        <v-col cols="12" md="9">
          <Form @submit.prevent="submitForm">
            <!-- bọc bằng thẻ form như login nhé em  -->
            <v-card class="h-100 border">
              <v-card-text>
                <!-- Personal Details -->
                <v-row>
                  <v-col cols="12">
                    <h3 class="mb-2" size="10">{{ $t("Personal Details") }}</h3>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field
                      :label="$t('User Name')"
                      :placeholder="$t('Enter user name')"
                      variant="solo"
                      v-model="user.name"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field
                      :label="$t('Email')"
                      :placeholder="$t('Enter email ID')"
                      variant="solo"
                      v-model="user.email"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field
                      :label="$t('Phone')"
                      :placeholder="$t('Enter phone number')"
                      v-model="user.phone"
                      variant="solo"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-select
                      :items="LANGUAGE_NAMES"
                      item-title="name"
                      v-model="user.lang"
                      item-value="value"
                      :label="$t('Language')"
                      variant="solo"
                    ></v-select>
                  </v-col>
                </v-row>
                <!-- Action Buttons -->
                <v-row justify="end">
                  <v-col cols="12" class="text-right">
                    <v-btn type color="#FF6767" @click="submitForm">
                      {{ $t("Update") }}</v-btn
                    >
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </Form>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script setup>
import { LANGUAGE_NAMES } from "@/constants/languageConstants";
import { useUserStore } from "@/stores/userStore";
import { Form } from "vee-validate";
import { ref, onMounted, watch, computed } from "vue";
import { toast } from "vue3-toastify";
import Loading_Page from "@/components/Loading_Page.vue";
const userStore = useUserStore();
const loading = ref(false);

const user = ref({
  name: "",
  email: "",
  phone: "",
  lang: "vi",
});

const detail = computed(() => {
  return userStore?.user;
});

watch(
  detail,
  (newDetail) => {
    if (newDetail) {
      user.value.name = newDetail.name;
      user.value.email = newDetail.email;
      user.value.phone = newDetail.phone;
      user.value.lang = newDetail.lang;
    }
  },
  { immediate: true }
);

const submitForm = async () => {
  try {
    userStore.updateProFile(user.value);
    toast("Update profile success!!", {
      theme: "auto",
      type: "success",
      dangerouslyHTMLString: true,
    });
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
.account-settings .about {
  margin: 2rem 0 0 0;
  text-align: center;
}
.account-settings .about h4 {
  margin: 0 0 15px 0;
}
.v-col h3 {
  position: relative;
  display: inline-block;
  margin: 0;
}

.v-col h3::after {
  content: "";
  position: absolute;
  bottom: -5px;
  left: 0;
  width: 60%;
  height: 1.5px;
  background-color: #ff6767;
}
</style>
