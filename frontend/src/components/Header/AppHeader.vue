<template>
    <a-layout-header class="app-header">
      <div class="header-container">
        <!-- Left: Logo/Icon -->
        <div class="left-section">
          <div class="logo" />
        </div>
  
        <!-- Center: Menu -->
        <div class="center-section">
          <a-menu
            v-model:selectedKeys="selectedKeys"
            mode="horizontal"
            theme="light"
            :style="{ lineHeight: '64px', borderBottom: 'none' }"
          >
            <a-menu-item key="1">Dashboard</a-menu-item>
            <a-menu-item key="2">Tasks</a-menu-item>
            <a-menu-item key="3">Reports</a-menu-item>
          </a-menu>
        </div>
  
        <!-- Right: Profile/Settings -->
        <div class="right-section">
          <a-space size="middle">
            <a-button type="text" shape="circle" icon>
              <setting-outlined />
            </a-button>
            <a-button type="text" shape="circle" icon>
              <user-outlined />
            </a-button>
          </a-space>
        </div>
      </div>
    </a-layout-header>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { UserOutlined, SettingOutlined } from '@ant-design/icons-vue'
  
  const selectedKeys = ref(['2'])
  </script>
  
  <style scoped>
  .app-header {
    background: #ffffff;
    padding: 0 24px;
    box-shadow: 0 2px 8px #f0f1f2;
  }
  .header-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 100%;
  }
  .left-section .logo {
    width: 120px;
    height: 31px;
    background: rgba(43, 40, 40, 0.3);
  }
  .center-section {
    flex: 1;
    display: flex;
    justify-content: center;
  }
  .right-section {
    display: flex;
    align-items: center;
  }
  </style>
  