import { http, HttpResponse } from "msw";

const allGames = new Map();

export const handlers = [
  // POST/ user/login
  http.post("/login", async ({ request }) => {
    console.log("POST /login");
    const user = await request.json();

    if (user.email == "df@df.com" && user.pw == "df@df.com")
      return HttpResponse.json({ user_id: "2020123456" }, { status: 201 });

    return HttpResponse.json({ error: "Not Authorized" }, { status: 401 });
  }),
  http.post("/user/logout", async ({ request }) => {
    console.log("POST /user/logout");

    return HttpResponse.json({ message: "logout successed" }, { status: 200 });
  }),
  http.post("/user/register", async ({ request }) => {
    console.log("POST /user/register");
    return HttpResponse.json(
      { message: "register successed" },
      { status: 200 }
    );
  }),
  http.get("/signin", async ({ request }) => {
    console.log("is it working? ");
  }),
];
