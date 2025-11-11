<template>
  <div class="flex flex-col items-center gap-4">
    <button
      @click="monoStore.linkAccount"
      :disabled="mono.isLinking"
      class="bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 shadow-md transition disabled:opacity-50"
    >
      🔗 {{ mono.isLinking ? "Connecting..." : "Sync Bank Account" }}
    </button>

    <button
      @click="mono.syncTransactions"
      :disabled="mono.isSyncing"
      class="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 shadow-md transition disabled:opacity-50"
    >
      🔄 {{ mono.isSyncing ? "Syncing..." : "Import Transactions" }}
    </button>
  </div>
</template>

<script setup>
import { useMonoStore } from "../stores/mono";
const monoStore = useMonoStore();
</script>
