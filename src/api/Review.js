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
