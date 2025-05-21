<template>
  <a-layout style="min-height: 100vh">
    <MainSidebar v-model:collapsed="collapsed" />
    <a-layout>
      <MainHeader
        :collapsed="collapsed"
        @toggleCollapsed="collapsed = !collapsed"
      />
      <a-layout-content>
        <a-breadcrumb :style="{ margin: '16px 16px' }">
          <a-breadcrumb-item>Home</a-breadcrumb-item>
          <a-breadcrumb-item>{{ breadcrumbLabel }}</a-breadcrumb-item>
        </a-breadcrumb>
        <div
          :style="{
            padding: '24px',
            background: '#fff',
            minHeight: '360px',
            margin: '16px 16px',
          }"
        >
          <router-view />
        </div>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script lang="ts" setup>
import { ref, provide } from "vue";
import MainSidebar from "@/components/SideBar/MainSidebar.vue";
import MainHeader from "@/components/Header/MainHeader.vue";

const breadcrumbLabel = ref("List");
provide("breadcrumbLabel", breadcrumbLabel);
const collapsed = ref(false);
</script>
