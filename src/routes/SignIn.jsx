import LongButton from "../component/sign/LongButton";
import InputBox from "../component/sign/InputBox";
import TopBar from "../component/Topbar";
import "../styles/SignIn.css";
import { Link } from "react-router-dom";

function SignUpText() {
  return (
    <div className="signUp">
      아직 회원이 아니신가요? <Link to="/SignUp">회원가입 하러 가기</Link>
    </div>
  );
}

function EmailLogin() {
  return (
    <div>
      <h1>회원 로그인</h1>
      <p>GAME PROTO에 오신 걸 환영합니다.</p>
      <div>
        <div className="loginInput">
          <InputBox placeholder={"이메일"} width={"360px"} />
          <InputBox placeholder={"비밀번호"} width={"360px"} />
        </div>
        <SignUpText />
        <LongButton value={"로그인"} width={"360px"} heigth={"36px"} />
      </div>
      <div className="Oauth2login">
        <LongButton
          value={"구글로 로그인하기"}
          width={"360px"}
          heigth={"36px"}
          yellow={true}
        />
        <LongButton
          value={"카카오로 로그인하기"}
          width={"360px"}
          heigth={"36px"}
          yellow={true}
        />
        <LongButton
          value={"네이버로 로그인하기"}
          width={"360px"}
          heigth={"36px"}
          yellow={true}
        />
      </div>
    </div>
  );
}

function Sign() {
  return (
    <>
      <header>
        <TopBar />
      </header>
      <div className="mainContainer">
        <div className="loginTab">
          <EmailLogin />
        </div>
      </div>
    </>
  );
}

export default Sign;
