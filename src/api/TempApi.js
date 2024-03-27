import { signUp } from "./User";

export async function makeManyUser() {
  const users = [
    {
      email: "alex1@example.com",
      pw: "Qwerty12!",
      name: "슬픈 수박",
      gender: "NONE",
      age: 20,
      nation: "대한민국",
      bio: "I'm a big fan of action and shooting games.",
      imgPath: "",
      favCategory1: "ACTION",
      favCategory2: "SHOOTING",
      favCategory3: "ADVENTURE",
    },
  ];

  users.forEach((user) => {
    signUp(user).then((res) => {
      console.log(res);
    });
  });
}
