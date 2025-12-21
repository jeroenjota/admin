<template>
  <div class="space-y-8">

    <TourForm v-model="tour" />

    <CategorySelector
      :selected="tour.categoryIds"
      @update="updateCategories"
    />

    <PhotoManager
      :tour-id="tour.id"
    />

  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import TourForm from "../components/TourForm.vue";
import CategorySelector from "../components/CategorySelector.vue";
import PhotoManager from "../components/PhotoManager.vue";
import { getTour } from "../api/tours.api";

const tour = ref(null);

onMounted(async () => {
  tour.value = await getTour(route.params.id);
});
</script>
