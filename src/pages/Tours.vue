<template>
  <div class="mx-auto max-w-5xl space-y-6 p-6">
    <h1 class="text-2xl font-bold">Tours onderhoud</h1>

    <!-- Tour lijst -->
    <h2 class="text-xl font-semibold">Bestaande tours</h2>
    <button
      class="cursor-pointer rounded bg-green-600 px-4 py-2 text-white hover:bg-green-900"
      @click="resetForm">
      Nieuwe tour
    </button>
    <div class="rounded border bg-white">
      <div
        class="grid grid-cols-12 gap-2 border-b bg-gray-50 p-3 text-sm font-semibold">
        <div class="col-span-2 text-center">Volgorde</div>
        <div class="col-span-4">Titel</div>
        <div class="col-span-1 p-2 text-right">Prijs</div>
        <div class="col-span-2 text-center">Actief</div>
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
            <div class="col-span-1 p-2 text-right">€ {{ element.price }}</div>
            <div class="col-span-2 text-center">
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
    <TourEdit
      :form="form"
      v-if="showTourDetail"
      :key="selectedTour?.id"
      :tour="selectedTour"
      @saved="saveTour"
      @close="closeTour" />
  </div>
  <!-- </div> -->
</template>

<script setup>
import { ref, onMounted } from "vue";
import { api } from "@/composables/useApi.js";
import draggable from "vuedraggable";
import TourEdit from "../components/TourEdit.vue";
const selectedTour = ref(null);
const showTourDetail = ref(false);
const tours = ref([]);
const form = ref({
  id: null,
  title: "",
  description: "",
  content: "",
  price: 0,
  pprice: 0,
  duration: 0,
  active: true,
  maxpers: 0,
  discount: 0,
  rating: 4.5,
  showorder: null,
});

async function saveOrder() {
  const payload = tours.value.map((tour) => tour.id);

  await fetch(api("/api/tours/reorder"), {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  fetchTours();
}

async function fetchTours() {
  const res = await fetch(api("/api/tours?showAll=true"));
  const json = await res.json();
  tours.value = json;
}

function editTour(tour) {
  selectedTour.value = tour;
  //  console.log("Editing tour:", tour);
  showTourDetail.value = true;
  form.value = { ...tour };
}

function resetForm() {
  form.value = {
    id: null,
    titel: "",
    beschrijving: "",
    prijs: 0,
    duur: 0,
    actief: true,
  };
  showTourDetail.value = true;
  selectedTour.value = null;
}
const closeTour = () => {
  selectedTour.value = null;
  showTourDetail.value = false;
};

async function saveTour() {
  const method = form.value.id ? "PUT" : "POST";
  const url = form.value.id ? `/api/tours/${form.value.id}` : "/api/tours";

  await fetch(api(url), {
    method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(form.value),
  });

  resetForm();
  fetchTours();
  closeTour();
}

async function deleteTour(id) {
  if (!confirm("Tour verwijderen?")) return;

  await fetch(api(`/tours/${id}`), { method: "DELETE" });
  fetchTours();
}

onMounted(async () => {
  await fetchTours();
});
</script>
