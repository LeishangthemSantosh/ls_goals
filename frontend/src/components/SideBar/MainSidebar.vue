<template>
    <a-layout-sider
      :collapsed="collapsed"
      :trigger="null"
      collapsible
      @collapse="onCollapse"
    >
      <div class="logo" />
      <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline">
        <a-menu-item key="1">
          <user-outlined />
          <span>Dashboard</span>
        </a-menu-item>
        <a-menu-item key="2">
          <video-camera-outlined />
          <span>Tasks</span>
        </a-menu-item>
        <a-menu-item key="3">
          <upload-outlined />
          <span>Kureban Board</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
  </template>
  
  <script lang="ts" setup>
  import { ref, defineProps, defineEmits } from 'vue';
  import {
    UserOutlined,
    VideoCameraOutlined,
    UploadOutlined,
  } from '@ant-design/icons-vue';
  
  const props = defineProps<{
    collapsed: boolean;
  }>();
  const emit = defineEmits(['update:collapsed']);
  
  const selectedKeys = ref<string[]>(['1']);
  
  const onCollapse = (collapsed: boolean) => {
    emit('update:collapsed', collapsed);
  };
  </script>
  
  <style scoped>
  .logo {
    height: 32px;
    background: rgba(255, 255, 255, 0.3);
    margin: 16px;
  }
  </style>
  