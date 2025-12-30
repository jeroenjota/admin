<template>
  <div class="fixed inset-0 flex items-center justify-center bg-black/50">
    <div class="max-h-[80vh] w-[800px] overflow-auto rounded bg-white p-4">
      <h3 class="mb-4 font-semibold">Kies bestaande foto’s</h3>

      <div class="grid grid-cols-6 gap-3">
        <div
          v-for="p in library"
          :key="p.id"
          class="cursor-pointer"
          @click="$emit('select', p.id)"
        >
          <img
            :src="thumbUrl(p.filename)"
            class="h-24 w-full rounded object-cover"
          />
        </div>
      </div>

      <button class="mt-4 text-sm underline" @click="$emit('close')">
        Sluiten
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const emit = defineEmits(["close", "select"]);

const library = ref([]);

function thumbUrl(filename) {
  return api(`/uploads/thumbs/${filename}`);
}

async function fetchLibrary() {
  const res = await fetch("/api/photos/library");
  library.value = await res.json();
}

onMounted(fetchLibrary);
</script>
