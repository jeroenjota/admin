<template>
  <div
    class="fixed inset-0 bg-black/60 z-50 flex items-center justify-center"
    @click.self="emit('close')">
    <!-- Formulier -->

    <div
      class="bg-white w-full max-w-3xl overflow-hidden p-4 border-blue-500 shadow-2xl border rounded-lg space-y-4">
      <h2 class="font-semibold">
        {{ form.id ? "Tour bewerken" : "Nieuwe tour" }}
      </h2>
      <div class="flex flex-col justify-center gap-4 md:flex-row md:gap-6">
        <input
          v-model="form.title"
          placeholder="Titel"
          class="border p-2 rounded" />
        <input
          v-model="form.description"
          placeholder="Ondertitel"
          class="border p-2 rounded w-full" />
        <label class="flex items-center gap-2">
          <input type="checkbox" v-model="form.active" />
          Actief
        </label>
        <input
          v-model.number="form.showorder"
          type="number"
          placeholder="Volgorde  "
          class="border p-2 rounded" />
      </div>
      <div class="grid grid-cols-5 gap-4">
        <input
          v-model.number="form.price"
          type="number"
          placeholder="Prijs"
          class="border p-2 rounded" />
        <input
          v-model.number="form.pprice"
          type="number"
          placeholder="Prijs/Per persoon"
          class="border p-2 rounded" />
        <input
          v-model.number="form.discount"
          type="number"
          placeholder="Korting"
          class="border p-2 rounded" />
        <input
          v-model.number="form.maxpers"
          type="number"
          placeholder="Max. personen"
          class="border p-2 rounded" />

        <input
          v-model.number="form.duration"
          type="number"
          placeholder="Duur (uur)"
          class="border p-2 rounded" />
      </div>
      <textarea
        v-model="form.content"
        placeholder="Inhoud"
        class="border p-2 rounded w-full" />

      <FotoUpload />
      <div class="flex gap-2">
        <button
          class="bg-blue-600 text-white px-4 py-2 rounded"
          @click="saveTour">
          Opslaan
        </button>
        <button
          class="bg-gray-400 text-white px-4 py-2 rounded"
          @click="emit('close')">
          Annuleren
        </button>
      </div>
    </div>
  </div>
</template>
<script setup>
import FotoUpload from "./FotoUpload.vue";
import { api } from "/api.js";
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
