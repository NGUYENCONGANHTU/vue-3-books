<template>
  <v-app class="app">
    <v-container class="fill-height d-flex justify-center align-center">
      <v-card class="border">
        <v-row>
          <v-col cols="12" md="6" class="form-login">
            <v-card-title>Sign in</v-card-title>
            <form ref="form" @submit.prevent="submitForm">
              <v-card-text>
                <v-text-field
                  v-model="model.email"
                  placeholder="Enter Email"
                  type="email"
                  variant="outlined"
                  prepend-inner-icon="mdi-email"
                  :error-messages="emailErrors"
                  @input="validateEmail"
                  required
                ></v-text-field>
                <v-text-field
                  v-model="model.password"
                  placeholder="Enter Password"
                  :error-messages="passwordErrors"
                  @input="validatePassword"
                  type="password"
                  prepend-inner-icon="mdi-lock"
                  variant="outlined"
                  required
                ></v-text-field>
                <v-checkbox label="Remember me"></v-checkbox>
              </v-card-text>
              <v-card-actions>
                <v-btn class="submit-login" variant="tonal" @click="submitForm"
                  >Login</v-btn
                >
              </v-card-actions>
            </form>
            <div class="connect-other">
              <p>Or, Login with</p>
              <span>
                <v-icon
                  v-for="icon in icons"
                  :key="icon"
                  :icon="icon"
                  class="mx-1"
                >
                  {{ icon }}</v-icon
                >
              </span>
            </div>
            <div class="no-account">
              <p>
                Don't have an account?
                <router-link to="/signup">Create One</router-link>
              </p>
            </div>
          </v-col>

          <v-col cols="12" md="6">
            <div>
              <v-img
                src="https://sharejob.com.vn/wp-content/uploads/2022/12/39-ang-bia.jpg"
                alt="Login Image"
                height="100%"
                class="pa-5"
              ></v-img>
            </div>
          </v-col>
        </v-row>
      </v-card>
    </v-container>
  </v-app>
</template>

<script setup>
import { ref } from "vue";
import { useAuthStore } from "@/stores/authStore";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import { toast } from "vue3-toastify";
const { t } = useI18n();
const icons = ref([
  "mdi-facebook",
  "mdi-twitter",
  "mdi-linkedin",
  "mdi-instagram",
]);
const auth = useAuthStore();
const router = useRouter();
//model
const model = ref({
  email: "",
  password: "",
});

//Validate
const emailErrors = ref([]);
const passwordErrors = ref([]);

const validateEmail = () => {
  emailErrors.value = [];
  if (!model.value.email) {
    return emailErrors.value.push(t("Email is required"));
  }
};
const validatePassword = () => {
  passwordErrors.value = [];
  if (!model.value.password) {
    passwordErrors.value.push(t("Password is required"));
  }
};

const submitForm = async () => {
  validateEmail();
  validatePassword();

  if (emailErrors.value.length || passwordErrors.value.length) {
    return;
  }
  await auth.login(model.value);
  if (!auth.error) {
    router.push(`/`);
    // show toast
    toast("login app success!!", {
      theme: "auto",
      type: "success",
      dangerouslyHTMLString: true,
    });
  } else {
    toast(`${auth.error?.message}`, {
      theme: "auto",
      type: "error",
      dangerouslyHTMLString: true,
    });
  }
};
</script>

<style scoped>
.app {
  background-image: url("@/assets/background-image.jpg");
  background-color: #9913135a;
}
.no-account {
  padding-top: 23px;
  margin-left: 12px;
  font-size: 15px;
  display: inline-block;
}
.connect-other {
  margin-left: 12px;
  margin-top: 31px;
  display: flex;
  align-items: center;
}
.no-account a {
  text-decoration: none;
  color: blue;
}

.fill-height {
  height: 100vh !important;
  padding: 10px;
}

.v-card .v-card-title {
  font-size: 26px;
  font-weight: bold;
  display: inline-block;
}

.v-card .v-card-text {
  padding-top: 10px;
  padding-bottom: 0px;
}

.v-container .v-card {
  padding: 10px;
  width: 100%;
  max-width: 1200px;
  /* Giới hạn chiều rộng tối đa của v-card để không bị quá lớn */
}

.submit-login {
  background-color: #ff6666;
  color: azure;
}

.v-messages {
  border: 1px solid;
}

.v-input__prepend-inner {
  margin-right: 20px;
  /* Tạo khoảng cách giữa icon và input */
}

.v-field__input {
  padding-left: 50px;
  /* Tăng khoảng cách bên trái của input */
}

.v-checkbox {
  display: block;
}

.form-login {
  padding-top: 100px;
  padding-bottom: 100px;
  padding-left: 20px;
}

.v-card-actions {
  margin-left: 5px;
}
</style>
