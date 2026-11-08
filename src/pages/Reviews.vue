<template>
  <h1 class="mb-4 text-2xl font-bold">Reviews</h1>
  <p v-if="loading" role="status">Reviews laden...</p>
  <p v-if="loadError" role="alert" class="mb-4 text-red-700">{{ loadError }}</p>

  <form
    class="mb-6 max-w-5xl space-y-4 rounded bg-white p-6 shadow"
    @submit.prevent="saveReview">
    <h2 class="text-xl font-semibold">{{ form.id ? "Review wijzigen" : "Review toevoegen" }}</h2>
    <label class="block">
      <span class="mb-1 block">Tour</span>
      <select v-model="form.tourId" required class="w-full rounded border p-2">
        <option :value="null" disabled>Selecteer een tour</option>
        <option v-for="tour in tours" :key="tour.id" :value="tour.id">{{ tour.title }}</option>
      </select>
    </label>
<div class="flex flex-wrap gap-2" >
  
      <label class="block">
        <span class="mb-1 block">Datum van de tour</span>
        <input v-model="form.tourDate" type="date" required class="w-full rounded border p-2" />
      </label>
      <label class="block">
        <span class="mb-1 block">Datum van de review</span>
        <input v-model="form.reviewDate" type="date" required class="w-full rounded border p-2" />
      </label>
      <label class="block">
        <span class="mb-1 block">Voornaam reviewer</span>
        <input v-model="form.firstName" required maxlength="100" class="w-full rounded border p-2" />
      </label>
      <label class="block">
        <span class="mb-1 block">Aantal sterren</span>
        <select v-model="form.stars" required class="w-full rounded border p-2">
          <option :value="null" disabled>Selecteer het aantal sterren</option>
          <option v-for="stars in [0, 1, 2, 3, 4, 5]" :key="stars" :value="stars">
            {{ stars }} / 5
          </option>
        </select>
      </label>
</div>
    <label class="block">
      <span class="mb-1 block">Reviewtekst</span>
      <textarea v-model="form.content" required maxlength="10000" rows="5" class="w-full rounded border p-2"></textarea>
    </label>
    <p class="text-sm text-gray-600">Na opslaan verschijnt de review direct op de website.</p>
    <div class="flex gap-3">
      <button
        type="submit"
        :disabled="loading || busy || !!loadError"
        class="rounded bg-blue-600 px-4 py-2 text-white disabled:opacity-50">
        {{ busy ? "Bezig..." : "Opslaan" }}
      </button>
      <button
        v-if="form.id"
        type="button"
        :disabled="busy"
        class="rounded border px-4 py-2"
        @click="resetForm">
        Annuleren
      </button>
    </div>
  </form>

  <p v-if="!loading && !loadError && !reviews.length">Nog geen reviews.</p>
  <ul class="space-y-4">
    <li v-for="review in reviews" :key="review.id" class="rounded bg-white p-4 shadow">
      <h2 class="text-lg font-semibold">{{ review.tourTitle }}</h2>
      <p class="text-sm text-gray-600">
        Tour: <time :datetime="review.tourDate">{{ review.tourDate }}</time>
        &mdash; 
        &mdash; {{ review.firstName }}
      </p>
      <p class="text-sm text-gray-600">
        {{ review.stars === null ? "Nog geen sterrenscore ingevuld" : `${review.stars} / 5 sterren` }}
      </p>
      <p class="my-3 whitespace-pre-wrap break-words">{{ review.content }}</p>
      <div class="flex gap-3">
        <button type="button" :disabled="busy" class="rounded bg-blue-600 px-3 py-1 text-white" @click="editReview(review)">
          Wijzigen
        </button>
        <button type="button" :disabled="busy" class="rounded bg-red-600 px-3 py-1 text-white" @click="deleteReview(review)">
          Verwijderen
        </button>
      </div>
    </li>
  </ul>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useToast } from "vue-toastification";
import { apiFetch } from "@/composables/useApi.js";

const toast = useToast();
const reviews = ref([]);
const tours = ref([]);
const loading = ref(true);
const loadError = ref("");
const busy = ref(false);
const emptyForm = () => ({ id: null, tourId: null, tourDate: "", reviewDate: "", firstName: "", content: "", stars: null });
const form = ref(emptyForm());

function resetForm() {
  form.value = emptyForm();
}

function editReview(review) {
  form.value = { ...review };
}

async function request(path, options) {
  const response = await apiFetch(path, options);
  const json = await response.json();
  if (!response.ok) throw new Error(json.error || `Request failed: ${response.status}`);
  return json;
}

async function loadReviews() {
  reviews.value = await request("/admin/reviews");
}

async function saveReview() {
  if (busy.value) return;
  busy.value = true;
  try {
    const { id, tourId, tourDate, reviewDate, firstName, content, stars } = form.value;
    const saved = await request(id ? `/admin/reviews/${id}` : "/admin/reviews", {
      method: id ? "PUT" : "POST",
      body: JSON.stringify({ tourId, tourDate, reviewDate, firstName, content, stars }),
    });
    reviews.value = [...reviews.value.filter(review => review.id !== saved.id), saved]
      .sort((a, b) => b.tourDate.localeCompare(a.tourDate) || b.id - a.id);
    resetForm();
    toast.success("Review opgeslagen");
  } catch (error) {
    toast.error("Review opslaan mislukt: " + error.message);
  } finally {
    busy.value = false;
  }
}

async function deleteReview(review) {
  if (busy.value || !window.confirm(`Review van ${review.firstName} verwijderen?`)) return;
  busy.value = true;
  try {
    await request(`/admin/reviews/${review.id}`, { method: "DELETE" });
    reviews.value = reviews.value.filter(item => item.id !== review.id);
    if (form.value.id === review.id) resetForm();
    toast.success("Review verwijderd");
  } catch (error) {
    toast.error("Review verwijderen mislukt: " + error.message);
  } finally {
    busy.value = false;
  }
}

onMounted(async () => {
  try {
    await Promise.all([
      loadReviews(),
      request("/admin/tours").then(result => { tours.value = result; }),
    ]);
  } catch (error) {
    loadError.value = "Reviews laden mislukt: " + error.message;
    toast.error(loadError.value);
  } finally {
    loading.value = false;
  }
});
</script>
