import { getUserSession } from "./User";

// (유저가 작성한) 리뷰 리스트 불러오기
export async function getReviewList(email) {
  const requestURL = `/review?email=${email}`;

  try {
    const res = await fetch(requestURL, {
      method: "GET",
    });

    if (!res.ok) throw new Error(res.statusText);
    console.log(res);
    const reviewList = await res.json();

    return reviewList;
  } catch (error) {
    throw error;
  }
}

// 프로젝트 리뷰 불러오기
export async function getReviewListOfTest(testId) {
  const requestURL = `/review/${testId}`;

  try {
    const res = await fetch(requestURL, {
      method: "GET",
    });

    if (!res.ok) throw new Error(res.statusText);
    console.log(res);
    const reviewList = await res.json();

    return reviewList;
  } catch (error) {
    if (error.message === "Internal Server Error") return null;
    else throw error;
  }
}

// 리뷰 작성가능한지 확인
export async function checkReviewAvailable(testId, email) {
  const requestURL = `/review/check?testId=${testId}&email=${email}`;
  try {
    const res = await fetch(requestURL, {
      method: "GET",
    });

    if (!res.ok) throw new Error(res.statusText);

    const reviewAvailable = await res.json();

    return reviewAvailable;
  } catch (error) {
    throw error;
  }
}

// 리뷰 게시하기 /review/{testid}?email={email}
export async function postReview(testId, email, review) {
  const requestURL = `/review/${testId}?email=${email}`;

  try {
    const res = await fetch(requestURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: review }),
    });

    if (!res.ok) throw new Error(res.statusText);

    return res;
  } catch (error) {
    throw error;
  }
}

// 리뷰 요약 불러오기 /review/summary/{testid}
export async function getReviewSummary(testId) {
  const requestURL = `/review/summary/${testId}`;
  console.log(requestURL);
  try {
    const res = await fetch(requestURL, {
      method: "GET",
    });

    console.log(res ? res : "no response");
    if (!res.ok) throw new Error(res.statusText);

    const reviewSummary = await res.json();

    return reviewSummary;
  } catch (error) {
    throw error;
  }
}

// 리뷰 키워드 검색 /review/search?gameId={}&keyword={}&testRound={}
export async function searchReview(gameId, keyword, testRound) {
  const requestURL = `/review/search?gameId=${gameId}&keyword=${keyword}&testRound=${testRound}`;

  try {
    const res = await fetch(requestURL, {
      method: "GET",
    });

    if (!res.ok) throw new Error(res.statusText);

    const reviewList = await res.json();

    return reviewList;
  } catch (error) {
    throw error;
  }
}

// 리뷰 개선 완료
export async function reflectReview(testUserEmail, reviewId) {
  const requestURL = `/review/reflected/${reviewId}`;

  const data = {
    testUserEmail: testUserEmail,
    reviewReflected: "Y",
  };

  try {
    const res = await fetch(requestURL, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) throw new Error(res.statusText);

    return res;
  } catch (error) {
    throw error;
  }
}

// 리뷰 개선 미완료
export async function rejectReview(testUserEmail, reviewId) {
  const requestURL = `/review/reflected/${reviewId}`;

  const data = {
    testUserEmail: testUserEmail,
    reviewReflected: "N",
  };

  try {
    const res = await fetch(requestURL, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) throw new Error(res.statusText);

    return res;
  } catch (error) {
    throw error;
  }
}
