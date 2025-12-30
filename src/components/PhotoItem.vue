<template>
  <div class="group relative">
    <img
      :src="thumbUrl(photo.filename)"
      class="h-24 w-full rounded object-cover" />

    <!-- Drag handle -->
    <div
      class="drag-handle absolute bottom-1 left-1 cursor-move rounded bg-black/60 px-2 py-1 text-xs text-white"
      title="Sleep om te verplaatsen">⇅</div>

    <!-- Cover badge -->
    <span
      v-if="photo.isCover"
      class="absolute bottom-1 left-1 cursor-move rounded bg-black/60 px-2 text-xs text-white">
      Cover
    </span>

    <!-- Acties -->
    <div
      class="absolute right-1 top-1 flex gap-1 opacity-0 group-hover:opacity-100">
      <button
        class="rounded bg-white px-2 text-xs"
        title="Als cover instellen"
        @click="$emit('set-cover', photo.id)">
        ★
      </button>

      <button
        class="rounded bg-black/60 px-2 text-white"
        title="Verwijderen"
        @click="$emit('remove', photo.id)">
        ✕
      </button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  photo: Object,
  thumbUrl: Function,
});

defineEmits(["remove", "set-cover"]);
</script>
