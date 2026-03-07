import { Elysia } from "elysia";
import { itemsController } from "./api/items/items.controller";
import cors from "@elysiajs/cors";

export const app = new Elysia()
  .get("/", () => "Hello Elysia")
  .use(cors())
  .use(itemsController);

if (import.meta.main) {
  app.listen(3001);
  console.log(
    `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
  );
}
