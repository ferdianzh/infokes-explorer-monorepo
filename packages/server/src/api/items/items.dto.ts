import { t } from "elysia";

export const ItemCreateDto = t.Object({
  name: t.String(),
  type: t.Union([t.Literal("FILE"), t.Literal("FOLDER")]),
  parentId: t.Optional(t.Number()),
});

export const ItemUpdateDto = t.Object({
  name: t.Optional(t.String()),
  parentId: t.Optional(t.Nullable(t.Number())),
});

export type ItemCreateDto = typeof ItemCreateDto.static;
export type ItemUpdateDto = typeof ItemUpdateDto.static;
