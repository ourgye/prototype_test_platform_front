// TOP 10 게임 불러오기(찜 기준) - 게임
export async function getTop10Games() {
  try {
    const res = await fetch("/proto/game/top10", {
      method: "GET",
    });
    if (!res.ok) {
      throw new Error(res.statusText);
    }

    const top10Games = await res.json();
    return top10Games;
  } catch (error) {
    console.error("An error occurred during get top10 games:", error);
    throw error;
  }
}

// 기존 게임 불러오기
export async function getExistingGames(testId) {
  const requestURL = `/proto/build/${testId}`;
  try {
    const res = await fetch(requestURL, {
      method: "GET",
    });
    if (!res.ok) {
      throw new Error(res.statusText);
    }

    const existingGames = await res.json();
    return existingGames;
  } catch (error) {
    console.error("An error occurred during get existing games:", error);
    throw error;
  }
}

//기존 게임 리스트(최신 회차만) - 프로토타입 제작시 리스트로
export async function getExistingGameList(email) {
  const requestURL = `/proto/build/list?email=${email}`;

  try {
    const res = await fetch(requestURL, {
      method: "GET",
    });
    if (!res.ok) {
      throw new Error(res.statusText);
    }

    const existingGameList = await res.json();
    return existingGameList;
  } catch (error) {
    console.error("An error occurred during get existing game list:", error);
    throw error;
  }
}

// 카테고리 별 게임 불러오기 (12개)
export async function getGamesByCategory(category) {
  const requestURL = `/proto/main/games/${category}`;

  try {
    const res = await fetch(requestURL, {
      method: "GET",
    });
    if (!res.ok) {
      throw new Error(res.statusText);
    }

    const gamesByCategory = await res.json();
    return gamesByCategory;
  } catch (error) {
    console.error("An error occurred during get games by category:", error);
    throw error;
  }
}

//내가 만든 게임(테스트) 리스트 불러오기
export async function getMyGames(email) {
  const requestURL = `/proto/mypage/games?email=${email}`;

  try {
    const res = await fetch(requestURL, {
      method: "GET",
    });
    if (!res.ok) {
      throw new Error(res.statusText);
    }

    const myGames = await res.json();
    return myGames;
  } catch (error) {
    console.error("An error occurred during get my games:", error);
    throw error;
  }
}

//게임 제작
export async function makeNewGame({ newGame }) {
  try {
    const res = await fetch("/proto/game", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newGame),
    });
    if (!res.ok) {
      throw new Error(res.statusText);
    }

    return res;
  } catch (error) {
    console.error("An error occurred during make new game:", error);
    throw error;
  }
}

//테스트(프로젝트) 제작
export async function makeNewTest(gameId, email, { newTest }) {
  const requestURL = `/proto/${gameId}?email=${email}`;
  try {
    const res = await fetch("/proto/build", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTest),
    });
    if (!res.ok) {
      throw new Error(res.statusText);
    }
    return res;
  } catch (error) {
    console.error("An error occurred during make new test:", error);
    throw error;
  }
}

// 프로젝트 수정
export async function updateTest(email, testId, { updatedTest }) {
  const requestURL = `/proto/${testId}?email=${email}`;
  try {
    const res = await fetch(requestURL, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedTest),
    });
    if (!res.ok) {
      throw new Error(res.statusText);
    }
    return res;
  } catch (error) {
    console.error("An error occurred during update test:", error);
    throw error;
  }
}

//프로젝트 상세 정보 가져오기
export async function getTestDetail(testId) {
  const requestURL = `/proto/${testId}`;

  try {
    const res = await fetch(requestURL, {
      method: "GET",
    });
    if (!res.ok) {
      throw new Error(res.statusText);
    }

    const testDetail = await res.json();
    return testDetail;
  } catch (error) {
    console.error("An error occurred during get test detail:", error);
    throw error;
  }
}

// 게임 다운로드 링크 가져오기
export async function getGameDownloadLink(gameId) {
  const requestURL = `/proto/download/${gameId}`;

  try {
    const res = await fetch(requestURL, {
      method: "GET",
    });
    if (!res.ok) {
      throw new Error(res.statusText);
    }

    const downloadLink = await res.json();
    return downloadLink;
  } catch (error) {
    console.error("An error occurred during get game download link:", error);
    throw error;
  }
}
