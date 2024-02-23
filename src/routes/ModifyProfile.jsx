import '../styles/ModifyProfile.css'

import ProfileBox from "../component/sign/ProfileBox";
import InputBox from "../component/sign/InputBox";
import InputDropDown from "../component/sign/InputDropDown";
import Topbar from '../component/Topbar';

function ProfileThumbnail() {
    
}

function ModifyProfileForm() {
    return (
        <div className="modify-profile-container">
            <ProfileBox />
            <div className="profile-text">
                <div>
                    이메일<br/>
                    tempemail@gameproto.com
                </div>
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
                <div className="category-selection">
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

function ModifyProfile() {
    return (
        <>
            <header>
            <Topbar />
            </header>
            <div className="mainContainer">
                <ModifyProfileForm/>
            </div>
        </>
    )
}

export default ModifyProfile;