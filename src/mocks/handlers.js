import { http, HttpResponse } from "msw";

const allGames = new Map();

export const handlers = [
  // POST/ user/login
  http.post("/user/login", async ({ request }) => {
    console.log("POST /user/login");

    const user = await request.json();
    if (
      user.user_email === "develop_gp@skku.edu" &&
      user.user_pw === "happyday12"
    )
      return HttpResponse.json({ user_id: "2020123456" }, { status: 201 });
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
];
