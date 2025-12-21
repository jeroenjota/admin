<template>
  <div>
    <h2 class="font-semibold mb-2">Categorieën</h2>

    <label
      v-for="cat in categories"
      :key="cat.id"
      class="block"
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
</template>

<script setup>
import { ref, watch } from "vue";
import { getCategories, saveTourCategories } from "../api/categories.api";

const props = defineProps({ selected: Array });
const emit = defineEmits(["update"]);

const categories = ref([]);
const selectedIds = ref([...props.selected]);

watch(selectedIds, () => emit("update", selectedIds.value));

async function save() {
  await saveTourCategories(selectedIds.value);
}
</script>
