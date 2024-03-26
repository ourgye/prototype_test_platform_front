import LongButton from "../component/sign/LongButton";
import InputBox from "../component/sign/InputBox";
import TopBar from "../component/Topbar";
import InputDropDown from "../component/sign/InputDropDown";

import "../styles/SignUp.css";
import '../component/sign/ProfileBox.css'
import { useEffect, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Form, useLocation, useNavigate } from 'react-router-dom';
import { ReactComponent as ProfileIcon } from '../icons/profile_default.svg';
import { checkEamilduplication, signUp } from "../api/User";
import { categoryList, categoryListKR } from "../category";
import { getCountryList } from "../country";
import { checkEmailFormatOrNull, checkPwFormat } from "../check";

const newUser = {
  email: '',
  pw: '',
  name: '',
  gender: '',
  age: '',
  nation: '',
  bio: '',
  imgPath: '',
  favCategory1: '',
  favCategory2: '',
  favCategory3: '',
}

// 프로필 박스(컴포넌트에 있던 거 여기로 옮김)
function ProfileBox({selectedImage, setSelectedImage}) { 
  
  const [selectedImageName, setSelectedImageName] = useState();

  const handleSelectImage = (e) => {
      e.preventDefault();
      e.persist();

      console.log(e.target.files)

      // 이미지 선택 취소시 아무 변경 없음
      if (e.target.files.length > 0) { 
          const selectedImage = e.target.files;
          const imageURL = URL.createObjectURL(selectedImage[0]);

          setSelectedImage(imageURL);
          setSelectedImageName(selectedImage[0].name);
      }
  }

  const profileSelectBtn = (
      <>
      <div className='profileSelectButton'>
          <label htmlFor="profileImageInput">프로필 이미지 선택</label>
      </div>
          <input
              type="file"
              id="profileImageInput"
              name="profileImage"
              accept=".png, .jpg"
              onChange={handleSelectImage}
          />
  </>
  )

  const profileImage = selectedImage[0] ? (
      <div className='profileImage'>
          <img src={selectedImage} alt={selectedImageName} id="profileImage" />
      </div>
  ) : (
      <div className='profileImage'>
          <ProfileIcon width='128px' height='128px' className="profileIcon" />
      </div>
  );
  
  
  return (<Form className='profileImageBox'>
      {profileImage}
      {profileSelectBtn}
  </Form>);
  
}

function EmailSignUp({onClickButton}) {
  const [email, setEmail] = useState('game@game.com');
  const [isEmailUnique, setIsEmailUnique] = useState(true);
  const [pw, setPw] = useState('');
  const [pwCheck, setpwCheck] = useState('');
  const [isPwSame, setIsPwSame] = useState(undefined);
  const [isEmailFormatOk, setIsEmailFormatOk] = useState('');

  // input change handlers
  const handleEmailChange = (e) => {
    setEmail(e.target.value)
  }
  const handlePwChange = (e) => {
    setPw(e.target.value)
  }
  const handlePwCheckChange = (e) => {
    setpwCheck(e.target.value); 
    
    // 패스워드 같은지 확인, pw==pwcheck로 하면 pwcheck값이 전의 value값으로 check됨. 
    if (e.target.value === pw) setIsPwSame(true);
    else setIsPwSame(false);
  }
  
  //이메일 중복 체크 핸들러, get을 사용하나 현재는 mutate로 반영
  const { mutate: handleEmailDuplication, isSuccess } = useMutation({
    mutationFn: checkEamilduplication,
    onSuccess: (res) => {
      console.log("in singup", res)
      setIsEmailUnique(res);
    }
  })

  // 다음으로 가기 버튼 클릭시
  const handleNextButton = () => {
    //모든 칸이 입력되었는지 확인
    if (!email && !pw && !pwCheck) {
      alert("필수 입력란을 확인해주세요");
      return;
    }

    // 이메일 중복체크 되었는지 확인
    if (!isEmailUnique) {
      alert("이메일 중복 체크를 완료해주세요.");
      return;
    }

    // 패스워드 정규식 체크 
    if (!checkPwFormat(pw)) { 
      alert("패스워드는 최소 8자이상\n최소 1개 이상의 대문자 알파벳, 소문자 알파벳, 숫자, 특수문자가 들어가야 합니다. ")
      return;
    }

    // 비밀번호 확인란 확인
    if (!isPwSame) { 
      alert("확인 비밀번호가 다릅니다")
      return;
    }

    // 마지막 체크
    if (!isEmailUnique && !isPwSame && !email && !pw && !pwCheck) {
      console.log("fatal: something is wrong in sign up sequence");
    }

    newUser['email'] = email; newUser['pw'] = pw;
    onClickButton();
  }


  const passwordNotSame = (<div className="box-under input-alert">비밀번호가 일치하지 않습니다.</div>)
  const emailFormatWrong = (<div className="box-under input-alert">이메일 형식이 아닙니다</div>)
  const emailNotUnique = (<div className="box-under input-alert">사용할 수 없는 이메일입니다</div>)
  const emailCanUse = (<div className="box-under input-correct">사용할 수 있는 이메일입니다</div>)

  return (
    <>
    <div>
      <h1>회원 가입</h1>
      <p>GAME PROTO에 오신 걸 환영합니다.</p>
      <div className="signup-input-tab">
        <div>
          이메일*
          <br />
          <div className="email-input">
            <InputBox type="email" width={"300px"} height="40px" onChange={handleEmailChange} disabled={isEmailUnique} />
            <button className="email-duplication-btn" onClick={() => {
              if (!checkEmailFormatOrNull(email)) { 
                setIsEmailFormatOk(false);
                return;
              } else {
                setIsEmailFormatOk(true);
              }
              
              handleEmailDuplication({ email });
            }}
            disabled={isEmailUnique}>중복<br />확인</button>
          </div>
          {isEmailUnique && emailCanUse}
          {isEmailUnique === false && emailNotUnique}
          {isEmailFormatOk === false && emailFormatWrong}
        </div>
        <div>
          비밀번호*
          <br />
          <InputBox type="password" width={"360px"} height="40px" onChange={handlePwChange} />
        </div>
        <div>
          비밀번호 확인*
          <br />
          <InputBox type="password" width={"360px"} height="40px" onChange={handlePwCheckChange} />
          {isPwSame==false && passwordNotSame}
        </div>
      </div>
    </div>
      <LongButton
      value={"다음 단계로 넘어가기"}
      width={"360px"}
      heigth={"36px"}
      yellow={true}
      onClick={handleNextButton}
    />
    </>
  );
}

