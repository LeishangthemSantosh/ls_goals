<!-- src/layouts/MainLayout.vue -->
<template>
  <a-layout style="min-height: 100vh;">
    <MainSidebar v-model:collapsed="collapsed"  />
    <a-layout>
      <MainHeader :collapsed="collapsed" @toggleCollapsed="collapsed = !collapsed" />
      <a-layout-content :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '280px' }">
        <router-view />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import MainSidebar from '@/components/SideBar/MainSidebar.vue';
import MainHeader from '@/components/Header/MainHeader.vue';

const collapsed = ref(false);
</script>
