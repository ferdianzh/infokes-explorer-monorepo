export interface Item {
  id: number;
  name: string;
  type: "FILE" | "FOLDER";
  parentId?: number | null;
  createdAt: string;
  updatedAt: string;
}

export interface ItemQuery {
  order?: "name" | "createdAt" | "updatedAt";
  sort?: "asc" | "desc";
  search?: string;
  parent?: number;
  type?: "FOLDER" | "FILE";
}
