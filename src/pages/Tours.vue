<template>
  <div class="mx-auto max-w-5xl space-y-6 p-6">
    <h1 class="text-2xl font-bold">Tours onderhoud</h1>

    <!-- Tour lijst -->
    <div class="flex flex-col items-center justify-between gap-4 sm:flex-row">
      <h2 class="text-xl font-semibold">Bestaande tours</h2>
      <button
        class="cursor-pointer rounded bg-green-600 px-4 py-2 text-white hover:bg-green-900"
        @click="resetForm">
        Nieuwe tour
      </button>
    </div>
    <!-- Scrollable table container -->
    <div class="h-[75vh] overflow-x-auto rounded border bg-white shadow">
      <div
        class="grid grid-cols-12 gap-2 border-b bg-gray-50 p-3 text-sm font-semibold">
        <div class="col-span-2 text-center">Volgorde</div>
        <div class="col-span-4">Titel</div>
        <div class="col-span-2 pr-4 text-right">Prijs</div>
        <div class="col-span-1 text-center">Actief</div>
        <div class="col-span-3 text-center">Acties</div>
      </div>
      <!-- rows -->
      <draggable
        v-model="tours"
        item-key="id"
        handle=".drag-handle"
        class="space-y-2"
        @end="saveOrder">
        <template #item="{ element }">
          <div
            class="grid grid-cols-12 items-center gap-2 border-b p-3 text-sm hover:bg-gray-50">
            <div class="col-span-1 text-right">{{ element.showorder }}</div>
            <div class="col-span-1">
              <button
                class="drag-handle cursor-move rounded bg-gray-200 px-2 py-1 text-gray-600 hover:bg-gray-300"
                title="Verslepen">
                ☰
              </button>
            </div>
            <div class="col-span-4">{{ element.title }}</div>
            <div class="col-span-2 p-2 text-right">€ {{ element.price }}</div>
            <div class="col-span-1 text-center">
              <span
                :class="element.active ? 'text-green-600' : 'text-gray-400'">
                {{ element.active ? "Ja" : "Nee" }}
              </span>
            </div>
            <div class="col-span-3 mt-2 flex justify-center gap-2">
              <button
                class="cursor-pointer text-blue-600 hover:bg-blue-100"
                @click="editTour(element)">
                Bewerken
              </button>
              <button
                class="cursor-pointer text-red-600 hover:bg-red-100"
                @click="deleteTour(element.id)">
                Verwijderen
              </button>
            </div>
          </div>
        </template>
      </draggable>
    </div>
    <!-- End scrollable area -->
    <TourEdit
      :form="form"
      v-if="showTourDetail"
      :key="selectedTour?.id"
      :tour="selectedTour"
      @saved="saveTour"
      @close="closeTour" />
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import { apiFetch } from "@/composables/useApi.js";
import draggable from "vuedraggable";
import TourEdit from "../components/TourEdit.vue";
import { useToast } from "vue-toastification";

const toast = useToast();

// ----- Refs & State -----
const tours = ref([]);
const selectedTour = ref(null);
const showTourDetail = ref(false);

// vandaag en toekomst defaults
const initDate = new Date("2017-01-01").toISOString().slice(0, 10); // YYYY-MM-DD
const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
const future = new Date(new Date().getFullYear() + 5, 11, 31)
  .toISOString()
  .slice(0, 10);

// ----- Form met alle velden -----
const form = reactive(createForm());

// ----- Helpers -----
function normalizeDate(dateStr, fallback) {
  if (!dateStr) return fallback;
  return dateStr.slice(0, 10); // YYYY-MM-DD
}

function normalizeTime(timeStr, fallback) {
  if (!timeStr) return fallback;
  return timeStr.slice(0, 5); // HH:MM
}

// ----- Bestaande Tour -----
function editTour(tour) {
  Object.assign(form, createForm(tour));
  selectedTour.value = tour;
  showTourDetail.value = true;
}
// ---- Nieuwe Tour -----
function resetForm() {
  Object.assign(form, createForm());
  selectedTour.value = null;
  showTourDetail.value = true;
}
// ----- Sluiten -----
function closeTour() {
  selectedTour.value = null;
  showTourDetail.value = false;
}
// ----- form -----
function createForm(tour = null) {
  const base = {
    id: null,
    title: "",
    description: "",
    content: "",
    transportation: "",
    showorder: null,
    duration: 0,
    price: 0,
    pprice: 0,
    groupSize: 0,
    active: true,
    discount: 0,
    discountFrom: today,
    discountTill: future,
    rating: 4.5,
    fromDate: initDate,
    tillDate: future,
    startTime: "08:00",
    maxTime: "18:00",
  };

  if (!tour) return base;

  return {
    ...base,
    ...tour,
    // Keep compatibility with legacy lowercase field names if present.
    groupSize: Number(tour.groupSize ?? tour.groupsize ?? 0),
    fromDate: normalizeDate(tour.fromDate, initDate),
    tillDate: normalizeDate(tour.tillDate, future),
    discountFrom: normalizeDate(tour.discountFrom, today),
    discountTill: normalizeDate(tour.discountTill, future),
    startTime: normalizeTime(tour.startTime, "08:00"),
    maxTime: normalizeTime(tour.maxTime, "18:00"),
  };
}
// ----- Save -----
async function saveTour() {
  const method = form.id ? "PUT" : "POST";
  const url = form.id ? `/admin/tours/${form.id}` : "/admin/tours";
  const payload = {
    ...form,
    groupSize: Number(form.groupSize ?? form.groupsize ?? 0),
  };
  delete payload.groupsize;

  const response = await apiFetch(url, {
    method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errData = await response.json();
    toast.error("Saving tour failed! " + errData.message);
    throw new Error(errData.message || "Saving tour failed");
  } else {
    toast.success("Tour saved successfully!");
  }

  resetForm();
  await fetchTours();
  closeTour();
}

// ----- Delete -----
async function deleteTour(id) {
  if (!confirm("Tour verwijderen?")) return;

  await apiFetch(`/admin/tours/${id}`, { method: "DELETE" });
  fetchTours();
}

// ----- Reorder Tours -----
async function saveOrder() {
  const payload = tours.value.map((tour) => tour.id);

  await apiFetch("/admin/tours/reorder", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  fetchTours();
}

// ----- Fetch Tours -----
async function fetchTours() {
  const res = await apiFetch("/admin/tours");
  const json = await res.json();
  tours.value = json;
}

// ----- Lifecycle -----
onMounted(async () => {
  await fetchTours();
});
</script>