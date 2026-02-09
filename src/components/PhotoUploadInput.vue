<!-- PhotoUploadInput.vue -->
<template>
  <div class="rounded text-center">
    <input
      type="file"
      multiple
      accept="image/*"
      class="hidden"
      ref="fileInput"
      @change="onSelect" />

    <button
      class="rounded border bg-blue-500 px-4 py-2 text-sm text-white hover:bg-blue-600"
      @click="openFileDialog">
      Upload
    </button>

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
