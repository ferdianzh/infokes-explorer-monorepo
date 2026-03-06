import { Elysia, t } from "elysia";
import { itemsService } from "../items/items.service";
import { ItemCreateDto, ItemUpdateDto } from "./items.dto";

export const itemsController = new Elysia({ prefix: "/api/items" })
  .post(
    "/",
    async ({ body }: { body: ItemCreateDto }) => {
      return await itemsService.create(body);
    },
    {
      body: ItemCreateDto,
    },
  )

  .get("/", async ({ query }) => {
    return await itemsService.findAll(query);
  })

  .get("/:id", async ({ params }: { params: { id: string } }) => {
    const item = await itemsService.findOne(Number(params.id));
    if (!item) {
      return { error: "Item not found" };
    }
    return item;
  })

  .patch(
    "/:id",
    async ({
      params,
      body,
    }: {
      params: { id: string };
      body: ItemUpdateDto;
    }) => {
      return await itemsService.update(Number(params.id), body);
    },
    {
      body: ItemUpdateDto,
    },
  )

  .delete("/:id", async ({ params }: { params: { id: string } }) => {
    return await itemsService.delete(Number(params.id));
  });
