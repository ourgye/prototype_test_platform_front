// 팔로우 하기
// "followerEmail" : "123",
// "followingEmail" : "1233"
export const follow = (data) => {
  const requestURL = "/follow";
  return fetch(requestURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((res) => {
    if (!res.ok) throw new Error(res.statusText);
    return res.text();
  });
};
