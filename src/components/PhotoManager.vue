<template>
  <div class="space-y-4">
    <h3 class="font-semibold">Foto’s bij deze tour</h3>

    <draggable
      v-model="photos"
      item-key="id"
      handle=".drag-handle"
      class="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6"
      @end="saveOrder"
    >
      <template #item="{ element }">
        <div
          class="group relative overflow-hidden rounded border bg-white"
          :class="element.isCover ? 'order-first ring-2 ring-blue-500' : ''"
        >
          <!-- thumbnail -->
          <img
            :src="thumbUrl(element.filename)"
            class="h-full w-full object-cover"
          />

          <!-- drag handle -->
          <button
            class="drag-handle absolute left-1 top-1 cursor-move rounded bg-black/60 px-1 py-0.5 text-xs text-white"
            title="Verslepen"
          >
            ☰
          </button>

          <!-- cover badge -->
          <span
            v-if="element.isCover"
            class="absolute bottom-1 left-1 rounded bg-blue-600 px-2 py-0.5 text-xs text-white"
          >
            Cover
          </span>

          <!-- actions -->
          <div
            class="absolute right-1 top-1 flex gap-1 opacity-0 group-hover:opacity-100"
          >
            <button
              class="h-6 w-6 rounded-full bg-green-600 text-xs text-white"
              title="Maak cover"
              @click="setCover(element.id)"
            >
              ★
            </button>

            <button
              class="h-6 w-6 rounded-full bg-red-600 text-xs text-white"
              title="Verwijderen"
              @click="remove(element.id)"
            >
              ✕
            </button>
          </div>
        </div>
      </template>
    </draggable>

    <PhotoUploadInput @upload="upload" />
  </div>
</template>



<script setup>
import { ref, onMounted } from "vue";
import draggable from "vuedraggable";
import PhotoUploadInput from "./PhotoUploadInput.vue";
import {api} from "../composables/useApi.js"

const props = defineProps({
  tourId: { type: Number, required: true }
});

const photos = ref([]);

/* -------------------------
   Fetch
------------------------- */
async function fetchPhotos() {
  const res = await fetch(`/api/tours/${props.tourId}/photos`);
  photos.value = await res.json();
}

onMounted(fetchPhotos);

/* -------------------------
   Helpers
------------------------- */
function thumbUrl(filename) {
  return api(`/uploads/thumbs/${filename}`);
}

/* -------------------------
   Upload
------------------------- */
async function upload(files) {
  const fd = new FormData();
  files.forEach(f => fd.append("photos", f));

  await fetch(`/api/tours/${props.tourId}/photos`, {
    method: "POST",
    body: fd
  });

  fetchPhotos();
}

/* -------------------------
   Cover
------------------------- */
async function setCover(photoId) {
  await fetch(`/api/tours/${props.tourId}/photos/${photoId}/cover`, {
    method: "PATCH"
  });

  photos.value.forEach(p => {
    p.isCover = p.id === photoId;
  });
}

/* -------------------------
   Order
------------------------- */
async function saveOrder() {
  const payload = photos.value.map((p, index) => ({
    photoId: p.id,
    volgorde: index + 1
  }));

  await fetch(`/api/tours/${props.tourId}/photos/order`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
}

/* -------------------------
   Delete
------------------------- */
async function remove(photoId) {
  if (!confirm("Foto verwijderen?")) return;

  await fetch(`/api/photos/${photoId}`, {
    method: "DELETE"
  });

  photos.value = photos.value.filter(p => p.id !== photoId);
}
</script>
