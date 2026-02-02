<template>
  <div class="space-y-4">
    <!-- Foto grid -->
    <draggable
      v-model="photos"
      item-key="id"
      handle=".drag-handle"
      class="grid grid-cols-2 gap-3 sm:grid-cols-4 md:grid-cols-6"
      @end="saveOrder">
      <template #item="{ element }">
        <div
          class="drag-handle group relative overflow-hidden rounded bg-white"
          :class="element.isCover ? 'ring-2 ring-blue-500 order-first' : ''">
          <!-- Thumbnail -->
          <div class="overflow-hidden rounded bg-gray-100">
            <img
              :src="thumbUrl(element.filename)"
              class="h-full w-full object-cover"
              loading="lazy" />
          </div>

          <!-- Drag handle -->
          <button
            class="drag-handle absolute left-1 top-1 cursor-move rounded bg-black/60 px-1 py-0.5 text-xs text-white"
            title="Verslepen">
            ☰
          </button>

          <!-- Cover badge -->
          <span
            v-if="element.isCover"
            class="absolute bottom-1 left-1 rounded bg-blue-600 px-2 py-0.5 text-xs text-white">
            Cover
          </span>

          <!-- Actions -->
          <div
            class="absolute right-1 top-1 flex gap-1 opacity-0 group-hover:opacity-100">
            <button
              class="h-6 w-6 rounded-full bg-green-600 text-xs text-white"
              title="Maak cover"
              @click="setCover(element.id)">
              ★
            </button>

            <button
              class="h-6 w-6 rounded-full bg-red-600 text-xs text-white"
              title="Verwijderen"
              @click="remove(element.id)">
              ✕
            </button>
          </div>
        </div>
      </template>
    </draggable>
    <!-- Upload + Library knop -->
    <div class="flex flex-col justify-between gap-4 sm:flex-row">
      <PhotoUploadInput @upload="upload" />
      <button
        class="rounded border bg-gray-100 px-4 py-2 text-sm hover:bg-gray-200"
        @click="showLibrary = true">
        Kies uit bestaande foto’s
      </button>
    </div>

    <!-- PhotoLibrary modal -->
    <PhotoLibraryModal
      v-if="showLibrary"
      @close="showLibrary = false"
      @select="linkPhotos" />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import draggable from "vuedraggable";
import PhotoUploadInput from "./PhotoUploadInput.vue";
import PhotoLibraryModal from "./PhotoLibraryModal.vue";
import { assetUrl, apiFetch } from "../composables/useApi.js";

const props = defineProps({
  tourId: { type: Number, required: true },
});

const photos = ref([]);
const showLibrary = ref(false);

/* -------------------------
   Helpers
------------------------- */
function thumbUrl(filename) {
  return assetUrl(`/uploads/thumbs/${filename}`);
}

/* -------------------------
   Fetch photos
------------------------- */
async function fetchPhotos() {
  const res = await apiFetch(`/admin/tours/${props.tourId}/photos`);
  photos.value = await res.json();
}

onMounted(fetchPhotos);

/* -------------------------
   Upload nieuwe foto
------------------------- */
async function upload(files) {
  const fd = new FormData();
  files.forEach((f) => fd.append("photos", f));

  await apiFetch(`/admin/tours/${props.tourId}/photos`, {
    method: "POST",
    body: fd,
  });

  fetchPhotos();
}

/* -------------------------
   Link bestaande foto
------------------------- */
async function linkPhotos(photoIds) {
  // console.log("tourId: ", props.tourId);
  await Promise.all(
    photoIds.map((photoId) =>
      apiFetch(`/admin/tours/${props.tourId}/photos/${photoId}/link`, {
        method: "POST",
      })
    )
  );
  showLibrary.value = false;
  fetchPhotos();
}

/* -------------------------
   Cover foto instellen
------------------------- */
async function setCover(photoId) {
  await apiFetch(`/admin/tours/${props.tourId}/photos/${photoId}/cover`, {
    method: "PATCH",
  });

  photos.value.forEach((p) => {
    p.isCover = p.id === photoId;
  });
}

/* -------------------------
   Delete foto
------------------------- */
async function remove(photoId) {
  if (!confirm("Foto verwijderen?")) return;

  await apiFetch(`/admin/tours/${props.tourId}/photos/${photoId}`, {
    method: "DELETE",
  });

  photos.value = photos.value.filter((p) => p.id !== photoId);
}

/* -------------------------
   Save order
------------------------- */
async function saveOrder() {
  const payload = photos.value.map((p, index) => ({
    photoId: p.id,
    volgorde: index + 1,
  }));

  await apiFetch(`/admin/tours/${props.tourId}/photos/order`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
}
</script>
