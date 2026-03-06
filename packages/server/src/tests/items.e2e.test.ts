import { describe, expect, it } from "bun:test";
import { app } from "..";

const url = "http://localhost:3001/api/items";

describe("Item E2E", () => {
  let itemId: number;

  it("should create item", async () => {
    const res = await app.handle(
      new Request(url, {
        method: "POST",
        body: JSON.stringify({
          name: "Test Item",
          type: "FOLDER",
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }),
    );

    const data = await res.json();

    expect(res.status).toBe(200);
    expect(data.name).toBe("Test Item");

    itemId = data.id;
  });

  it("should get all items", async () => {
    const res = await app.handle(new Request(url));

    const data = await res.json();

    expect(res.status).toBe(200);
    expect(Array.isArray(data)).toBe(true);
  });

  it("should get item by id", async () => {
    const res = await app.handle(new Request(`${url}/${itemId}`));

    const data = await res.json();

    expect(data.id).toBe(itemId);
  });

  it("should update item", async () => {
    const res = await app.handle(
      new Request(`${url}/${itemId}`, {
        method: "PATCH",
        body: JSON.stringify({
          name: "Updated Item",
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }),
    );

    const data = await res.json();

    expect(data.name).toBe("Updated Item");
  });

  it("should delete item", async () => {
    const res = await app.handle(
      new Request(`${url}/${itemId}`, {
        method: "DELETE",
      }),
    );

    const data = await res.json();

    expect(data.id).toBe(itemId);
  });
});
