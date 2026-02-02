<template>
  <div class="w-full max-w-xl space-y-4">
    <!-- Upload button -->
    <label
      class="flex h-32 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:border-blue-500"
    >
      <span class="text-sm text-gray-600">
        Klik of sleep foto’s hierheen
      </span>
      <input
        type="file"
        multiple
        accept="image/*"
        class="hidden"
        @change="onFilesSelected"
      />
    </label>

    <!-- Previews -->
    <div v-if="previews.length" class="grid grid-cols-3 gap-3">
      <div
        v-for="(img, index) in previews"
        :key="index"
        class="group relative"
      >
        <img
          :src="img.url"
          class="h-24 w-full rounded object-cover"
        />

        <button
          @click="removeImage(index)"
          class="absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-black/60 text-white opacity-0 group-hover:opacity-100"
        >
          ✕
        </button>
      </div>
    </div>

    <!-- Upload -->
    <button
      @click="upload"
      :disabled="uploading || !files.length"
      class="rounded bg-blue-600 px-4 py-2 text-white disabled:bg-gray-400"
    >
      {{ uploading ? "Uploaden..." : `Upload ${files.length} foto’s` }}
    </button>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { assetUrl , apiFetch} from "@/composables/useApi.js";

const files = ref([]);
const previews = ref([]);
const uploading = ref(false);

function onFilesSelected(e) {
  const selected = Array.from(e.target.files);
  console.log("Geselecteerde bestanden:", selected.length);
  if (selected.length > 20) {
    return alert("Je kunt maximaal 20 foto's tegelijk uploaden.");
  }
  selected.forEach((file) => {
    files.value.push(file);
    previews.value.push({
      file,
      url: URL.createObjectURL(file),
    });
  });
}

function removeImage(index) {
  URL.revokeObjectURL(previews.value[index].url);
  previews.value.splice(index, 1);
  files.value.splice(index, 1);
}

async function upload() {
  uploading.value = true;

  const formData = new FormData();
  files.value.forEach((file) => {
    formData.append("photos", file);
  });
  console.log("Uploading", files.value);
  try {
    await apiFetch("/upload", {
      method: "POST",
      body: formData,
    });
    console.log("Upload geslaagd");
    // reset
    previews.value.forEach((p) => URL.revokeObjectURL(p.url));
    previews.value = [];
    files.value = [];
  } catch (err) {
    console.error("Upload mislukt", err);
  } finally {
    uploading.value = false;
  }
}
</script>
