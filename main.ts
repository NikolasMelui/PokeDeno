import { Application, Router } from "https://deno.land/x/oak/mod.ts";

const router = new Router();

router
  .get("/", (context: any) => {
    context.response.body = "PokeDeno is here!";
  })
  .post("/", (context: any) => {
    context.response.body = "PokeDeno is here!";
  })
  .get(
    "/pokemon",
    async (context: any) => {
      const pokemons = (await (await fetch(
        "https://pokeapi.co/api/v2/pokemon/?limit=-1",
      )).json());
      context.response.body = JSON.stringify(pokemons);
    },
  )
  .post(
    "/pokemon",
    async (context: any) => {
      const pokemons = (await (await fetch(
        "https://pokeapi.co/api/v2/pokemon/?limit=-1",
      )).json());
      context.response.body = JSON.stringify(pokemons);
    },
  )
  .get("/pokemon/:name", async (context: any) => {
    if (context.params && context.params.name) {
      const { name } = context.params;
      const pokemon = (await (await fetch(
        `https://pokeapi.co/api/v2/pokemon/${name}`,
      )).json());
      context.response.body = JSON.stringify(pokemon);
    }
  })
  .post("/pokemon/:name", async (context: any) => {
    if (context.params && context.params.name) {
      const { name } = context.params;
      const pokemon = (await (await fetch(
        `https://pokeapi.co/api/v2/pokemon/${name}`,
      )).json());
      context.response.body = JSON.stringify(pokemon);
    }
  });

const app = new Application();

app.addEventListener("error", (evt: any) => {
  console.info(evt.error);
});

app.use(router.routes());
app.use(router.allowedMethods());

const port = 8081;
console.info(`Server is starting on ${port} port `);
await app.listen({ port });
