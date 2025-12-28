<template>
  <div class="space-y-4">
    <h3 class="font-semibold">Foto’s bij deze tour</h3>

    <div class="grid grid-cols-4 gap-3">
      <div
        v-for="p in photos"
        :key="p.id"
        class="relative group"
      >
        <img
          :src="photoUrl(p.filenaam)"
          class="w-full h-24 object-cover rounded"
        />

        <button
          class="absolute top-1 right-1 bg-black/60 text-white
                 w-6 h-6 rounded-full opacity-0 group-hover:opacity-100"
          @click="remove(p.id)"
        >
          ✕
        </button>
      </div>
    </div>

    <PhotoUploadInput @upload="upload" />
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import PhotoUploadInput from "./PhotoUploadInput.vue";

const props = defineProps({ tourId: Number });
const photos = ref([]);

function photoUrl(name) {
  return `/uploads/resized/${name}`;
}

async function fetchPhotos() {
  const res = await fetch(`/api/tours/${props.tourId}/photos`);
  photos.value = await res.json();
}

async function upload(files) {
  const fd = new FormData();
  files.forEach((f) => fd.append("photos", f));

  await fetch(`/api/tours/${props.tourId}/photos`, {
    method: "POST",
    body: fd,
  });

  fetchPhotos();
}

async function remove(id) {
  if (!confirm("Foto loskoppelen?")) return;
  await fetch(`/api/tours/${props.tourId}/photos/${id}`, {
    method: "DELETE",
  });
  fetchPhotos();
}

onMounted(fetchPhotos);
watch(() => props.tourId, fetchPhotos);
</script>
