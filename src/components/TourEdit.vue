<template>
  <div
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
    @click.self="emit('close')">
    <!-- Formulier -->
    <div
      class="max-h-[85vh] w-full max-w-4xl flex-1 space-y-4 rounded-lg border border-blue-500 bg-white p-4 shadow-2xl">
      <div class="grid grid-cols-[100px_1fr] items-center gap-4">
        <label class="font-bold" for="title">{{
          form.id ? "Bewerk: " : "Nieuwe tour"
        }}</label>
        <div class="flex items-center gap-3">
          <input
            v-model="form.title"
            placeholder="Titel"
            class="mr-3 w-full rounded border p-2" />
          <label for="order">Order</label>
          <input
            v-model.number="form.showorder"
            name="order"
            type="number"
            placeholder="Volgorde  "
            class="w-15 rounded border p-2" />
        </div>
      </div>

      <div
        class="max-h-[65vh] w-full flex-1 space-y-4 overflow-hidden overflow-y-auto overscroll-contain rounded-lg border border-blue-500 bg-white p-4 shadow-2xl">
        <div class="grid grid-cols-[100px_1fr] items-center gap-4">
          <label>Omschrijving</label>
          <div class="flex items-center gap-3">
            <input
              v-model="form.description"
              placeholder="Ondertitel"
              class="w-full rounded border p-2" />
            <label class="flex items-center justify-center gap-2">
              <input
                type="checkbox"
                v-model="form.active"
                :true-value="1"
                :false-value="0" />
              Actief
            </label>
          </div>
        </div>
        <div class="grid grid-cols-8 gap-2">
          <label class="col-span-2" for="prijs">Prijs</label>
          <label class="col-span-2" for="prpp">Prijs pp</label>
          <label for="korting">Korting</label>
          <label for="max">Max p</label>
          <label for="duur">Duur</label>
          <label for="rating">Rating</label>
          <input
            v-model.number="form.price"
            type="number"
            name="prijs"
            step="10"
            placeholder="Prijs"
            class="col-span-2 rounded border p-2" />
          <input
            v-model.number="form.pprice"
            type="number"
            name="prpp"
            step="2.5"
            placeholder="Prijs pp"
            class="col-span-2 rounded border p-2" />
          <input
            v-model.number="form.discount"
            type="number"
            name="korting"
            placeholder="Korting"
            class="rounded border p-2" />
          <input
            v-model.number="form.maxpers"
            type="number"
            name="max"
            placeholder="Max. personen"
            class="rounded border p-2" />
          <input
            v-model.number="form.duration"
            type="number"
            name="duur"
            placeholder="Duur"
            step="0.5"
            class="rounded border p-2" />
          <input
            v-model.number="form.rating"
            type="number"
            name="rating"
            placeholder="Rating"
            step="0.5"
            class="rounded border p-2" />
        </div>
        <QuillEditor
          v-model:content="form.content"
          content-type="html"
          theme="snow"
          :toolbar="toolbar"
          class="bg-white" />
        <CategoriesSelector :tourId="form.id" />
        <div class="">
          <PhotoManager :tourId="form.id" />
        </div>
      </div>

      <div class="flex justify-center gap-2">
        <button
          type="button"
          class="rounded bg-blue-600 px-4 py-2 text-white"
          @click="emit('saved')">
          Opslaan
        </button>
        <button
          type="button"
          class="rounded bg-gray-400 px-4 py-2 text-white"
          @click="emit('close')">
          Annuleren
        </button>
      </div>
    </div>
  </div>
</template>
<script setup>
// import FotoUpload from "@/components/FotoUpload.vue";
import PhotoManager from "@/components/PhotoManager.vue";
import CategoriesSelector from "@/components/CategorySelector.vue";
import { QuillEditor } from "@vueup/vue-quill";

const toolbar = [
  ["bold", "italic", "underline"],
  [{ header: [1, 2, 3, 4, false] }],
  [{ align: [] }],
  [{ list: "ordered" }, { list: "bullet" }],
  [{ indent: "-1" }, { indent: "+1" }],
  ["blockquote"],
  ["link"],
  ["clean"],
];

const props = defineProps({
  tour: {
    type: Object,
    required: true,
  },
  form: {
    type: Object,
    required: true,
  },
});
const emit = defineEmits(["saved", "close"]);
</script>
