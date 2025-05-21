<template>
  <a-list
    item-layout="vertical"
    size="large"
    :pagination="pagination"
    :data-source="listData"
  >
    <template #renderItem="{ item }">
      <a-list-item :key="item.title">
        <template #actions>
          <span v-for="{ icon, text } in actions" :key="icon.name">
            <component :is="icon" style="margin-right: 8px" />
            {{ text }}
          </span>
        </template>
        <template #extra>
          <img
            width="272"
            alt="logo"
            src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
          />
        </template>
        <a-list-item-meta :description="item.description">
          <template #title>
            <a :href="item.href">{{ item.title }}</a>
          </template>
          <template #avatar>
            <a-avatar :src="item.avatar" />
          </template>
        </a-list-item-meta>
        {{ item.content }}
      </a-list-item>
    </template>
  </a-list>
</template>

<script setup>
import { ref, inject, onMounted } from "vue";
import axios from "axios";
import {
  StarOutlined,
  LikeOutlined,
  MessageOutlined,
} from "@ant-design/icons-vue";

const breadcrumbLabel = inject("breadcrumbLabel");
onMounted(() => {
  breadcrumbLabel.value = "Goals";
  fetchData();
});

const listData = ref([]);

async function fetchData() {
  try {
    const url = import.meta.env.VITE_API_BASE_URL + "goals";
    const response = await axios.get(url);
    console.log(response.data);
    // Replace below with actual response data as needed
    for (let i = 0; i < 23; i++) {
      listData.value.push({
        href: "https://www.antdv.com/",
        title: `ant design vue part ${i}`,
        avatar: "https://joeschmoe.io/api/v1/random",
        description:
          "Ant Design, a design language for background applications, is refined by Ant UED Team.",
        content:
          "We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.",
      });
    }
  } catch (err) {
    console.error("Failed to fetch goals:", err);
  }
}

const pagination = {
  onChange: (page) => {
    console.log("Page:", page);
  },
  pageSize: 3,
};

const actions = [
  {
    icon: StarOutlined,
    text: "156",
  },
  {
    icon: LikeOutlined,
    text: "156",
  },
  {
    icon: MessageOutlined,
    text: "2",
  },
];
</script>
