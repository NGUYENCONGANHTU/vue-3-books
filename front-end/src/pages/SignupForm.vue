<template>
  <v-sheet class="app">
    <v-container class="fill-height d-flex justify-center align-center">
      <v-card>
        <v-row>
          <v-col cols="12" md="6" class="login-image">
            <div>
              <v-img
                src="https://static.tnex.com.vn/uploads/2023/05/word-image-14008-2.jpeg"
                alt="Login Image"
                height="100%"
                class="pa-5"
              ></v-img>
            </div>
          </v-col>
          <v-col cols="12" md="6" class="form-login">
            <v-card-title>Sign up</v-card-title>
            <Form ref="form" @submit="submitForm">
              <v-card-text>
                <v-text-field
                  v-model="name.value.value"
                  :counter="10"
                  :error-messages="name.errorMessage.value"
                  placeholder="Enter Your Name"
                  type="text"
                  variant="outlined"
                  prepend-inner-icon="mdi-account"
                  required
                ></v-text-field>
                <v-text-field
                  v-model="phone.value.value"
                  :counter="7"
                  :error-messages="phone.errorMessage.value"
                  placeholder="Enter Your Phone Number"
                  type="number"
                  prepend-inner-icon="mdi-phone"
                  variant="outlined"
                  required
                ></v-text-field>
                <v-text-field
                  v-model="email.value.value"
                  :error-messages="email.errorMessage.value"
                  placeholder="Enter Email"
                  type="email"
                  variant="outlined"
                  prepend-inner-icon="mdi-email"
                  required
                ></v-text-field>
                <v-text-field
                  v-model="password.value.value"
                  :error-messages="password.errorMessage.value"
                  placeholder="Enter Password"
                  type="password"
                  variant="outlined"
                  prepend-inner-icon="mdi-lock"
                  required
                ></v-text-field>
                <v-checkbox
                  label="I agree to all iterms"
                  v-model="checkbox.value.value"
                  :error-messages="checkbox.errorMessage.value"
                  type="checkbox"
                  value="1"
                ></v-checkbox>
              </v-card-text>
              <v-card-actions>
                <v-btn class="submit-login" @click="submitForm" variant="tonal"
                  >Register</v-btn
                >
              </v-card-actions>
            </Form>
            <div class="no-account mt-3">
              <p>
                Already have an account?
                <router-link to="/login">Sign in</router-link>
              </p>
            </div>
          </v-col>
        </v-row>
      </v-card>
    </v-container>
  </v-sheet>
</template>

<script setup>
import { ref } from "vue";
import { useAuthStore } from "@/stores/authStore";
import { useRouter } from "vue-router";
import { useField, useForm } from "vee-validate";
import { toast } from "vue3-toastify";
const router = useRouter();
const auth = useAuthStore();
const model = ref({
  email: "",
  password: "",
  name: "",
  phone: "",
});

//Validates
const { handleSubmit } = useForm({
  validationSchema: {
    name(value) {
      if (value?.length >= 2) return true;

      return "Name needs to be at least 2 characters.";
    },
    phone(value) {
      if (/^[0-9-]{7,}$/.test(value)) return true;

      return "Phone number needs to be at least 7 digits.";
    },
    email(value) {
      if (/^[a-z.-]+@[a-z.-]+\.[a-z]+$/i.test(value)) return true;

      return "Must be a valid e-mail.";
    },
    password(value) {
      if (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*(\W|_)).{5,}$/.test(value))
        return true;

      return "Must be a valid password.";
    },
    checkbox(value) {
      if (value === "1") return true;

      return "Must be checked.";
    },
  },
});
const submitForm = handleSubmit((values) => {
  try {
    const result = auth.register(values);
    if (result) {
      router.push(`/login`);
      // show toast
      toast("Register  success!!", {
        theme: "auto",
        type: "success",
        dangerouslyHTMLString: true,
      });
    }
  } catch (error) {
    toast(`${error.message}`, {
      theme: "auto",
      type: "error",
      dangerouslyHTMLString: true,
    });
  }
});
const name = useField("name");
const phone = useField("phone");
const email = useField("email");
const password = useField("password");
const checkbox = useField("checkbox");
</script>

<style scoped>
.app {
  background-image: url("@/assets/background-image.jpg");
  background-color: #9913135a;
}
.login-image {
  padding-top: 80px;
}
.no-account {
  margin-left: 12px;
  font-size: 15px;
  display: inline-block;
}
.v-selection-control .v-label {
  height: 0;
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
}

.v-field__input {
  padding-left: 50px;
}

.v-checkbox {
  display: block;
}

.form-login {
  padding-top: 50px;
  padding-bottom: 60px;
  padding-left: 20px;
}

.v-card-actions {
  margin-left: 5px;
}
</style>
