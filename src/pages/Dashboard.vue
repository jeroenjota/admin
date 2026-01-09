<template>
  <div class="flex min-h-screen">
    <!-- Sidebar -->
    <aside class="flex w-64 flex-col bg-blue-900 text-white">
      <div class="p-6">
        <h1 class="mb-6 text-2xl font-bold">Admin Panel</h1>
        <nav class="flex flex-col space-y-2">
          <router-link
            to="tours"
            class="block rounded px-3 py-2 hover:bg-sky-800"
            active-class="bg-blue-800 font-bold">
            Tours
          </router-link>
          <router-link
            to="categories"
            class="block rounded px-3 py-2 hover:bg-sky-800"
            active-class="bg-blue-800 font-bold">
            Categories
          </router-link>
          <router-link
            to="users"
            class="block rounded px-3 py-2 hover:bg-sky-800"
            active-class="bg-blue-800 font-bold">
            Users
          </router-link>
        </nav>
      </div>

      <div class="mt-auto p-6">
        <button
          @click="logout"
          class="w-full rounded bg-red-600 px-4 py-2 font-bold text-white hover:bg-red-700">
          Logout
        </button>
      </div>
    </aside>

    <!-- Main content -->
    <main class="flex-1 bg-gray-100 p-6">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();

function logout() {
  localStorage.removeItem("token");
  router.push("/login");
}

// Helper voor actieve menu highlight
const isActive = (path) => route.path === path;
</script>
