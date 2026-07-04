<template>
  <div class="mx-auto max-w-4xl space-y-6 p-6">
    <h1 class="text-2xl font-bold">Systeembeheer</h1>

    <div class="rounded border border-amber-300 bg-amber-50 p-4 text-amber-900">
      <h2 class="font-semibold">Waarschuwing</h2>
      <p class="mt-2 text-sm">
        Deze actie synchroniseert alleen de tabellen tours, photos, tour_categories en tour_photos
        naar productie vanuit jouw lokale omgeving. Gebruik dit alleen als je zeker weet dat dit nodig is.
      </p>
    </div>

    <div class="space-y-3 rounded border bg-white p-4 shadow">
      <label class="block text-sm font-medium" for="confirm">
        Typ exact: SYNC_PRODUCTION_DB
      </label>
      <input
        id="confirm"
        v-model="confirmText"
        class="w-full rounded border p-2"
        placeholder="SYNC_PRODUCTION_DB" />

      <button
        type="button"
        class="rounded bg-red-600 px-4 py-2 font-semibold text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:bg-red-300"
        :disabled="isRunning || confirmText !== requiredToken"
        @click="runSync">
        {{ isRunning ? "Synchroniseren..." : "Synchroniseer database naar productie" }}
      </button>
    </div>

    <div v-if="message" class="rounded border bg-white p-4 shadow">
      <h2 class="font-semibold">Resultaat</h2>
      <p class="mt-2 text-sm">{{ message }}</p>
    </div>

    <div v-if="output" class="rounded border bg-slate-900 p-4 text-slate-100 shadow">
      <h2 class="font-semibold">Log</h2>
      <pre class="mt-2 max-h-[50vh] overflow-auto whitespace-pre-wrap text-xs">{{ output }}</pre>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { apiFetch } from "@/composables/useApi.js";
import { useToast } from "vue-toastification";

const requiredToken = "SYNC_PRODUCTION_DB";

const confirmText = ref("");
const message = ref("");
const output = ref("");
const isRunning = ref(false);

const toast = useToast();

async function runSync() {
  if (confirmText.value !== requiredToken) return;

  const sure = confirm(
      "Weet je zeker dat je de productie tabellen tours/photos/tour_categories/tour_photos wilt overschrijven vanaf lokaal?"
  );
  if (!sure) return;

  isRunning.value = true;
  message.value = "";
  output.value = "";

  try {
    const response = await apiFetch("/admin/system/sync-database", {
      method: "POST",
      body: JSON.stringify({ confirm: requiredToken }),
    });

    const data = await response.json();

    if (!response.ok || !data.ok) {
      throw new Error(data.message || "Synchronisatie mislukt");
    }

    message.value = data.message || "Synchronisatie voltooid.";
    output.value = data.output || "";
    toast.success("Database synchronisatie voltooid");
  } catch (err) {
    message.value = err.message || "Synchronisatie mislukt";
    toast.error("Database synchronisatie mislukt");
  } finally {
    isRunning.value = false;
  }
}
</script>
