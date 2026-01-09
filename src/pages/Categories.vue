<template>
  <h1 class="mb-4 text-2xl font-bold">Categorieën</h1>

  <div class="grid grid-cols-1 gap-2 p-4 md:grid-cols-2 lg:grid-cols-3">
    <div
      v-for="category in categories"
      :key="category.id"
      class="rounded border bg-white p-4 shadow"
    >
      <div class="flex flex-col items-center justify-between md:flex-row">
        <h2
          @click="editCategory(category)"
          class="cursor-pointer text-lg font-semibold hover:underline"
        >
          {{ category.name }}
        </h2>

        <img
          v-if="category.photo"
          :src="api(`/uploads/thumbs/${category.photo}`)"
          alt="Category photo"
          class="max-h-20"
        />
      </div>
    </div>
  </div>

  <CategorieEdit
    v-if="showEditor"
    :key="form?.id"
    :form="form"
    :category="selectedCategory"
    @close="closeEdit"
    @save="saveThis"
  />
</template>

<script setup>
import { ref, onMounted } from "vue";
import { getCategories, saveCategory } from "@/api/categories.api.js";
import CategorieEdit from "../components/CategorieEdit.vue";
const showEditor = ref(false);
const selectedCategory = ref(null);
const categories = ref([]);
import { api } from "@/composables/useApi.js";

const form = ref({
  id: null,
  name: "",
  photo: null,
});

const closeEdit = () => {
  showEditor.value = false;
};

const saveThis = async () => {
  console.log("Saving this: ", form.value);
  await saveCategory(form.value);
  categories.value = await getCategories();
  showEditor.value = false;
};

const editCategory = (category) => {
  selectedCategory.value = category;
  // console.log("Editing category:", category);
  showEditor.value = true;
  form.value = { ...category };
  // console.log("Form set to:", form.value);
};

onMounted(async () => {
  categories.value = await getCategories();
  // console.log("Fetched categories:", categories.value);
});
</script>
