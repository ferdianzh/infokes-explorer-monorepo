import { t } from "elysia";

import { __transformDate__ } from "./__transformDate__";

import { __nullable__ } from "./__nullable__";

export const ItemPlain = t.Object(
  {
    id: t.Integer(),
    name: t.String(),
    type: t.Union([t.Literal("FILE"), t.Literal("FOLDER")], {
      additionalProperties: false,
    }),
    filepath: __nullable__(t.String()),
    parentId: __nullable__(t.Integer()),
    createdAt: t.Date(),
    updatedAt: t.Date(),
  },
  { additionalProperties: false },
);

export const ItemRelations = t.Object(
  {
    parent: __nullable__(
      t.Object(
        {
          id: t.Integer(),
          name: t.String(),
          type: t.Union([t.Literal("FILE"), t.Literal("FOLDER")], {
            additionalProperties: false,
          }),
          filepath: __nullable__(t.String()),
          parentId: __nullable__(t.Integer()),
          createdAt: t.Date(),
          updatedAt: t.Date(),
        },
        { additionalProperties: false },
      ),
    ),
    children: t.Array(
      t.Object(
        {
          id: t.Integer(),
          name: t.String(),
          type: t.Union([t.Literal("FILE"), t.Literal("FOLDER")], {
            additionalProperties: false,
          }),
          filepath: __nullable__(t.String()),
          parentId: __nullable__(t.Integer()),
          createdAt: t.Date(),
          updatedAt: t.Date(),
        },
        { additionalProperties: false },
      ),
      { additionalProperties: false },
    ),
  },
  { additionalProperties: false },
);

export const ItemPlainInputCreate = t.Object(
  {
    name: t.String(),
    type: t.Union([t.Literal("FILE"), t.Literal("FOLDER")], {
      additionalProperties: false,
    }),
    filepath: t.Optional(__nullable__(t.String())),
  },
  { additionalProperties: false },
);

export const ItemPlainInputUpdate = t.Object(
  {
    name: t.Optional(t.String()),
    type: t.Optional(
      t.Union([t.Literal("FILE"), t.Literal("FOLDER")], {
        additionalProperties: false,
      }),
    ),
    filepath: t.Optional(__nullable__(t.String())),
  },
  { additionalProperties: false },
);

export const ItemRelationsInputCreate = t.Object(
  {
    parent: t.Optional(
      t.Object(
        {
          connect: t.Object(
            {
              id: t.Integer({ additionalProperties: false }),
            },
            { additionalProperties: false },
          ),
        },
        { additionalProperties: false },
      ),
    ),
    children: t.Optional(
      t.Object(
        {
          connect: t.Array(
            t.Object(
              {
                id: t.Integer({ additionalProperties: false }),
              },
              { additionalProperties: false },
            ),
            { additionalProperties: false },
          ),
        },
        { additionalProperties: false },
      ),
    ),
  },
  { additionalProperties: false },
);

export const ItemRelationsInputUpdate = t.Partial(
  t.Object(
    {
      parent: t.Partial(
        t.Object(
          {
            connect: t.Object(
              {
                id: t.Integer({ additionalProperties: false }),
              },
              { additionalProperties: false },
            ),
            disconnect: t.Boolean(),
          },
          { additionalProperties: false },
        ),
      ),
      children: t.Partial(
        t.Object(
          {
            connect: t.Array(
              t.Object(
                {
                  id: t.Integer({ additionalProperties: false }),
                },
                { additionalProperties: false },
              ),
              { additionalProperties: false },
            ),
            disconnect: t.Array(
              t.Object(
                {
                  id: t.Integer({ additionalProperties: false }),
                },
                { additionalProperties: false },
              ),
              { additionalProperties: false },
            ),
          },
          { additionalProperties: false },
        ),
      ),
    },
    { additionalProperties: false },
  ),
);

export const ItemWhere = t.Partial(
  t.Recursive(
    (Self) =>
      t.Object(
        {
          AND: t.Union([Self, t.Array(Self, { additionalProperties: false })]),
          NOT: t.Union([Self, t.Array(Self, { additionalProperties: false })]),
          OR: t.Array(Self, { additionalProperties: false }),
          id: t.Integer(),
          name: t.String(),
          type: t.Union([t.Literal("FILE"), t.Literal("FOLDER")], {
            additionalProperties: false,
          }),
          filepath: t.String(),
          parentId: t.Integer(),
          createdAt: t.Date(),
          updatedAt: t.Date(),
        },
        { additionalProperties: false },
      ),
    { $id: "Item" },
  ),
);

export const ItemWhereUnique = t.Recursive(
  (Self) =>
    t.Intersect(
      [
        t.Partial(
          t.Object({ id: t.Integer() }, { additionalProperties: false }),
          { additionalProperties: false },
        ),
        t.Union([t.Object({ id: t.Integer() })], {
          additionalProperties: false,
        }),
        t.Partial(
          t.Object({
            AND: t.Union([
              Self,
              t.Array(Self, { additionalProperties: false }),
            ]),
            NOT: t.Union([
              Self,
              t.Array(Self, { additionalProperties: false }),
            ]),
            OR: t.Array(Self, { additionalProperties: false }),
          }),
          { additionalProperties: false },
        ),
        t.Partial(
          t.Object(
            {
              id: t.Integer(),
              name: t.String(),
              type: t.Union([t.Literal("FILE"), t.Literal("FOLDER")], {
                additionalProperties: false,
              }),
              filepath: t.String(),
              parentId: t.Integer(),
              createdAt: t.Date(),
              updatedAt: t.Date(),
            },
            { additionalProperties: false },
          ),
        ),
      ],
      { additionalProperties: false },
    ),
  { $id: "Item" },
);

export const ItemSelect = t.Partial(
  t.Object(
    {
      id: t.Boolean(),
      name: t.Boolean(),
      type: t.Boolean(),
      filepath: t.Boolean(),
      parentId: t.Boolean(),
      createdAt: t.Boolean(),
      updatedAt: t.Boolean(),
      parent: t.Boolean(),
      children: t.Boolean(),
      _count: t.Boolean(),
    },
    { additionalProperties: false },
  ),
);

export const ItemInclude = t.Partial(
  t.Object(
    {
      type: t.Boolean(),
      parent: t.Boolean(),
      children: t.Boolean(),
      _count: t.Boolean(),
    },
    { additionalProperties: false },
  ),
);

export const ItemOrderBy = t.Partial(
  t.Object(
    {
      id: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      name: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      filepath: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      parentId: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      createdAt: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      updatedAt: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
    },
    { additionalProperties: false },
  ),
);

export const Item = t.Composite([ItemPlain, ItemRelations], {
  additionalProperties: false,
});

export const ItemInputCreate = t.Composite(
  [ItemPlainInputCreate, ItemRelationsInputCreate],
  { additionalProperties: false },
);

export const ItemInputUpdate = t.Composite(
  [ItemPlainInputUpdate, ItemRelationsInputUpdate],
  { additionalProperties: false },
);
