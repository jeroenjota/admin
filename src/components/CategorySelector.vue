<template>
  <div>
    <h2 class="mb-2 font-semibold">Categorieën</h2>
    <div class="flex flex-wrap gap-4">
      <!-- {{ selectedIds }} -->
    <label
      v-for="cat, index in categories"
      :key="cat.id"
      class="flex items-center gap-2"
    >
      <input
        type="checkbox"
        :value="cat.id"
        v-model="selectedIds"
        @change="save"
      />
      {{ cat.name }}
    </label>
    </div>

    <!-- <button
      class="mt-4 rounded bg-sky-600 px-4 py-2 text-white hover:bg-sky-700"
      @click="save"
    >
      Opslaan
    </button> -->
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from "vue";
import { getCategories, getTourCategories, saveTourCategories } from "@/api/categories.api.js";

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
  await saveTourCategories(props.tourId, selectedIds.value);
}

onMounted(async () => {
  // console.log("tourId:", props.tourId)
  categories.value = await getCategories();
  selectedIds.value = await getTourCategories(props.tourId);
  // console.log("SelectedIds:", selectedIds.value)
});
</script>
