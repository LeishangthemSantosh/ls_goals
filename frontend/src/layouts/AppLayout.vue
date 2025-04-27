<template>
    <a-layout class="layout">
        <AppHeader></AppHeader>
      <a-layout-content style="padding: 0 50px">
        <router-view />
      </a-layout-content>
      <AppFooter></AppFooter>
    </a-layout>
  </template>
  <script setup>
  import AppHeader from '@/components/Header/AppHeader.vue';
  import AppFooter from '@/components/Footer/AppFooter.vue';
  </script>
 