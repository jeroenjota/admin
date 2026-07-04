<template>
  <h1 class="mb-4 text-2xl font-bold">Categorieën</h1>
  <draggable
    v-model="categories"
    item-key="id"
    class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3"
    handle=".drag-handle"
    @end="saveOrder">
    <template #item="{ element }">
      <div
        class="drag-handle flex flex-col items-center justify-between rounded border bg-white p-4 shadow md:flex-row">
        <h2
          @click="editCategory(element)"
          class="mb-2 cursor-pointer text-lg font-semibold hover:underline md:mb-0">
          {{ element.cat_order }}:  {{ element.name }}
        </h2>

        <img
          v-if="element.photo"
          :src="assetUrl(`/uploads/thumbs/${element.photo}`)"
          alt="Category photo"
          class="max-h-20" />
      </div>
    </template>
  </draggable>
  <CategorieEdit
    v-if="showEditor"
    :key="form?.id"
    :form="form"
    :category="selectedCategory"
    @close="closeEdit"
    @save="saveThis"
    @delete="deleteCategorie(selectedCategory.id)" />
</template>

<script setup>
import { ref, onMounted } from "vue";
import { getCategories, saveCategory } from "@/api/categories.api.js";
import CategorieEdit from "../components/CategorieEdit.vue";
import draggable from "vuedraggable";
import { assetUrl, apiFetch } from "@/composables/useApi.js";
import { useToast } from "vue-toastification";
const toast = useToast();
const showEditor = ref(false);
const selectedCategory = ref(null);
const categories = ref([]);

const form = ref({
  id: null,
  name: "",
  photo: null,
  cat_order: 0,
});

const closeEdit = () => {
  showEditor.value = false;
};

async function saveOrder() {
  const payload = categories.value.map((cat) => cat.id);
  await apiFetch("/admin/categories/reorder", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  categories.value = await getCategories();
}

const saveThis = async () => {
  try {
    await saveCategory(form.value);
    categories.value = await getCategories();
    showEditor.value = false;
  } catch (err) {
    toast.error("Failed to save category: " + err.message);
  }
};

const editCategory = (category) => {
  selectedCategory.value = category;
  showEditor.value = true;
  form.value = { ...category };
};

const deleteCategorie = async (categoryId) => {
  const response = await apiFetch(`/admin/categories/${categoryId}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    const text = await response.text();
    toast.error("Failed to delete category: " + (text || "Onbekende fout"));
    return;
  }
  categories.value = await getCategories();
  showEditor.value = false;
};

onMounted(async () => {
  categories.value = await getCategories();
});
</script>
