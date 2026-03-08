<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { createItem, deleteItem, updateItem } from "../services/item";
import { useRoute } from "vue-router";
import { useExplorerStore } from "../stores/explorer";
import { storeToRefs } from "pinia";

const { onRefresh } = defineProps<{ onRefresh: () => void }>();
const search = defineModel<string>();

const route = useRoute();
const parentId = computed(() => {
  const folders = (route.params.folders as string[]) || [];
  return folders.length ? Number(folders.slice(-1)[0]) : undefined;
});
const { loadFolders, setSelected, setCut } = useExplorerStore();
const { selected, cut } = storeToRefs(useExplorerStore());

const type = ref<"FILE" | "FOLDER">();
const loading = ref<boolean>(false);
const name = ref<string>();

const handleSubmit = () => {
  loading.value = true;
  createItem({
    name: name.value,
    type: type.value,
    parentId: parentId.value,
  })
    .then(() => {
      onRefresh();
      name.value = "";
      loadFolders();
    })
    .finally(() => {
      loading.value = false;
    });
};

const handleDelete = () => {
  deleteItem(selected.value!).then(() => {
    setSelected(undefined);
    onRefresh();
    loadFolders();
  });
};

const handleCut = () => {
  setCut(selected.value);
  setSelected(undefined);
};

const handlePaste = () => {
  updateItem(cut.value!, { parentId: parentId.value || null }).then(() => {
    setCut(undefined);
    onRefresh();
    loadFolders();
  });
};

watch(
  () => route.params.folders,
  () => {
    setSelected(undefined);
  },
);
</script>

<template>
  <v-app-bar height="100" class="px-2">
    <div class="d-flex align-center ga-2">
      <v-speed-dial location="bottom center" transition="slide-y-transition">
        <template v-slot:activator="{ props: activatorProps }">
          <v-btn v-bind="activatorProps" prepend-icon="mdi-plus">
            Create
          </v-btn>
        </template>
        <div class="d-flex flex-column align-start">
          <v-dialog max-width="340">
            <template v-slot:activator="{ props: activatorProps }">
              <v-btn
                key="1"
                prepend-icon="mdi-folder"
                v-bind="activatorProps"
                @click="type = 'FOLDER'"
                >Folder</v-btn
              >
              <v-btn
                key="2"
                prepend-icon="mdi-file"
                v-bind="activatorProps"
                @click="type = 'FILE'"
                >File</v-btn
              >
            </template>

            <template v-slot:default="{ isActive }">
              <v-card
                :prepend-icon="`mdi-${type?.toLowerCase()}`"
                :title="`Create ${type?.toLowerCase()}`"
              >
                <v-text-field
                  label="Name"
                  class="mx-2"
                  v-model="name"
                ></v-text-field>
                <template v-slot:actions>
                  <v-spacer></v-spacer>
                  <v-btn @click="isActive.value = false"> Cancel </v-btn>
                  <v-btn
                    @click="
                      handleSubmit();
                      isActive.value = false;
                    "
                    color="primary"
                    :loading="loading"
                  >
                    Save
                  </v-btn>
                </template>
              </v-card>
            </template>
          </v-dialog>
        </div>
      </v-speed-dial>

      <v-divider vertical />

      <v-btn
        icon="mdi-content-cut"
        density="comfortable"
        :disabled="!selected"
        @click="handleCut"
      />
      <v-badge content="1" :model-value="Boolean(cut)">
        <v-btn
          icon="mdi-content-paste"
          density="comfortable"
          :disabled="!cut"
          @click="handlePaste"
        />
      </v-badge>
      <v-btn
        icon="mdi-delete"
        density="comfortable"
        :disabled="!selected"
        @click="handleDelete"
      />

      <v-text-field
        append-inner-icon="mdi-magnify"
        density="compact"
        label="Search templates"
        variant="outlined"
        hide-details
        single-line
        width="500"
        :loading="loading"
        v-model="search"
      ></v-text-field>
    </div>
  </v-app-bar>
</template>
