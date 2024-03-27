import LongButton from "../component/sign/LongButton";
import InputBox from "../component/sign/InputBox";
import TopBar from "../component/Topbar";
import "../styles/SignIn.css";
import { Form, Link,  useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { userLogin } from "../api/User";
import { useMutation } from "@tanstack/react-query";


// 리액트 쿼리를 사용해보고 싶었습니다. 
// export const action = (queryClient) => {
//   return async ({ request}) => {
//     switch (request.method) { 
//       case 'POST': { 
//         let formData = await request.formData()

//         await userLogin({ email: formData.get('email'), pw: formData.get('pw') });

//         return 
//       }
//     }
//   }
// }

function SignUpText() {
  return (
    <div className="signUp">
      아직 회원이 아니신가요? <Link to="/SignUp">회원가입 하러 가기</Link>
    </div>
  );
}

function EmailLogin() {
  const navigate = useNavigate();
  const { state } = useLocation();

  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  }

  const handlePwChange = (e) => {
    setPw(e.target.value)
  }

  
  const { mutate: handleLogin, isLoading, isError, error, isSuccess } = useMutation({
    mutationFn: userLogin,
    onSuccess: (res) => {
      console.log("success")
     
      window.location.reload();
      if (!state) return navigate('/', { replace: true });
      return navigate(state);
    },
    onError: (error) => {
      alert(error.message);
      return navigate(state);
    }
  });

  return (
    <div>
      <h1>회원 로그인</h1>
      <p>GAME PROTO에 오신 걸 환영합니다.</p>
      <Form method="" action="" onSubmit={() => handleLogin({ email, pw })}>
        <div className="loginInput">
          <InputBox type="email" placeholder={"이메일"} width={"360px"} name="email" onChange={handleEmailChange} />
          <InputBox type="password" placeholder={"비밀번호"} width={"360px"} name="pw" onChange={handlePwChange} />
        </div>
        <SignUpText />
        <LongButton type="sumbit" value={"로그인"} width={"360px"} heigth={"36px"} />
      </Form>
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
