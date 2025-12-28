<template>
  <div class="min-h-screen flex">
    <!-- Zwarte sidebar -->
    <div
      class="hidden md:flex w-1/3 bg-gray-900 text-white flex-col items-center justify-center p-8">
      <h1 class="text-3xl font-bold mb-4">Admin Panel</h1>
      <p class="text-gray-300 text-center">
        Welcome back! Please login to access the dashboard and manage tours.
      </p>
    </div>

    <!-- Login form -->
    <div class="flex-1 flex items-center justify-center bg-gray-100 p-6">
      <div class="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <h2 class="text-2xl font-bold mb-6 text-center">Login</h2>

        <form @submit.prevent="handleLogin" class="space-y-4">
          <div>
            <label for="email" class="block mb-1 font-medium">Email</label>
            <input
              id="email"
              v-model="email"
              type="email"
              placeholder="admin@example.com"
              class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-400"
              required />
          </div>

          <div>
            <label for="password" class="block mb-1 font-medium"
              >Password</label
            >
            <input
              id="password"
              v-model="password"
              type="password"
              placeholder="••••••••"
              class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-400"
              required />
          </div>

          <button
            type="submit"
            class="w-full bg-sky-600 text-white font-bold py-2 px-4 rounded hover:bg-sky-700 transition" :disabled="loading">
            <span v-if="loading">Loading...</span>
            <span v-else>Login</span>
          </button>
        </form>

        <p v-if="error" class="text-red-500 mt-4 text-center">{{ error }}</p>
        <!-- Link naar register -->
        <p class="mt-6 text-center text-gray-600">
          No account yet?
          <router-link to="/register" class="text-sky-600 hover:underline">
            Register
          </router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { api} from "../composables/useApi"
const router = useRouter();
const route = useRoute();

const email = ref("");
const password = ref("");
const error = ref("");
const user = ref("")
const loading = ref(false)

async function handleLogin() {
  error.value = "";
  loading.value = true;

  try {
    const response = await fetch(api("/api/users/admin"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email.value, password: password.value }),
    });

    if (!response.ok) {
      const errData = "ERRORR!" + await response.json();
      throw new Error(errData.message || "Login failed");
    }

    const data = await response.json();
    localStorage.setItem("token", data.token);

    router.push(route.query.redirect || "/");
  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
}

</script>