function SignUpFill() { 
  const navigate = useNavigate();
  const { state } = useLocation();

  const ageList = [...Array(99)].map((_, i) => { return i+1 });
  const genderList = ["남성", "여성", "선택 안함"];
  const genderListEn = ['MALE', 'FEMALE', 'NONE'];
  const countryList = getCountryList();

  const [selectedImage, setSelectedImage] = useState('');
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [nation, setNation] = useState("대한민국");
  const [bio, setBio] = useState('');
  const [fav1, setFav1] = useState(categoryList[0]);
  const [fav2, setFav2] = useState(categoryList[1]);
  const [fav3, setFav3] = useState(categoryList[2]);

  //인풋 체인지 핸들러
  const handleNameChange = (e) => {
    setName(e.target.value);
  }
  const handleAgeChange = (e) => {
    setAge(e.target.value)
  }
  const handleGenderChange = (e) => {
    setGender(genderListEn[genderList.indexOf(e.target.value)]);
  }
  const handleNationChange = (e) => {
    setNation(e.target.value)
  }
  const handleBioChange = (e) => [
    setBio(e.target.value)
  ]
  const handleFav1Change = (e) => {
    setFav1(categoryList[categoryListKR.indexOf(e.target.value)])
  }
  const handleFav2Change = (e) => {
    setFav2(categoryList[categoryListKR.indexOf(e.target.value)])
  }
  const handleFav3Change = (e) => {
    setFav3(categoryList[categoryListKR.indexOf(e.target.value)])
  }
  
  //회원가입 api (useMutation)
  const { mutate: signupApi, isError, isSuccess, error } = useMutation({
    mutationFn: signUp,
    onSuccess: (res) => {
      console.log("SIGN UP success")
      alert("회원가입 성공!");
      if (!state) return navigate('/');
      return navigate(state);
    },
    onError: (error) => {
      return alert(error.message)
    }
  });

  //회원 가입 버튼 클릭시
  const handleSignUpButton = (e) => {
    if (name &&
      (age && age !== "default") &&
      (gender && gender !== "default") &&
      (fav1 && fav1 !== "default") &&
      (fav2 && fav2 !== "default") && 
      (fav3 && fav3 !== "default")) {
      
      //newUser에 모든 값 저장
      newUser['name'] = name; newUser['age'] = age; newUser['gender'] = gender;
      newUser['bio'] = bio; newUser['imgPath'] = selectedImage; newUser['nation'] = nation;
      newUser['favCategory1'] = fav1; newUser['favCategory2'] = fav2; newUser['favCategory3'] = fav3;
      
      //api 연결
      return signupApi({ newUser })
    }

    return alert("필수 입력 란을 확인해주세요")
  }

  return (
    <>
    <div>
      <h1>회원 가입</h1>
      <ProfileBox selectedImage={selectedImage} setSelectedImage={setSelectedImage}/>
      <div className="signup-input-tab">
        <div>
          닉네임*<br/>
          <InputBox width={"360px"} onChange={handleNameChange} />
        </div>
        <div style={{ display: "flex", justifyContent: "space-between"}}>
          <div >
            나이*<br/>
              <InputDropDown width={'170px'} optionList={ageList} onChange={handleAgeChange} />
          </div>
          <div>
            성별*<br/>
              <InputDropDown width={'170px'} optionList={genderList} onChange={handleGenderChange} />
          </div>
        </div>
        <div>
          국가<br/>
          <InputDropDown width={"360px"} optionList={countryList} onChange={handleNationChange} />
        </div>
        <div>
          소개글<br/>
          <textarea className="user-bio-input" placeholder={"간단한 소개를 작성해주세요"} onChange={handleBioChange}/>
        </div> 
        <div className="categories-selection-tab">
          <div>
            선호하는 카테고리 1*<br/>
            <InputDropDown width={"360px"} optionList={categoryListKR} onChange={handleFav1Change} />
          </div><div>
            선호하는 카테고리 2*<br/>
              <InputDropDown width={"360px"} optionList={categoryListKR}  onChange={handleFav2Change} />
          </div><div>
            선호하는 카테고리 3*<br/>
              <InputDropDown width={"360px"} optionList={categoryListKR} onChange={handleFav3Change} />
          </div>
        </div>
      </div>
    </div>
      <LongButton
      value={"회원 가입"}
      width={"360px"}
      heigth={"36px"}
      onClick={handleSignUpButton}
      />
   </>
  )
}

function SignUp() {
  const [signUpPart, setSignUpPart] = useState(0);
  const handleNextButton = () => {
    setSignUpPart(1);
  }

  return (
    <>
      <header>
        <TopBar />
      </header>
      <div className="mainContainer">
        <div className="signup-tab">
          {signUpPart===0? <EmailSignUp onClickButton={handleNextButton}/>: <SignUpFill />}
        </div>
      </div>
    </>
  );
}

export default SignUp;
