<template>
  <router-view />
</template>

<script setup>
import { useAuthStore } from "./stores/auth.store";
const auth = useAuthStore();
auth.loadFromStorage();
</script>
