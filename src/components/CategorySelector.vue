<template>
  <div>
    <h2 class="font-semibold mb-2">Categorieën</h2>
    <div class="flex flex-wrap gap-4">
      {{ selectedIds }}
    <label
      v-for="cat in categories"
      :key="cat.id"
      class="flex items-center gap-2"
    >
      <input
        type="checkbox"
        :value="cat.id"
        v-model="selectedIds"
      />
      {{ cat.name }}
    </label>
    </div>

    <button
      class="mt-4 px-4 py-2 bg-sky-600 text-white rounded hover:bg-sky-700"
      @click="save"
    >
      Opslaan
    </button>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from "vue";
import { getCategories, saveTourCategories } from "@/api/categories.api.js";

const props = defineProps({
  selected: {
    type: Array,
    default: () => []
  },
  tourId: { type: Number }
});

const emit = defineEmits(["update"]);

const categories = ref([]);
const selectedIds = ref([]);

watch(
  () => props.selected,
  (newVal) => {
    selectedIds.value = [...newVal];
  },
  { immediate: true }
);

watch(selectedIds, () => {
  emit("update", selectedIds.value);
});

async function save() {
  await saveTourCategories(tourId, selectedIds.value);
}

onMounted(async () => {
  categories.value = await getCategories();
});
</script>
