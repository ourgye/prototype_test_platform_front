import { http, HttpResponse } from "msw";

const allGames = new Map();

export const handlers = [
  http.get("/mocking", () => {
    console.log("Captured a 'GET /mocking request");
  }),
  http.get("/games", () => {
    return HttpResponse.json({ hi: "good" });
  }),
  http.post("/game-request", async ({ request }) => {
    const newGame = await request.json();

    allGames.set(newGame.id, newGame);

    return HttpResponse.json(newGame, { status: 201 });
  }),
];
