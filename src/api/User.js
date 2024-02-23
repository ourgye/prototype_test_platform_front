import { redirect } from "react-router-dom";

const USER_SESSION_STORAGE_KEY = "user_info";

// 유저 세션 확인
export function getUserSession() {
  const user = sessionStorage.getItem(USER_SESSION_STORAGE_KEY);

  return user;
}

// 유저 로그인 api
export async function userLogin({ email, pw }) {
  const res = await fetch("/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, pw }),
  }).then(async (res) => {
    if (!res.ok) throw new Error("Login failed");

    const user_id = await res.json();

    sessionStorage.setItem(USER_SESSION_STORAGE_KEY, JSON.stringify(user_id));
    return res;
  });
}

//유저 로그아웃
export async function logout() {
  sessionStorage.removeItem(USER_SESSION_STORAGE_KEY);
}

//유저 회원가입
export async function signUp() {}

//회원 정보 가져오기
export async function getUserInfo() {}

//유저 정보 불러오기 : 이름 소개 이미지
export async function getUserSummaryInfo() {}

//회원 정보 수정
export async function updateUserInfo() {}

//소개글 수정
export async function updateUserBio() {}

//닉네임 수정
export async function updateUserName() {}
