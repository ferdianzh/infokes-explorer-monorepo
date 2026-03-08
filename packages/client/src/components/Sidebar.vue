<script setup lang="ts">
import SidebarItem from "./SidebarItem.vue";
import { ref, watchEffect } from "vue";
import { useExplorerStore } from "../stores/explorer";
import { storeToRefs } from "pinia";

const { folders } = storeToRefs(useExplorerStore());
const { loadFolders } = useExplorerStore();
const selected = ref<number>(0);
const open = ref<number[]>([0]);

watchEffect(() => {
  loadFolders();
});
</script>

<template>
  <v-navigation-drawer permanent width="400">
    <v-list v-model:opened="open">
      <v-list-group value="0">
        <template v-slot:activator="{ props }">
          <v-list-item
            v-bind="props"
            prepend-icon="mdi-home"
            title="Home"
          ></v-list-item>
        </template>

        <SidebarItem
          v-for="el in folders"
          :data="el"
          :selected="selected"
          :open="open"
        />
      </v-list-group>
    </v-list>
  </v-navigation-drawer>
</template>
