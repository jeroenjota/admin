<template>
  <div class="max-w-6xl mx-auto space-y-6">

    <!-- Header -->
    <div class="flex justify-between items-center">
      <h1 class="text-2xl font-semibold">Tours</h1>

      <router-link
        to="/tours/new"
        class="bg-blue-600 text-white px-4 py-2 rounded"
      >
        + Nieuwe tour
      </router-link>
    </div>

    <!-- Tabel -->
    <table class="w-full border-collapse">
      <thead>
        <tr class="bg-gray-100 text-left">
          <th class="p-2">Volgorde</th>
          <th class="p-2">Titel</th>
          <th class="p-2">Actief</th>
          <th class="p-2 w-40">Acties</th>
        </tr>
      </thead>

      <tbody>
        <tr
          v-for="tour in tours"
          :key="tour.id"
          class="border-t hover:bg-gray-50"
        >
          <td class="p-2">{{ tour.showorder }}</td>
          <td class="p-2 font-medium">
            {{ tour.title }}
          </td>
          <td class="p-2">
            <span
              :class="tour.active ? 'text-green-600' : 'text-red-600'"
            >
              {{ tour.active ? "Ja" : "Nee" }}
            </span>
          </td>
          <td class="p-2 flex gap-2">
            <router-link
              :to="`tours/${tour.id}`"
              class="text-blue-600 hover:underline"
            >
              Bewerken
            </router-link>

            <button
              @click="removeTour(tour)"
              class="text-red-600 hover:underline"
            >
              Verwijderen
            </button>
          </td>
        </tr>

        <tr v-if="tours.length === 0">
          <td colspan="4" class="p-4 text-center text-gray-500">
            Geen tours gevonden
          </td>
        </tr>
      </tbody>
    </table>

  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const tours = ref([]);

/* ---------- LOAD ---------- */
async function loadTours() {
  const res = await fetch("/api/tours");
  tours.value = await res.json();
}

/* ---------- DELETE ---------- */
async function removeTour(tour) {
  if (
    !confirm(`Weet je zeker dat je "${tour.title}" wilt verwijderen?`)
  ) {
    return;
  }

  await fetch(`/api/tours/${tour.id}`, {
    method: "DELETE",
  });

  loadTours();
}

/* ---------- INIT ---------- */
onMounted(loadTours);
</script>
