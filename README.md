# infokes-explorer-monorepo

To install dependencies:

```bash
bun install
```

To run:

- go to packages/server
- copy .dev.env as .env
- edit the env for database as needed
- then run this command:

```bash
bun run db:migrate
bun run db:generate
bun run dev:server
bun run dev:client
```

Open:

- Server: localhost:3001
- Client: localhost:3000/explorer

This project was created using `bun init` in bun v1.3.10. [Bun](https://bun.com) is a fast all-in-one JavaScript runtime.
