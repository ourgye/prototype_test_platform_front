//비밀번호 적어도 8자리 이상, 최소 하나 이상의 숫자, 최소 알파벳 대소문자 1개, 최소 특수문자 1개
//특수문자 ~, !, @, #, $, % , ^, &, *, ? 사용 가능
const regPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[~!@#$%^&*?]).{8,}$/;

const regEmail =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export function checkEmailFormatOrNull(email) {
  return regEmail.test(String(email));
}

export function checkPwFormat(pw) {
  return regPassword.test(String(pw));
}
