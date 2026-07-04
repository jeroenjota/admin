<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
       @click.self="$emit('close')">

    <div class="w-200 max-h-[80vh] overflow-auto rounded bg-white p-4">

      <!-- Header -->
      <div class="mb-4 flex items-center justify-between">
        <h3 class="text-lg font-semibold">
          Kies bestaande foto’s
        </h3>
        <button @click="$emit('close')">✕</button>
      </div>

      <!-- Grid -->
      <div class="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6">
        <div
          v-for="p in filteredLibrary"
          :key="p.id"
          class="group relative cursor-pointer"
          @click="toggle(p.id)"
        >
          <div class="overflow-hidden rounded">
            <img
              :src="thumbUrl(p.filename)"
              class="h-full w-full object-cover"
            />
          </div>

          <!-- selectie overlay -->
          <div
            v-if="selectedIds.includes(p.id)"
            class="absolute inset-0 flex items-center justify-center bg-blue-600/40 text-xl text-white"
          >
            ✓
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div class="mt-4 flex items-center justify-between">
        <span class="text-sm text-gray-500">
          {{ selectedIds.length }} geselecteerd
        </span>

        <button
          class="rounded bg-blue-600 px-4 py-2 text-white disabled:opacity-50"
          :disabled="!selectedIds.length"
          @click="confirm"
        >
          Toevoegen
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { assetUrl, apiFetch} from "../composables/useApi.js"
const props = defineProps({
  isCategory: {
    type: Boolean,
    required: false,
    withDefaults: false
  },
});

const emit = defineEmits(["close", "select"]);

const library = ref([]);
const selectedIds = ref([]);
const singlePhoto = ref(null);
const search = ref("");

/* ---------- filtering ---------- */
const filteredLibrary = computed(() => {
  if (!search.value) return library.value;

  return library.value.filter(p =>
    p.filename.toLowerCase().includes(search.value.toLowerCase())
  );
});

/* ---------- selectie ---------- */
function toggle(id) {
  if (props.isCategory) {
    singlePhoto.value = library.value.find(p => p.id === id).filename;
    emit("select", singlePhoto.value);
    return;
  }
  if (selectedIds.value.includes(id)) {
    selectedIds.value = selectedIds.value.filter(x => x !== id);
  } else {
    selectedIds.value.push(id);
  }
}

function confirm() {
  emit("select", selectedIds.value);
}

/* ---------- helpers ---------- */
function thumbUrl(filename) {
  return assetUrl(`/uploads/thumbs/${filename}`);
}

/* ---------- data ophalen ---------- */
async function fetchLibrary() {
  const res = await apiFetch(`/admin/photos`)
  library.value = await res.json();
}

onMounted(fetchLibrary);
</script>

