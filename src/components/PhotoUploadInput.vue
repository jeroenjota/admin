<!-- PhotoUploadInput.vue -->
<template>
  <div class="rounded border-2 border-dashed p-4 text-center">
    <input
      type="file"
      multiple
      accept="image/*"
      class="hidden"
      ref="fileInput"
      @change="onSelect" />

    <button
      class="rounded bg-blue-600 px-4 py-2 text-white"
      @click="openFileDialog">
      Nieuwe foto’s
    </button>

    <p class="mt-2 text-sm text-gray-500">Max 25 foto’s – JPG/PNG (max 12Mb)</p>
  </div>
</template>

<script setup>
import { ref } from "vue";

const emit = defineEmits(["upload"]);
const fileInput = ref(null);

function openFileDialog() {
  fileInput.value.click();
}

function onSelect(e) {
  emit("upload", Array.from(e.target.files));
  e.target.value = null;
}
</script>
