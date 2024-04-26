// 찜한 게임 불러오기
export const getFav = async (email) => {
  const requestURL = `/dib/games?email=${email}`;

  try {
    const res = await fetch(requestURL, {
      method: "GET",
    });

    if (!res.ok) throw new Error(res.statusText);
    const favList = await res.json();

    return favList;
  } catch (error) {
    throw error;
  }
};

// 게임 찜하기
export const postFav = async (email, testId) => {
  const requestURL = "/dib";

  const body = {
    email: email,
    testId: testId,
  };

  try {
    const res = await fetch(requestURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) throw new Error(res.statusText);

    const msg = await res.text();
    return msg;
  } catch (error) {
    throw error;
  }
};

// 게임 찜 취소
export const deleteFav = async (email, testId) => {
  const requestURL = `/dib`;

  const body = {
    email: email,
    testId: testId,
  };

  try {
    const res = await fetch(requestURL, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) throw new Error(res.statusText);

    const msg = await res.text();
    return msg;
  } catch (error) {
    throw error;
  }
};
