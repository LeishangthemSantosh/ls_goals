<template>
  <div class="sign-up">
    <!-- Sign Up Image and Headings -->
    <div
      class="sign-up-header"
      style="background-image: url('images/bg-signup.jpg')"
    >
      <div class="content">
        <h1 class="mb-5">Sign Up</h1>
        <h5 class="font-regular">Enter your email and password to sign in</h5>
      </div>
    </div>

    <!-- Floating Overlapping Sign Up Form -->
    <div class="card-container">
      <a-card bordered="false" class="card-signup">
        <a-form
          :model="formState"
          :rules="rules"
          @finish="onFinish"
          @finishFailed="onFinishFailed"
          autocomplete="off"
          class="login-form"
        >
          <a-form-item class="mb-10" name="name">
            <a-input
              v-model:value="formState.name"
              placeholder="Name"
              size="large"
            />
          </a-form-item>
          <a-form-item class="mb-10" name="email">
            <a-input
              v-model:value="formState.email"
              placeholder="Email"
              size="large"
            />
          </a-form-item>
          <a-form-item class="mb-5" name="password">
            <a-input
              v-model:value="formState.password"
              type="password"
              placeholder="Password"
              size="large"
            />
          </a-form-item>
          <a-form-item class="mb-5" name="confirm_password">
            <a-input
              v-model:value="formState.confirm_password"
              type="password"
              placeholder="Confirm Password"
              size="large"
            />
          </a-form-item>
          <a-form-item name="terms" class="mb-10">
            <a-checkbox v-model:checked="formState.terms">
              I agree to the
              <a href="#" class="font-bold text-dark">Terms and Conditions</a>
            </a-checkbox>
          </a-form-item>
          <a-form-item>
            <a-button type="primary" block size="large" html-type="submit">
              SIGN UP
            </a-button>
          </a-form-item>
        </a-form>

        <p class="font-semibold text-muted text-center">
          Already have an account?
          <router-link to="/sign-in" class="font-bold text-dark">
            Sign In
          </router-link>
        </p>
      </a-card>
    </div>
  </div>
</template>

<script setup>
import { reactive } from "vue";
import axios from "axios";
import "dotenv";
import { message } from "ant-design-vue";

const formState = reactive({
  name: "",
  email: "",
  password: "",
  confirm_password: "",
  terms: false,
});

const validateConfirmPass = async (_rule, value) => {
  if (value === "") {
    return Promise.reject("Please input the password again");
  } else if (value !== formState.password) {
    return Promise.reject("Two inputs don't match!");
  } else {
    return Promise.resolve();
  }
};

const validateAgreeTerms = async (_rule, value) => {
  if (value === false) {
    return Promise.reject("Please agree to terms and conditions first");
  } else {
    return Promise.resolve();
  }
};

const rules = {
  name: [
    {
      required: true,
      message: "Name cannot be empty",
      trigger: "change",
    },
  ],
  email: [
    { required: true, message: "Please input your email!" },
    { type: "email", message: "Please provide a valid email" },
  ],
  password: [
    { required: true, message: "Please input your password!" },
    { min: 6, message: "Password must be atleast 6 digits" },
  ],
  confirm_password: [
    {
      validator: validateConfirmPass,
      trigger: "change",
    },
  ],
  terms: [
    {
      validator: validateAgreeTerms,
      trigger: "change",
    },
  ],
};

const onFinish = async (values) => {
  console.log("Success:", values);
  const url = import.meta.env.VITE_API_BASE_URL + "auth/register";
  const response = await axios.post(url, {
    name: formState.name,
    email: formState.email,
    password: formState.password,
    confirm_password: formState.confirm_password,
  });

  if (response && response.data.status === 200) {
    message.success("User registration successful");
  } else {
    message.error(response.data.message);
  }
};

const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};
</script>

<style scoped>
.sign-up-header {
  height: 400px;
  padding: 60px 20px 80px;
  margin-top: 30px;

  background-size: cover;
  background-position: center;
  text-align: center;
  border-radius: 12px;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.06);
}

.sign-up-header .content {
  max-width: 500px;
  margin: 0 auto;
  color: white;
}

/* Overlapping card container */
.card-container {
  display: flex;
  justify-content: center;
  margin-top: -200px; /* Moves card up into image */
  padding: 0 16px;
}

.card-signup {
  background: white;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 480px;
  text-align: left;
}

/* Typography */
.text-muted {
  color: #8c8c8c !important;
}
.font-regular {
  font-family: "Open Sans", sans-serif;
  font-weight: 400 !important;
}
h1 {
  font-weight: 600;
  color: #fff;
  font-size: 48px;
  font-family: "Poppins", sans-serif;
}
h5 {
  font-size: 20px;
  color: #eee;
}
</style>
