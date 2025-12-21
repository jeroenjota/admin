<template>
  <div>
    <h2 class="font-semibold mb-2">Foto’s</h2>

    <input type="file" multiple @change="upload" />

    <div class="grid grid-cols-4 gap-2 mt-4">
      <div
        v-for="foto in fotos"
        :key="foto.id"
        class="relative"
      >
        <img :src="foto.url" />
        <button @click="remove(foto.id)">✕</button>
      </div>
    </div>
  </div>
</template>
