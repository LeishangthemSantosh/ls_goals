<template>
  <a-layout-sider
    :collapsed="collapsed"
    :trigger="null"
    collapsible
    @collapse="onCollapse"
  >
    <div class="logo" />
    <a-menu
      v-model:selectedKeys="selectedKeys"
      theme="dark"
      mode="inline"
      @click="handleMenuClick"
    >
      <a-menu-item key="/">
        <user-outlined />
        <span>Dashboard</span>
      </a-menu-item>
      <a-menu-item key="/goals">
        <video-camera-outlined />
        <span>Goals</span>
      </a-menu-item>
      <a-menu-item key="3">
        <upload-outlined />
        <span>Kureban Board</span>
      </a-menu-item>
    </a-menu>
  </a-layout-sider>
</template>

<script lang="ts" setup>
import { ref, defineProps, defineEmits } from "vue";
import { useRouter } from "vue-router";
import {
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from "@ant-design/icons-vue";

const router = useRouter();

const props = defineProps<{
  collapsed: boolean;
}>();
const emit = defineEmits(["update:collapsed"]);

const selectedKeys = ref<string[]>(["1"]);

const onCollapse = (collapsed: boolean) => {
  emit("update:collapsed", collapsed);
};

const handleMenuClick = ({ key }: { key: string }) => {
  router.push(key);
};
</script>

<style scoped>
.logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.3);
  margin: 16px;
}
</style>
