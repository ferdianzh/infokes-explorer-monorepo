import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { Item, PrismaClient } from "../../generated/prisma/client";
import {
  ItemCreateArgs,
  ItemFindManyArgs,
  ItemFindUniqueArgs,
} from "../../generated/prisma/models";

export class ItemsRepository {
  constructor(
    private prisma = new PrismaClient({
      adapter: new PrismaMariaDb(process.env.DATABASE_URL!),
    }),
  ) {}

  async create(data: ItemCreateArgs): Promise<Item> {
    return await this.prisma.item.create(data);
  }

  async findAll(query: ItemFindManyArgs) {
    return await this.prisma.item.findMany(query);
  }

  async findOne(arg: ItemFindUniqueArgs) {
    return await this.prisma.item.findUnique(arg);
  }

  async update(id: number, data: Partial<Item>) {
    return await this.prisma.item.update({
      where: { id },
      data,
    });
  }

  async delete(id: number) {
    return await this.prisma.item.delete({
      where: { id },
    });
  }
}
