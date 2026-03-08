import { defineStore } from "pinia";
import type { Item } from "shared";
import { findAllItems } from "../services/item";

export const useExplorerStore = defineStore("explorer", {
  state: () => ({
    selected: undefined as number | undefined,
    cut: undefined as number | undefined,
    folders: [] as Item[],
    parentId: undefined as number | undefined,
  }),

  actions: {
    setSelected(id: number | undefined) {
      this.selected = id;
    },
    setCut(id: number | undefined) {
      this.cut = id;
    },
    async loadFolders() {
      this.folders = await findAllItems({
        parent: this.parentId,
        type: "FOLDER",
      });
    },
  },
});
