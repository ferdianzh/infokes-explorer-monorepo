<script setup lang="ts">
import type { Item } from "shared";
import { formatDate } from "../utils/date";
import { useRoute, useRouter } from "vue-router";
import { useExplorerStore } from "../stores/explorer";
import { storeToRefs } from "pinia";

const { data } = defineProps<{ data: Item[] }>();

const router = useRouter();
const route = useRoute();
const { setSelected } = useExplorerStore();
const { selected } = storeToRefs(useExplorerStore());

const openFolder = (item: Item) => {
  router.push(`${route.fullPath}/${item.id}`);
};
</script>

<template>
  <v-table class="bg-transparent">
    <thead>
      <tr>
        <th class="text-left">Name</th>
        <th class="text-left">Type</th>
        <th class="text-left">Date Modified</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="item in data"
        :key="item.id"
        :class="selected === item.id && 'selected'"
        @click="setSelected(item.id)"
        @dblclick="item.type === 'FOLDER' && openFolder(item)"
      >
        <td>
          <v-icon
            class="mr-2"
            :icon="item.type === 'FOLDER' ? 'mdi-folder' : 'mdi-file'"
          ></v-icon
          >{{ item.name }}
        </td>
        <td>{{ item.type }}</td>
        <td>{{ formatDate(item.updatedAt) }}</td>
      </tr>
    </tbody>
  </v-table>

  <div v-if="!data?.length" class="my-3 ml-4">Folder is empty</div>
</template>

<style>
.v-table tbody tr:hover {
  background: rgba(255, 255, 255, 0.05);
  cursor: pointer;
}
.selected {
  background: rgba(255, 255, 255, 0.05);
}
</style>
