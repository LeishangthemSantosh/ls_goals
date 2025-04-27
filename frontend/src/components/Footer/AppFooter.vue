<template>
      <a-layout-footer style="text-align: center">
        Ant Design ©2018 Created by Ant UED
      </a-layout-footer>
  </template>
  <script setup>
  import { ref } from 'vue';
  const selectedKeys = ref(['2']);
  </script>
  <style scoped>
  .site-layout-content {
    min-height: 280px;
    padding: 24px;
    background: #fff;
  }
.logo {
    float: left;
    width: 120px;
    height: 31px;
    margin: 16px 24px 16px 0;
    background: rgba(255, 255, 255, 0.3);
  }

  </style>