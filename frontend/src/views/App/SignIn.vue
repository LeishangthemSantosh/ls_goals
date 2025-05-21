<template>
  <div class="sign-in">
    <a-row type="flex" :gutter="[24, 24]" justify="space-around" align="middle">
      <!-- Sign In Form Column -->
      <a-col
        :span="24"
        :md="12"
        :lg="{ span: 12, offset: 0 }"
        :xl="{ span: 6, offset: 2 }"
        class="col-form"
        style="padding-top: 100px"
      >
        <h1 class="mb-15">Sign In</h1>
        <h5 class="font-regular text-muted">
          Enter your email and password to sign in
        </h5>

        <!-- Sign In Form -->
        <a-form
          :model="formState"
          :rules="rules"
          @finish="onFinish"
          @finishFailed="onFinishFailed"
          autocomplete="off"
          class="login-form"
        >
          <a-form-item
            class="mb-10"
            label="Email"
            :colon="false"
            :labelCol="{ span: 24 }"
            :wrapperCol="{ span: 24 }"
            name="email"
          >
            <a-input
              type="text"
              v-model:value="formState.email"
              placeholder="Email"
              size="large"
            />
          </a-form-item>

          <a-form-item
            class="mb-5"
            label="Password"
            :colon="false"
            :labelCol="{ span: 24 }"
            :wrapperCol="{ span: 24 }"
            name="password"
          >
            <a-input
              type="password"
              v-model:value="formState.password"
              placeholder="Password"
              size="large"
            />
          </a-form-item>

          <a-form-item :wrapperCol="{ span: 24 }">
            <a-button type="primary" size="large" block html-type="submit">
              SIGN IN
            </a-button>
          </a-form-item>
        </a-form>

        <!-- / Sign In Form -->

        <p class="font-semibold text-muted">
          Don't have an account?
          <router-link to="/sign-up" class="font-bold text-dark">
            Sign Up
          </router-link>
        </p>
      </a-col>

      <!-- Sign In Image Column -->
      <a-col :span="24" :md="12" :lg="12" :xl="12" class="col-img">
        <img src="/images/signin.png" alt="Sign In" />
      </a-col>
    </a-row>
  </div>
</template>

<script setup>
import { reactive } from "vue";
import { message } from "ant-design-vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth.store"; // <-- Import Pinia store
import "dotenv";

const auth = useAuthStore(); // <-- Create auth store instance
const router = useRouter(); // <-- For redirect

const formState = reactive({
  email: "",
  password: "",
});

const rules = {
  email: [
    { required: true, message: "Please input your email!" },
    { type: "email", message: "Please provide a valid email" },
  ],
  password: [
    { required: true, message: "Please input your password!" },
    { min: 6, message: "Password must be at least 6 digits" },
  ],
};

const onFinish = async (values) => {
  try {
    await auth.login(formState.email, formState.password);
    message.success("Successfully logged in");
    router.push("/");
  } catch (error) {
    const errorMsg =
      error?.response?.data?.message || error.message || "Login failed";
    message.error(errorMsg);
  }
};

const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};
</script>
<style scoped>
/* Previous style rules... (like mb-15, font-muted, etc.) */

.sign-in {
  padding: 0px 20px;
}

.sign-in .col-img img {
  width: 100%;
  max-width: 500px;
  margin: auto;
  display: block;
}

@media (min-width: 992px) {
  .sign-in .col-img img {
    margin: 0;
  }
}

.sign-in .col-form .ant-switch {
  margin-right: 5px;
}

.sign-in .ant-form-item-label {
  line-height: 28px;
}

.sign-in .ant-form-item label {
  font-size: 13px;
  font-weight: 600;
  color: #1f1f1f;
}

.text-muted {
  color: #8c8c8c !important;
}

.font-regular {
  font-family: "Open Sans", sans-serif;
  font-weight: 400 !important;
}

.h1,
h1 {
  font-weight: 600;
  color: #141414;
  font-size: 48px;
  font-family: "Poppins", sans-serif;
}

.h5,
h5 {
  font-size: 20px;
}
</style>
