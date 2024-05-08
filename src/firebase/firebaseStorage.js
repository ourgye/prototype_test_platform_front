import { firebaseStorage } from "./firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

// 사용자 프로필 업로드
export function uploadUserProfileFile(file, useremail) {
  console.log(file);

  const userImagePath = useremail + "/images/" + "profile.jpg";
  const storageRef = ref(firebaseStorage, userImagePath);

  const metadata = {
    contentType: file.type,
  };

  const url = uploadBytes(storageRef, file, metadata)
    .then((snapshot) => {
      return getDownloadURL(snapshot.ref);
    })
    .then((downloadURL) => {
      return downloadURL;
    });

  return url;
}

// 사용자 프로필 링크 가져오기
export async function getUserProfileURL(useremail) {
  const userImagePath = useremail + "/images/" + "profile.jpg";
  const storageRef = ref(firebaseStorage, userImagePath);

  try {
    const url = await getDownloadURL(storageRef).then((url) => {
      return url;
    });
    return url;
  } catch (error) {
    return defaultUserProfile;
  }
}

// 사용자 게임 업로드 (zip 파일) 만 가능
export async function uploadGameFile(file, useremail, gameName) {
  const gamePath = useremail + "/games/" + gameName + "/" + file.name;
  const storageRef = ref(firebaseStorage, gamePath);

  const metadata = {
    contentType: file.type,
  };

  const url = await uploadBytes(storageRef, file, metadata)
    .then((snapshot) => {
      return getDownloadURL(snapshot.ref);
    })
    .then((downloadURL) => {
      return downloadURL;
    });

  return url;
}

// 사용자 게임 섬네일 업로드
export async function uploadGameThumbnail(file, useremail, gameName) {
  const thumbnailPath =
    useremail + "/games/" + gameName + "/" + "thumbnail.jpg";
  const storageRef = ref(firebaseStorage, thumbnailPath);

  const metadata = {
    contentType: file.type,
  };

  const url = await uploadBytes(storageRef, file, metadata)
    .then((snapshot) => {
      return getDownloadURL(snapshot.ref);
    })
    .then((downloadURL) => {
      return downloadURL;
    });

  return url;
}

export const defaultUserProfile =
  "https://firebasestorage.googleapis.com/v0/b/game-proto-8ffe0.appspot.com/o/profile-circle.512x512.png?alt=media&token=3bf93d83-5b75-4e8c-b5a1-787d1d99f3d8";
