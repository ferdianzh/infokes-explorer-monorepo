import axios from "axios";
import type { Item, ItemQuery } from "shared";

const apiUrl = "http://localhost:3001/api/items";

export const findAllItems = async (params?: ItemQuery) => {
  try {
    const res = await axios.get(apiUrl, { params });
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const createItem = async (data: Partial<Item>) => {
  try {
    const res = await axios.post(apiUrl, data);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const updateItem = async (id: number, data: Partial<Item>) => {
  try {
    const res = await axios.patch(`${apiUrl}/${id}`, data);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const deleteItem = async (id: number) => {
  try {
    const res = await axios.delete(`${apiUrl}/${id}`);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};
