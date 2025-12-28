<template>
  <div>
    <h1 class="text-2xl font-bold mb-4">Tours</h1>

    <table class="w-full text-sm">
      <tr v-for="tour in tours" :key="tour.id">
        <td>{{ tour.title }}</td>
        <td>
          <RouterLink
            :to="`tours/${tour.id}`"
            class="text-blue-600"
          >
            Bewerken
          </RouterLink>
        </td>
      </tr>
    </table>  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { getTours } from "../src/api/tours.api";

const tours = ref([]);

onMounted(async () => {
  tours.value = await getTours();
});
</script>
