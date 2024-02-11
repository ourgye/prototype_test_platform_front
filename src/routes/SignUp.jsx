import LongButton from "../component/sign/LongButton";
import InputBox from "../component/sign/InputBox";
import TopBar from "../component/Topbar";
import InputDropDown from "../component/sign/InputDropDown";
import ProfileBox from "../component/sign/ProfileBox";

import "../styles/SignUp.css";
import { useState } from "react";

function EmailSignUp() {
  return (
    <div>
      <h1>회원 가입</h1>
      <p>GAME PROTO에 오신 걸 환영합니다.</p>
      <div className="loginInput">
        <div>
          이메일*
          <br />
          <InputBox width={"360px"} />
        </div>{" "}
        <div>
          비밀번호*
          <br />
          <InputBox width={"360px"} />
        </div>{" "}
        <div>
          비밀번호 확인*
          <br />
          <InputBox width={"360px"} />
        </div>
      </div>
    </div>
  );
}

function SignUpFill() { 
  return (
    <div>
      <h1>회원 가입</h1>
      <ProfileBox />
      <div className="signUpInput">
        <div>
          닉네임*<br/>
          <InputBox width={"360px"} />
        </div>
        <div style={{ display: "flex", justifyContent: "space-between"}}>
          <div >
            나이*<br/>
            <InputDropDown width={'170px'} />
          </div>
          <div>
            성별*<br/>
            <InputDropDown width={'170px'} />
          </div>
        </div>
        <div>
          닉네임*<br/>
          <InputBox width={"360px"} />
        </div>
        <div>
          소개글<br/>
          <InputBox width={"360px"} height={'120px'} placeholder={"간단한 소개를 작성해주세요"} />
        </div> 
        <div className="categoriesSelection">
          <div>
            선호하는 카테고리 1*<br/>
            <InputBox width={"360px"} />
          </div><div>
            선호하는 카테고리 2*<br/>
            <InputBox width={"360px"} />
          </div><div>
            선호하는 카테고리 3*<br/>
            <InputBox width={"360px"} />
          </div>
        </div>
      </div>
    </div>
  )
}


function SignUpPartOne(props) {
  return (
    <div className="signUpTab">
      <EmailSignUp />
      <LongButton
        value={"다음 단계로 넘어가기"}
        width={"360px"}
        heigth={"36px"}
        yellow={true}
        onClick={props.onClickButton}
      />
    </div>
  );
}

function SignInPartTwo(props) { 
  return (
    <div className="signUpTab">
      <SignUpFill />
      <LongButton
        value={"회원 가입"}
        width={"360px"}
        heigth={"36px"}
      />
    </div>
  )
}


function SignUp() {
  const [isPartOne, SetPartOne] = useState(true);  

  return (
    <>
      <header>
        <TopBar />
      </header>
      <div className="mainContainer">
        {isPartOne ? <SignUpPartOne onClickButton={() => { SetPartOne(false) }} />:<SignInPartTwo/>}
      </div>
    </>
  );
}

export default SignUp;
