<template>
  <div class="min-h-screen flex">
    <!-- Sidebar -->
    <aside class="w-64 bg-blue-900 text-white flex flex-col">
      <div class="p-6">
        <h1 class="text-2xl font-bold mb-6">Admin Panel</h1>
        <nav class="flex flex-col space-y-2">
          <router-link
            to="tours"
            @click.native="$router.replace($route.fullPath)"
            class="block px-3 py-2 rounded hover:bg-sky-800"
            active-class="bg-blue-800 font-bold">
            Tours
          </router-link>
          <router-link
            to="categories"
            @click.native="$router.replace($route.fullPath)"
            class="block px-3 py-2 rounded hover:bg-sky-800"
            active-class="bg-blue-800 font-bold">
            Categories
          </router-link>
          <router-link
            to="users"
            @click.native="$router.replace($route.fullPath)"
            class="block px-3 py-2 rounded hover:bg-sky-800"
            active-class="bg-blue-800 font-bold">
            Users
          </router-link>
        </nav>
      </div>

      <div class="mt-auto p-6">
        <button
          @click="logout"
          class="w-full bg-red-600 hover:bg-red-700 py-2 px-4 rounded text-white font-bold">
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
