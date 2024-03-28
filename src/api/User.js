const USER_SESSION_STORAGE_KEY = "user_info";
export const USER_EMAIL_DUPLICATION_KEY = "user_email_check";

// 유저 세션 확인
export function getUserSession() {
  const user = sessionStorage.getItem(USER_SESSION_STORAGE_KEY);

  if (!user) {
    return "";
  }

  return JSON.parse(user);
}

// 유저 로그인 api
export async function userLogin({ email, pw }) {
  try {
    const res = await fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, pw }),
    });

    if (!res.ok) {
      throw new Error(res.statusText);
    }
    // json 이 아닌 text로 들어옴
    const user = await res.json();
    sessionStorage.setItem(USER_SESSION_STORAGE_KEY, JSON.stringify(user));

    return user;
  } catch (error) {
    console.error("An error occurred during login:", error);
    throw error; // 에러를 다시 throw하여 상위 호출자에게 전달
  }
}

//유저 로그아웃
export async function logout() {
  sessionStorage.removeItem(USER_SESSION_STORAGE_KEY);
}

//이메일 중복 확인
//get 에서 post로 바꾸는 것 고려
export async function checkEamilduplication({ email }) {
  const requestURL = `/emailcheck?email=${email}`;

  try {
    const res = await fetch(requestURL, {
      method: "GET",
    });

    if (!res.ok) throw new Error(res.statusText);
    const userEmailChecked = await res.json();

    if (userEmailChecked.userEmailChecked) return true;
    else return false;
  } catch (error) {
    console.log("An error occurred during email check: ", error);
    throw error;
  }
}

//유저 회원가입
export async function signUp(newUser) {
  try {
    const res = await fetch("/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    });

    if (!res.ok) throw new Error(res.statusText);
    return res;
  } catch (error) {
    console.log("An error occurred during sign up", error);
    throw error;
  }
}

//회원 정보 가져오기
export async function getUserInfo() {
  const userId = getUserSession();
  const requestURL = `/user/info/${userId["userId"]}`;

  try {
    const res = await fetch(requestURL, {
      method: "GET",
    });

    if (!res.ok) throw new Error(res.statusText);
    console.log(res);
    return res;
  } catch (error) {
    throw error;
  }
}
// 유저 정보 불러오기: 마이페이지
export async function getUserInfoForMyPage() {
  try {
    const user = await getUserSummaryInfo();
    const userCount = await getUserCountInfo();

    return { user, userCount };
  } catch (error) {
    throw error;
  }
}

//유저 정보 불러오기: 이름 소개 이미지
export async function getUserSummaryInfo() {
  const userId = getUserSession();
  const requestURL = `/user/preview/info/${userId["userId"]}`;

  try {
    const res = await fetch(requestURL, {
      method: "GET",
    });

    if (!res.ok) throw new Error(res.statusText);
    console.log(res);
    const userinfo = await res.json();

    return userinfo;
  } catch (error) {
    throw error;
  }
}

// 유저 정보 불러오기: 리뷰 수, 게임 수, 팔로워 수
export async function getUserCountInfo() {
  const user = getUserSession();
  const requestURL = `/user/cnt?email=${user["email"]}`;

  try {
    const res = await fetch(requestURL, {
      method: "GET",
    });

    if (!res.ok) throw new Error(res.statusText);
    console.log(res);

    const userCountInfo = await res.json();
    return userCountInfo;
  } catch (error) {
    throw error;
  }
}

//회원 정보 수정
export async function updateUserInfo(user) {
  const userId = getUserSession();
  const requestURL = `/user/info/${userId["userId"]}`;

  try {
    const res = await fetch(requestURL, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    if (!res.ok) throw new Error(res.statusText);
    console.log(res);
    return res;
  } catch (error) {
    throw error;
  }
}

//소개글 수정
export async function updateUserBio(bio) {
  const userId = getUserSession();
  const requestURL = `/user/bio/${userId["userId"]}`;

  try {
    const res = await fetch(requestURL, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ bio: bio }),
    });

    if (!res.ok) throw new Error(res.statusText);
    console.log(res);
    return res;
  } catch (error) {
    throw error;
  }
}

//닉네임 수정
export async function updateUserName(name) {
  const userId = getUserSession();
  const requestURL = `/user/name/${userId["userId"]}`;

  try {
    const res = await fetch(requestURL, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: name }),
    });

    if (!res.ok) throw new Error(res.statusText);
    console.log(res);
    return res;
  } catch (error) {
    throw error;
  }
}
