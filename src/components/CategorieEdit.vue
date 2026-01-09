<template>
  <div
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
    @click.self="emit('close')"
  >
  <!-- formulier -->
    <div
      class="w-full max-w-xl space-y-4 rounded-lg bg-white p-6 shadow-xl"
    >
      <h2 class="border-b pb-2 text-xl font-semibold">
        Categorie bewerken
      </h2>

      <div>
        <div class="space-y-4">
          <!-- Naam -->
          <div>
            <label class="block text-sm font-medium text-gray-700">
              Naam
            </label>
            <input
              v-model="form.name"
              type="text"
              class="mt-1 w-full rounded border px-3 py-2"
              required
            />
          </div>

          <!-- Slug -->
          <div>
          </div>
        </div>
        <div @click="pickPhotoView = true" class="mt-4 cursor-pointer">
          <button >Foto</button>
          <!--  api('/uploads/resized/' + tour.image) -->
          <img v-if="form.photo" :src="api(`/uploads/thumbs/${form.photo}`)" class="mt-2 max-h-40" />
        </div>
        <!-- Acties -->
        <div class="mt-6 flex justify-end gap-2">

          <button
            type="button"
            @click="emit('close')"
            class="rounded border px-4 py-2"
          >
            Annuleren
          </button>

          <button
            type="button"
            @click="emit('save')"
            class="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            Opslaan
          </button>
        </div>
        <PhotoLibraryModal v-if="pickPhotoView" :is-category="true" @select="koppelFoto" />
        <!-- Placeholder to avoid unused component warning -->
      </div>
    </div>
</div>
</template>
<script setup>
  
import { ref, watch } from "vue"; 
import { api } from "@/composables/useApi.js";
import PhotoLibraryModal from "./PhotoLibraryModal.vue";
const props = defineProps({
  category: {
    type: Object,
    required: true,
  },
  form: {
    type: Object,
    required: true,
  },
});


const pickPhotoView = ref(false);

const koppelFoto = (photoFile) => {
  // console.log("Koppel foto called with file:", photoFile);
  props.form.photo = photoFile;
  pickPhotoView.value = false;
  // console.log("Photo selected with file:", photoFile);
};

const emit = defineEmits(["close", "save"]);


</script>