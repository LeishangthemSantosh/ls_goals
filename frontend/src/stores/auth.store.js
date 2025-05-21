import { defineStore } from "pinia";
import axios from "axios";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
    token: null,
    loading: false,
  }),
  getters: {
    isAuthenticated: (state) => !!state.token,
    getUser: (state) => state.user,
  },
  actions: {
    async login(email, password) {
      this.loading = true;
      try {
        const url = import.meta.env.VITE_API_BASE_URL + "auth/login";
        const response = await axios.post(url, { email, password });

        if (response.data.status === 200) {
          this.user = {
            name: response.data.data.name,
            email: response.data.data.email,
          };
          this.token = response.data.data.token;

          // Save to localStorage
          localStorage.setItem("token", this.token);
          localStorage.setItem("user", JSON.stringify(this.user));

          // Set default Authorization header
          axios.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${this.token}`;
        } else {
          throw new Error(response.data.message || "Login failed");
        }

        return response;
      } catch (error) {
        throw error;
      } finally {
        this.loading = false;
      }
    },

    logout() {
      this.user = null;
      this.token = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      // Remove Authorization header
      delete axios.defaults.headers.common["Authorization"];
    },

    loadFromStorage() {
      const token = localStorage.getItem("token");
      const user = localStorage.getItem("user");

      if (token && user) {
        this.token = token;
        this.user = JSON.parse(user);

        // Restore Authorization header
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

        // Attach interceptor only once
        axios.interceptors.response.use(
          (response) => response,
          (error) => {
            if (
              error.response?.status === 401 ||
              error.response?.status === 403
            ) {
              this.logout();
              router.push("/sign-in");
            }
            return Promise.reject(error);
          }
        );
      }
    },
  },
});
