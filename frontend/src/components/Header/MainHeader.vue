<!-- src/components/AppHeader.vue -->
<template>
    <a-layout-header style="background: #fff; padding: 0">
      <menu-unfold-outlined
        v-if="collapsed"
        class="trigger"
        @click="toggle"
      />
      <menu-fold-outlined
        v-else
        class="trigger"
        @click="toggle"
      />
    </a-layout-header>
  </template>
  
  <script lang="ts" setup>
  import { defineProps, defineEmits } from 'vue';
  import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
  } from '@ant-design/icons-vue';
  
  const props = defineProps<{
    collapsed: boolean;
  }>();
  const emit = defineEmits<{
    (e: 'toggleCollapsed'): void;
  }>();
  
  const toggle = () => {
    emit('toggleCollapsed');
  };
  </script>
  
  <style scoped>
  .trigger {
    font-size: 18px;
    line-height: 64px;
    padding: 0 24px;
    cursor: pointer;
    transition: color 0.3s;
  }
  .trigger:hover {
    color: #1890ff;
  }
  </style>
  