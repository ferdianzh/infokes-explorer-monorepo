import { ItemQuery } from "shared";
import { Item } from "../../generated/prisma/client";
import { ItemCreateDto, ItemUpdateDto } from "./items.dto";
import { ItemsRepository } from "./items.repository";

export class ItemsService {
  constructor(private itemsRepository = new ItemsRepository()) {}

  async create(data: ItemCreateDto): Promise<Item> {
    try {
      return await this.itemsRepository.create({
        data,
      });
    } catch (error) {
      throw new Error(`Failed to create item: ${error}`);
    }
  }

  async findAll({
    order,
    sort,
    search,
    parent,
    type,
  }: ItemQuery): Promise<Item[]> {
    const parentId = parent ? Number(parent) : null;
    try {
      const data = await this.itemsRepository.findAll({
        where: {
          name: {
            contains: search,
          },
          parentId,
          type,
        },
        orderBy: order && {
          [order]: sort,
        },
      });
      return data;
    } catch (error) {
      throw new Error(`Failed to fetch items: ${error}`);
    }
  }

  async findOne(id: number): Promise<Item | null> {
    try {
      return await this.itemsRepository.findOne({
        where: { id },
        include: {
          parent: true,
        },
      });
    } catch (error) {
      throw new Error(`Failed to fetch item: ${error}`);
    }
  }

  async update(id: number, data: ItemUpdateDto): Promise<Item> {
    try {
      return await this.itemsRepository.update(id, data);
    } catch (error) {
      throw new Error(`Failed to update item: ${error}`);
    }
  }

  async delete(id: number): Promise<Item> {
    try {
      return await this.itemsRepository.delete(id);
    } catch (error) {
      throw new Error(`Failed to delete item: ${error}`);
    }
  }
}

export const itemsService = new ItemsService();
