<script setup>
import { ref, onMounted } from "vue";
import { api } from "@/api";

const tours = ref([]);

onMounted(async () => {
  const res = await fetch(api("/tours"));
  const json = await res.json();
  tours.value = json.result;
});
</script>

<template>
  <h2 class="text-2xl font-bold mb-4">Tours</h2>

  <table class="w-full bg-white shadow rounded">
    <thead class="bg-gray-200">
      <tr>
        <th class="p-2 text-left">Naam</th>
        <th class="p-2">Actief</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="tour in tours" :key="tour.id" class="border-t">
        <td class="p-2">{{ tour.title }}</td>
        <td class="p-2 text-center">
          {{ tour.active ? "✓" : "—" }}
        </td>
      </tr>
    </tbody>
  </table>
</template>
