<template>
  <div class="mx-auto max-w-5xl space-y-6 p-6">
    <h1 class="text-2xl font-bold">Tours onderhoud</h1>

    <!-- Tour lijst -->
    <h2 class="text-xl font-semibold">Bestaande tours</h2>
    <button
      class="rounded bg-green-600 px-4 py-2 text-white"
      @click="resetForm">
      Nieuwe tour
    </button>
    <div class="mb-4 flex items-center justify-between">
      <div>
        <table class="w-full border text-sm">
          <thead class="bg-gray-100">
            <tr>
              <th class="p-2 text-left">Titel</th>
              <th class="p-2">Prijs</th>
              <th class="p-2">Duur</th>
              <th class="p-2">Actief</th>
              <th class="w-32 p-2"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="tour in tours" :key="tour.id" class="border-t">
              <td class="p-2">{{ tour.title }}</td>
              <td class="p-2 text-center">€ {{ tour.price }}</td>
              <td class="p-2 text-center">{{ tour.duration }} uur</td>
              <td class="p-2 text-center">
                <span :class="tour.active ? 'text-green-600' : 'text-gray-400'">
                  {{ tour.active ? "Ja" : "Nee" }}
                </span>
              </td>
              <td class="flex gap-2 p-2">
                <button class="text-blue-600" @click="editTour(tour)">
                  Bewerken
                </button>
                <button class="text-red-600" @click="deleteTour(tour.id)">
                  Verwijderen
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <TourEdit
        :form="form"
        @saved="fetchTours"
        v-if="showTourDetail"
        :key="selectedTour?.id"
        :tour="selectedTour"
        @close="closeTour" />
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import { api } from "../../composables/useApi.js";
import TourEdit from "./TourEdit.vue";
const selectedTour = ref(null);
const showTourDetail = ref(false);
const tours = ref([]);
const form = ref({
  id: null,
  title: "",
  description: "",
  content: "",
  price: null,
  pprice: null,
  duration: null,
  active: true,
  maxpers: null,
  discount: null,
  rating: 4.5,
  showorder: null,
});

async function fetchTours() {
  const res = await fetch(api("/tours"));
  const json = await res.json();
  tours.value = json.data;
}

function editTour(tour) {
  selectedTour.value = tour;
  console.log("Editing tour:", tour);
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
  const url = form.value.id ? api(`/api/tours/${form.value.id}`) : aps("/api/tours");

  await fetch(url, {
    method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(form.value),
  });

  resetForm();
  fetchTours();
}

async function deleteTour(id) {
  if (!confirm("Tour verwijderen?")) return;

  await fetch(api(`/tours/${id}`), { method: "DELETE" });
  fetchTours();
}

onMounted(fetchTours);
</script>
