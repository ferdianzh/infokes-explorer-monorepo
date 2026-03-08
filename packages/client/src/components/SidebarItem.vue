<script setup lang="ts">
import type { Item } from "shared";
import { ref, watchEffect } from "vue";
import { findAllItems } from "../services/item";

const { data, selected, open } = defineProps<{
  data: Item;
  selected: number;
  open: number[];
}>();
const children = ref<Item[]>([]);

watchEffect(() => {
  findAllItems({ parent: data.id, type: "FOLDER" }).then((res) => {
    children.value = res;
  });
});
</script>

<template>
  <v-list-group :value="data.id" @click="">
    <template v-slot:activator="{ props }">
      <v-list-item
        v-bind="props"
        prepend-icon="mdi-folder"
        :append-icon="children.length ? undefined : ''"
        :title="data.name"
      ></v-list-item>
    </template>

    <SidebarItem
      v-for="el in children"
      :data="el"
      :selected="selected"
      :open="open"
    />
  </v-list-group>
</template>
