<template>
  <div>
    <a-button type="primary" @click="showModal">
      Open Modal with customized footer
    </a-button>

    <a-modal v-model:open="open" title="Create Goal">
      <div>
        <a-form
          v-if="open"
          ref="formRef"
          :model="formState"
          name="basic"
          :label-col="{ span: 24 }"
          :wrapper-col="{ span: 24 }"
          autocomplete="off"
          @finish="onFinish"
          @finishFailed="onFinishFailed"
        >
          <a-form-item label="Title" :colon="false" name="title">
            <a-input
              v-model:value="formState.title"
              placeholder="Title"
              size="medium"
            />
          </a-form-item>

          <a-form-item label="Category" :colon="false" name="category">
            <a-input
              v-model:value="formState.category"
              placeholder="Category"
              size="medium"
            />
          </a-form-item>

          <a-form-item label="Description" :colon="false" name="description">
            <a-textarea
              v-model:value="formState.description"
              placeholder="Description"
              size="medium"
            />
          </a-form-item>

          <a-form-item label="Target Date" :colon="false" name="targeted_date">
            <a-date-picker
              v-model:value="formState.targeted_date"
              placeholder="Target Date"
              size="medium"
              style="width: 100%"
              value-format="YYYY-MM-DD"
            />
          </a-form-item>
        </a-form>
      </div>

      <template #footer>
        <a-button @click="open = false">Cancel</a-button>
        <a-button type="primary" :loading="loading" @click="handleOk">
          Submit
        </a-button>
      </template>
    </a-modal>
  </div>

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
import { ref, inject, onMounted, reactive } from "vue";
import axios from "axios";
import {
  StarOutlined,
  LikeOutlined,
  MessageOutlined,
} from "@ant-design/icons-vue";

// Breadcrumb
const breadcrumbLabel = inject("breadcrumbLabel");
onMounted(() => {
  breadcrumbLabel.value = "Goals";
  fetchData();
});

// List Data
const listData = ref([]);

async function fetchData() {
  try {
    const url = import.meta.env.VITE_API_BASE_URL + "goals";
    const response = await axios.get(url);
    // Dummy data for testing
    for (let i = 0; i < 5; i++) {
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

// Modal Form
const open = ref(false);
const loading = ref(false);
const formRef = ref();

const formState = reactive({
  title: "",
  category: "",
  description: "",
  targeted_date: null,
});

const showModal = () => {
  open.value = true;
};

const handleOk = () => {
  if (formRef.value) {
    formRef.value.validate().then(onFinish).catch(onFinishFailed);
  }
};

const onFinish = async (values) => {
  loading.value = true;
  const url = import.meta.env.VITE_API_BASE_URL + "goals";

  const response = await axios.post(url, values);

  if (response.data.success) {
    loading.value = false;
    open.value = false;
  }
};

const onFinishFailed = (errorInfo) => {
  console.log("❌ Failed:", errorInfo);
};
</script>

<style>
.ant-form-item-label {
  padding-bottom: 0 !important;
}
.ant-form-item {
  margin-bottom: 10px !important;
}
</style>
