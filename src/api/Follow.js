// 팔로우 하기
// "followerEmail" : "123",
// "followingEmail" : "1233"
export async function followUser(followerEmail, followingEmail) {
  const requestURL = "/follow";
  const data = {
    followerEmail,
    followingEmail,
  };

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
}

// 언팔로우 하기
export async function unfollowUser(followerEmail, followingEmail) {
  const requestURL = "/unfollow";
  const data = {
    followerEmail,
    followingEmail,
  };

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
}
