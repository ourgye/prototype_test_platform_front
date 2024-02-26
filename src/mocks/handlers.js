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
  http.get("/emailcheck", async ({ request }) => {
    const url = new URL(request.url);

    const email = url.searchParams.get("email");
    if (email === "hi@hi.com")
      return HttpResponse.json(
        {
          userEmailChecked: false,
        },
        { status: 200 }
      );
    return HttpResponse.json(
      {
        userEmailChecked: true,
      },
      { status: 200 }
    );
  }),
  http.post("/signup", async ({ request }) => {
    const newUser = await request.json();
    //console.log(newUser);
    return HttpResponse.json(
      { message: "register successed" },
      { status: 201 }
    );
  }),
  http.get("/user/info/:userid", async ({ request }) => {
    const url = new URL(request.url);
    const img_src = require("../image/profile_image_example.png");

    return HttpResponse.json(
      {
        email: "df@df.com",
        name: "게임프로토",
        bio: "안녕하세요! 즐거운 하루 보내세요",
        gender: "FEMALE",
        nation: "대한민국",
        age: 12,
        imgPath: null,
        createdAt: "2024-02-14T14:58:54.089671",
        modifiedAt: null,
        favCategory1: "ACTION",
        favCategory2: "STRATEGY",
        favCategory3: "DATING",
      },
      { status: 200 }
    );
  }),
  http.put("/user/info/:userid", async ({ request }) => {
    const userModified = await request.json();

    console.log("userModified", userModified);
    return HttpResponse.json(
      {
        message: "user infomation modifying is successed",
      },
      { status: 201 }
    );
  }),
];
