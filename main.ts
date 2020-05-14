import { Application, Router } from "https://deno.land/x/oak/mod.ts";

const books = new Map<string, any>();
books.set("1", {
  id: "1",
  title: "A Study in Scarlet",
  author: "Conan Doyle, Author",
});
books.set("2", {
  id: "2",
  title: "The Sign of the Four",
  author: "Conan Doyle, Author",
});
books.set("3", {
  id: "3",
  title: "The Hound of the Baskervilles",
  author: "Conan Doyle, Author",
});
books.set("4", {
  id: "4",
  title: "The Valley of Fear",
  author: "Conan Doyle, Author",
});

const router = new Router();

router
  .get("/", (context: any) => {
    context.response.body = "Standart GET handler";
  })
  .post(
    "/",
    (context: any) => {
      context.response.body = "Standart POST handler";
    },
  )
  .post(
    "/books",
    (context: any) => {
      context.response.body = [...books];
    },
  );

const app = new Application();

app.addEventListener("error", (evt: any) => {
  console.info(evt.error);
});

app.use(router.routes());
app.use(router.allowedMethods());

const port = 8081;
console.info(`Server is starting on ${port} port `);
await app.listen({ port });
