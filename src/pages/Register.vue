<template>
  <div class="flex min-h-screen">
    <div
      class="hidden w-1/3 flex-col items-center justify-center bg-gray-900 p-8 text-white md:flex">
      <h1 class="mb-4 text-3xl font-bold">Register</h1>
      <p class="text-center text-gray-300">
        Welcome @ Jota Tours! Please fill in the form to access the dashboard and manage tours.
      </p>
    </div>

    <!-- Register form -->
    <div class="flex flex-1 items-center justify-center bg-gray-100 p-6">
      <div class="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
        <h2 class="mb-6 text-center text-2xl font-bold">Register</h2>

        <form @submit.prevent="handleRegister" class="space-y-4">
          <div>
            <p class="mb-1 block font-medium">Admin account</p>
            <p class="rounded border border-sky-200 bg-sky-50 px-3 py-2 text-sm text-sky-900">
              Deze registratie maakt alleen een admin-account aan.
            </p>
          </div>
          <label for="fName" class="mb-1 block font-medium">Name</label>
          <div class="flex-cols flex">
            <input
              id="fName"
              v-model="fName"
              type="text"
              placeholder="First name"
              class="w-1/2 rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-400"
              required />
            <input
              id="sName"
              v-model="sName"
              type="text"
              placeholder="Surname"
              class="w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-400"
              required />
          </div>

          <div>
            <label for="email" class="mb-1 block font-medium">Email</label>
            <input
              id="email"
              v-model="email"
              type="email"
              placeholder="user@example.com"
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

          <div>
            <label for="passwordConfirm" class="mb-1 block font-medium"
              >Confirm Password</label
            >
            <input
              id="passwordConfirm"
              v-model="passwordConfirm"
              type="password"
              placeholder="••••••••"
              class="w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-400"
              required />
          </div>

          <button
            type="submit"
            class="w-full rounded bg-sky-600 px-4 py-2 font-bold text-white transition hover:bg-sky-700"
            :disabled="loading">
            <span v-if="loading">Registering...</span>
            <span v-else>Register</span>
          </button>
        </form>

        <p v-if="error" class="mt-4 text-center text-red-500">{{ error }}</p>
        <p v-if="success" class="mt-4 text-center text-green-500">
          {{ success }}
        </p>
        <p class="mt-6 text-center text-gray-600">
          Already registered?
          <router-link to="/login" class="text-sky-600 hover:underline">
            Login here
          </router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { apiFetch } from "../composables/useApi";

const fName = ref("");
const sName = ref("");
const email = ref("");
const password = ref("");
const passwordConfirm = ref("");
const error = ref("");
const success = ref("");
const loading = ref(false);

async function handleRegister() {
  error.value = "";
  success.value = "";

  if (password.value !== passwordConfirm.value) {
    error.value = "Passwords do not match";
    return;
  }

  loading.value = true;

  try {
    const response = await apiFetch("/admin/createAdmin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fName: fName.value,
        sName: sName.value,
        email: email.value,
        password: password.value,
      }),
    });
    if (!response.ok) {
      const text = await response.text();
      throw new Error(text || "Registratie mislukt");
    }

    success.value = "Registration successful! You can now log in.";

    fName.value = "";
    sName.value = "";
    email.value = "";
    password.value = "";
    passwordConfirm.value = "";
  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
}
</script>
