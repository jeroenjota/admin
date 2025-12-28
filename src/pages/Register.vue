<template>
  <div class="min-h-screen flex">
    <div
      class="hidden md:flex w-1/3 bg-gray-900 text-white flex-col items-center justify-center p-8">
      <h1 class="text-3xl font-bold mb-4">Register</h1>
      <p class="text-gray-300 text-center">
        Welcome @ Jota Tours! Please fill in the form to access the dashboard and manage tours.
      </p>
    </div>

    <!-- Register form -->
    <div class="flex-1 flex items-center justify-center bg-gray-100 p-6">">
      <div class="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <h2 class="text-2xl font-bold mb-6 text-center">Register</h2>

        <form @submit.prevent="handleRegister" class="space-y-4">
          <div>
            <label for="uName" class="block mb-1 font-medium">User Name</label>
            <div class="flex flex-cols justify-between gap-4">
              <input
                id="uName"
                v-model="uName"
                type="text"
                placeholder="admin"
                class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-400"
                required />
              <label class="flex items-center justify-center gap-2">
                <input type="checkbox" v-model="isAdmin" />
                Admin
              </label>
            </div>
          </div>
          <label for="fName" class="block mb-1 font-medium">Name</label>
          <div class="flex flex-cols">
            <input
              id="fName"
              v-model="fName"
              type="text"
              placeholder="First name"
              class="w-1/2 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-400"
              required />
            <input
              id="sName"
              v-model="sName"
              type="text"
              placeholder="Surname"
              class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-400"
              required />
          </div>

          <div>
            <label for="email" class="block mb-1 font-medium">Email</label>
            <input
              id="email"
              v-model="email"
              type="email"
              placeholder="user@example.com"
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

          <div>
            <label for="passwordConfirm" class="block mb-1 font-medium"
              >Confirm Password</label
            >
            <input
              id="passwordConfirm"
              v-model="passwordConfirm"
              type="password"
              placeholder="••••••••"
              class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-400"
              required />
          </div>

          <button
            type="submit"
            class="w-full bg-sky-600 text-white font-bold py-2 px-4 rounded hover:bg-sky-700 transition"
            :disabled="loading">
            <span v-if="loading">Registering...</span>
            <span v-else>Register</span>
          </button>
        </form>

        <p v-if="error" class="text-red-500 mt-4 text-center">{{ error }}</p>
        <p v-if="success" class="text-green-500 mt-4 text-center">
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
import { api } from "../composables/useApi";

const uName = ref("")
const fName = ref("");
const sName = ref("");
const email = ref("");
const password = ref("");
const passwordConfirm = ref("");
const error = ref("");
const success = ref("");
const loading = ref(false);
const isAdmin = ref(false);

async function handleRegister() {
  error.value = "";
  success.value = "";

  if (password.value !== passwordConfirm.value) {
    error.value = "Passwords do not match";
    return;
  }

  loading.value = true;

  try {
    const userAdmin = isAdmin ? "/api/users/createAdmin" : "/api/users";
    const response = await fetch(api(userAdmin), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        uName: uName.value,
        fName: fName.value,
        sName: sName.value,
        email: email.value,
        password: password.value,
      }),
    });
    console.log("Body: ",  JSON.stringify({
        uName: uName.value,
        fName: fName.value,
        sName: sName.value,
        email: email.value,
        password: password.value,
      }))
    if (!response.ok) {
      const text =  await response.text()
      // const errData = await response.json();

      console.log( 'APi resonse: ', text)
      // throw new Error("Fout in CreateAdmin: " + errData.message);
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
