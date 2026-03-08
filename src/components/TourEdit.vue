<template>
  <div
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
    @click.self="emit('close')">
    <!-- Formulier -->
    <div
      class="max-h-[95vh] w-full max-w-4xl flex-1 space-y-4 rounded-lg border border-blue-500 bg-white p-4 shadow-2xl">
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
        class="max-h-[80vh] w-full flex-1 space-y-4 overflow-hidden overflow-y-auto overscroll-contain rounded-lg border border-blue-500 bg-white p-4 shadow-2xl">
        <div class="grid grid-cols-[50px_1fr] items-center gap-4">
          <label>Kort</label>
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
            <label for="fromDate"
              >Vanaf
              <input type="date" v-model="form.fromDate" />
            </label>
            <label for="toDate"
              >Tot
              <input type="date" v-model="form.tillDate" />
            </label>
          </div>
        </div>
        <div class="grid grid-cols-10 gap-2">
          <label class="col-span-2" for="prijs">Prijs</label>
          <label class="col-span-2" for="prpp">Prijs pp</label>
          <label for="korting">Korting</label>
          <label for="max">Max p</label>
          <label for="duur">Duur</label>
          <label for="rating">Rating</label>
          <label for="start">Vroegst</label>
          <label for="max">Laatst</label>
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
            min="1"
            max="10"
            class="rounded border p-2" />
          <select v-model="form.startTime" class="rounded border p-2">
            <option v-for="t in times" :key="t" :value="t">
              {{ t }}
            </option>
          </select>
          <select v-model="form.maxTime" class="rounded border p-2">
            <option v-for="t in times" :key="t" :value="t">
              {{ t }}
            </option>
          </select>
        </div>
        <div
          class="grid max-h-[75vh] grid-cols-3 gap-4 overflow-y-auto overscroll-contain">
          <div class="col-span-2">
            <h2>Content</h2>
            <QuillEditor
              v-model:content="form.content"
              content-type="html"
              theme="snow"
              :toolbar="toolbar"
              class="bg-white" />
          </div>
          <div>
            <h2>Itinerary / Stops</h2>
            <QuillEditor
              v-model:content="form.itinerary"
              content-type="html"
              theme="snow"
              :toolbar="toolbar2"
              class="bg-white" />
          </div>
        </div>
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
import { computed } from "vue";
import PhotoManager from "@/components/PhotoManager.vue";
import CategoriesSelector from "@/components/CategorySelector.vue";
import { QuillEditor } from "@vueup/vue-quill";
import StartTimeSelect from "./StartTimeSelect.vue";
const toolbar = [
  ["bold", "italic", "underline"],
  [{ header: [1, 2, 3, 4, false] }],
  [{ align: [] }],
  [{ list: "ordered" }, { list: "bullet" }],
  [{ indent: "-1" }, { indent: "+1" }],
  ["link"],
  ["clean"],
];

const toolbar2 = [
  ["bold", "italic"],
  [{ list: "bullet" }],
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

props.form.startTime = props.tour.startTime?.slice(0, 5);
props.form.maxTime = props.tour.maxTime?.slice(0, 5);

function toTime(m) {
  const h = String(Math.floor(m / 60)).padStart(2, "0");
  const mm = String(m % 60).padStart(2, "0");
  return `${h}:${mm}`;
}

const times = computed(() => {
  const list = [];
  for (let t = 7 * 60; t <= 18 * 60; t += 30) {
    list.push(toTime(t));
  }
  return list;
});

const emit = defineEmits(["saved", "close"]);
</script>
