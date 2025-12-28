<template>
  <div
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
    @click.self="emit('close')">
    <!-- Formulier -->

    <div
      class="w-full max-w-3xl space-y-4 overflow-hidden rounded-lg border border-blue-500 bg-white p-4 shadow-2xl">
      <h2 class="font-semibold">
        {{ form.id ? "Tour bewerken" : "Nieuwe tour" }}
      </h2>
      <div class="grid grid-cols-[100px_1fr] items-center gap-4">
        <label>Tournaam</label>
        <div class="flex items-center gap-3">
          <input
            v-model="form.title"
            placeholder="Titel"
            class="mr-3 w-full rounded border p-2" />
          <label for="">Order</label>
          <input
            v-model.number="form.showorder"
            type="number"
            placeholder="Volgorde  "
            class="w-15 rounded border p-2" />
        </div>
      </div>
      <div class="grid grid-cols-[100px_1fr] items-center gap-4">
        <label>Omschrijving</label>
        <div class="flex items-center gap-3">
          <input
            v-model="form.description"
            placeholder="Ondertitel"
            class="w-full rounded border p-2" />
          <label class="flex items-center justify-center gap-2">
            <input type="checkbox" v-model="form.active" />
            Actief
          </label>
        </div>
      </div>
      <div class="grid grid-cols-5 gap-4">
        <label for="">Prijs</label>
        <label for="">Prijs pp</label>
        <label for="">Korting</label>
        <label for="">Max. personen</label>
        <label for="">Duur (uur)</label>

        <input
          v-model.number="form.price"
          type="number"
          placeholder="Prijs"
          class="rounded border p-2" />
        <input
          v-model.number="form.pprice"
          type="number"
          placeholder="Prijs/Per persoon"
          class="rounded border p-2" />
        <input
          v-model.number="form.discount"
          type="number"
          placeholder="Korting"
          class="rounded border p-2" />
        <input
          v-model.number="form.maxpers"
          type="number"
          placeholder="Max. personen"
          class="rounded border p-2" />

        <input
          v-model.number="form.duration"
          type="number"
          placeholder="Duur (uur)"
          step="0.5"
          class="rounded border p-2" />
      </div>
      <textarea
        v-model="form.content"
        placeholder="Inhoud"
        class="w-full rounded border p-2" />
      <CategoriesSelector :tourId="form.id" />
      <PhotoManager :tourId="form.id" />
      <FotoUpload />
      <div class="flex gap-2">
        <button
          class="rounded bg-blue-600 px-4 py-2 text-white"
          @click="saveTour">
          Opslaan
        </button>
        <button
          class="rounded bg-gray-400 px-4 py-2 text-white"
          @click="emit('close')">
          Annuleren
        </button>
      </div>
    </div>
  </div>
</template>
<script setup>
import FotoUpload from "@/components/FotoUpload.vue";
import PhotoManager from "@/components/PhotoManager.vue";
import CategoriesSelector from "@/components/CategorySelector.vue";
import { useRoute } from "vue-router";

const route = useRoute();

console.log("TourEdit mounted, path:", route.fullPath);

import { api } from "../composables/useApi.js";
import { reactive } from "vue";
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
