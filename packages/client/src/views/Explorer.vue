<script setup lang="ts">
import { computed, ref, watch } from "vue";
import Toolbar from "../components/Toolbar.vue";
import Sidebar from "../components/Sidebar.vue";
import Main from "../components/Main.vue";
import type { Item } from "shared";
import { findAllItems } from "../services/item";
import { useRoute } from "vue-router";
import { watchDebounced } from "@vueuse/core";

interface IRoute {
  title: string;
  value: number;
  disabled: boolean;
}
const homeRoute: IRoute = {
  title: "Home",
  value: 0,
  disabled: false,
};

const route = useRoute();
const parentId = computed(() => {
  const folders = (route.params.folders as string[]) || [];
  return folders.length ? Number(folders.slice(-1)[0]) : undefined;
});

const routes = ref<IRoute[]>([homeRoute]);
const data = ref<Item[]>([]);
const search = ref<string>();

const handleGetData = () => {
  findAllItems({ parent: parentId.value, search: search.value }).then(
    (res: Item[]) => {
      data.value = res;
    },
  );
};

watch(
  () => route.params.folders,
  () => {
    handleGetData();
  },
  { immediate: true },
);

watchDebounced(
  search,
  () => {
    handleGetData();
  },
  { debounce: 400 },
);
</script>

<template>
  <v-layout>
    <Toolbar :routes="routes" :onRefresh="handleGetData" v-model="search" />
    <Sidebar />

    <v-main>
      <v-container>
        <Main :data="data" />
      </v-container>
    </v-main>
  </v-layout>
</template>
