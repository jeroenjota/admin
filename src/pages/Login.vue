<template>
  <div class="flex min-h-screen">
    <!-- Zwarte sidebar -->
    <div
      class="hidden w-1/3 flex-col items-center justify-center bg-gray-900 p-8 text-white md:flex">
      <h1 class="mb-4 text-3xl font-bold">Admin Panel</h1>
      <p class="text-center text-gray-300">
        Welcome back! Please login to access the dashboard and manage tours.
      </p>
    </div>

    <!-- Login form -->
    <div class="flex flex-1 items-center justify-center bg-gray-100 p-6">
      <div class="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
        <h2 class="mb-6 text-center text-2xl font-bold">Login</h2>

        <form @submit.prevent="handleLogin" class="space-y-4">
          <div>
            <label for="email" class="mb-1 block font-medium">Email</label>
            <input
              id="email"
              v-model="email"
              type="email"
              placeholder="admin@example.com"
              class="w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-400"
              required />
          </div>

          <div>
            <label for="password" class="mb-1 block font-medium"
              >Password</label
            >
            <input
              id="password"
              v-model="password"
              type="password"
              placeholder="••••••••"
              class="w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-400"
              required />
          </div>

          <button
            type="submit"
            class="w-full rounded bg-sky-600 px-4 py-2 font-bold text-white transition hover:bg-sky-700" :disabled="loading">
            <span v-if="loading">Loading...</span>
            <span v-else>Login</span>
          </button>
        </form>

        <p v-if="error" class="mt-4 text-center text-red-500">{{ error }}</p>
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
import { apiFetch} from "../composables/useApi"
import { useToast } from "vue-toastification";


const router = useRouter();
const route = useRoute();

const email = ref("");
const password = ref("");
const error = ref("");
const user = ref("")
const loading = ref(false)
const toast = useToast();

async function handleLogin() {
  error.value = "";
  loading.value = true;
  // console.log("Logging in with", email.value, password.value);
  try {
    const response = await apiFetch("/public/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email.value, password: password.value }),
    });
    if (!response.ok) {
      const errData = "ERRORR!" + await response.json();
      throw new Error(errData.message || "Login failed");
      // console.log(errData)
    }

    const data = await response.json();
    
    localStorage.setItem("token", data.token);
    toast.success(`Hello ${data.user.first}! You are successfully logged in!`);

    router.push(route.query.redirect || "/");
  } catch (err) {
    toast.error("Login failed! " + err.message);
    error.value = err.message;
  } finally {
    loading.value = false;
  }
}

</script>
