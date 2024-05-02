import '../styles/ModifyProfile.css'

import { ReactComponent as ArrowRight } from '../icons/chevron_right.svg'
import { ReactComponent as ProfileIcon } from '../icons/profile_default.svg';

import InputBox from "../component/sign/InputBox";
import InputDropDown from "../component/sign/InputDropDown";
import { Form, redirect, useLocation, useNavigate, useRouteLoaderData } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getCountryList } from '../country';
import { categoryList, categoryListKR } from '../category';
import { useMutation } from '@tanstack/react-query';
import { updateUserInfo } from '../api/User';
import { getUserProfileURL, uploadUserProfileFile } from '../firebase/firebaseStorage';

function WhereAmI(props) {
    return (
        <div className="where-am-i">
            <div className="top-navi">
                HOME
            </div>
            <ArrowRight width="26px" height="26px"/>
            <div className="sub-navi">
                마이 페이지
            </div>
        </div>
    )
}

function ProfileThumbnail({ selectedImage, setSelectedImage, setIsImageChanged}) {
    const [selectedImageName, setSelectedImageName] = useState();
    const [imageURL, setImageURL] = useState();

    const handleSelectImage = (e) => {
        e.preventDefault();
        e.persist();

        console.log(e.target.files)

        // 이미지 선택 취소시 아무 변경 없음
        if (e.target.files.length > 0) { 
            const selectedImages = e.target.files;

            setSelectedImage(selectedImages[0]);
            setSelectedImageName(selectedImages[0].name);
            setImageURL(URL.createObjectURL(selectedImages[0]));
            setIsImageChanged(true);
        }
    }

    const profileSelectBtn = (
        <>
        <div className='profileSelectButton'>
            <label htmlFor="profileImageInput">프로필 이미지 수정</label>
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
    
    const profileImage =
        <div className='profileImage'>
            <img src={imageURL ?? selectedImage} alt={selectedImageName} id="profileImage" />
        </div>
   
    
    
    return (<Form className='profileImageBox'>
        {profileImage}
        {profileSelectBtn}
    </Form>);
    
}

function ModifyProfileForm() {
    const navigate = useNavigate();
    const user = useRouteLoaderData('mypagemodify');

    const ageList = [...Array(99)].map((_, i) => { return i + 1 });
    const genderList = ["남성", "여성", "선택 안함"];
    const genderListEn = ['male', 'female', 'none'];
    const countryList = getCountryList();
  
    const [selectedImage, setSelectedImage] = useState();
    const [isImageChanged, setIsImageChanged] = useState(false);
    const [name, setName] = useState(user.name);
    const [age, setAge] = useState(user.age);
    const [gender, setGender] = useState(user.gender.toLowerCase());
    const [nation, setNation] = useState(user.nation);
    const [bio, setBio] = useState(user.bio);
    const [fav1, setFav1] = useState(user.favCategory1);
    const [fav2, setFav2] = useState(user.favCategory2);
    const [fav3, setFav3] = useState(user.favCategory3);

    useEffect(() => {
        getUserProfileURL(user.email).then((url) => {
            setSelectedImage(url);
        });
    }, [user.email]);

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
    
    const handleCancelBtnClick = (e) => {
        e.preventDefault();

        // 뒤로가기 하면 마이페이지로 redirect
        if (window.confirm("프로필 수정을 중단하시겠습니까?\n이 페이지를 벗어자면 작성된 내용은 저장되지 않습니다."))
            return navigate('/mypage')
    }

    const {mutate: modifyUserInfoAPI, isError, isSuccess} = useMutation({
        mutationFn: updateUserInfo,
        onSuccess: (res) => {
            alert("회원 정보 변경 완료");

            window.location.href = '/mypage';
        },
        onError: (error) => {
            console.log("oops.. an Error occurred during put method in user infomation modification")
        }
           
    })
    
    const handleModifyBtnClick = (e) => {
        e.preventDefault();

        if (name && (age && age !== "default") &&
            (gender && gender !== "default") &&
            (fav1 && fav1 !== "default") &&
            (fav2 && fav2 !== "default") &&
            (fav3 && fav3 !== "default")) { 
            const modifiedUser = {
                name: name,
                gender: gender.toUpperCase(),
                age: age,
                nation: nation,
                bio: bio,
                favCategory1: fav1,
                favCategory2: fav2,
                favCategory3: fav3,
            }

            if(isImageChanged) uploadUserProfileFile(selectedImage, user.email); 

            return modifyUserInfoAPI(modifiedUser);
        }

        return alert("필수 입력란을 확인해주세요");
    }


    return (
        <div className="modify-profile-container">
            <ProfileThumbnail selectedImage={selectedImage} setSelectedImage={setSelectedImage} setIsImageChanged={setIsImageChanged} />
            <div className="profile-text">
                <div>
                    이메일<br/>
                    {user.email}
                </div>
                <div>
                    닉네임*<br/>
                    <InputBox width={"400px"} defaultValue={name} onChange={handleNameChange} />
                </div>
                <div style={{ display: "flex", justifyContent: "space-between"}}>
                    <div >
                        나이*<br/>
                        <InputDropDown width={'185px'} optionList={ageList} onChange={handleAgeChange}
                            defaultValue={age} />
                    </div>
                    <div>
                        성별*<br/>
                        <InputDropDown width={'185px'} optionList={genderList} onChange={handleGenderChange}
                            defaultValue={genderList[genderListEn.indexOf(gender)]} />
                    </div>
                </div>
                <div>
                국가<br/>
                    <InputDropDown width={"400px"} optionList={countryList} onChange={handleNationChange}
                        defaultValue={nation} />
                </div>
                <div>
                    소개글<br/>
                    <textarea className="user-bio-input" placeholder={"간단한 소개를 작성해주세요"} onChange={handleBioChange}
                        defaultValue={bio}
                    />
                </div> 
                <div className="category-selection">
                    <div>
                        선호하는 카테고리 1*<br/>
                        <InputDropDown width={"400px"} optionList={categoryListKR} onChange={handleFav1Change}
                            defaultValue={categoryListKR[categoryList.indexOf(fav1)]} />
                    </div><div>
                        선호하는 카테고리 2*<br/>
                        <InputDropDown width={"400px"} optionList={categoryListKR} onChange={handleFav2Change}
                         defaultValue={categoryListKR[categoryList.indexOf(fav2)]}/>
                    </div><div>
                        선호하는 카테고리 3*<br/>
                        <InputDropDown width={"400px"} optionList={categoryListKR} onChange={handleFav3Change}
                         defaultValue={categoryListKR[categoryList.indexOf(fav3)]}/>
                    </div>
                </div>
                <div className="buttons">
                    <button className='button cancel' onClick={handleCancelBtnClick}>
                        취소
                    </button>
                    <button className='button modify' onClick={handleModifyBtnClick}>
                        변경
                    </button>
               </div>
            </div>
        </div>
    )
}

function ModifyProfile() {
    return (
        <>
            <WhereAmI/>
            <ModifyProfileForm />
        </>
    )
}

export default ModifyProfile;