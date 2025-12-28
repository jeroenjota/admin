<template>
  <div class="border-dashed border-2 p-4 rounded text-center">
    <input
      type="file"
      multiple
      accept="image/*"
      class="hidden"
      ref="input"
      @change="onSelect"
    />

    <button
      class="bg-blue-600 text-white px-4 py-2 rounded"
      @click="$refs.input.click()"
    >
      Foto’s toevoegen
    </button>

    <p class="text-sm text-gray-500 mt-2">
      Max 15 foto’s – JPG/PNG
    </p>
  </div>
</template>

<script setup>
const emit = defineEmits(["upload"]);

function onSelect(e) {
  emit("upload", Array.from(e.target.files));
}
</script>
