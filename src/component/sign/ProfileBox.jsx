import { ReactComponent as ProfileIcon } from '../../icons/profile_default.svg';

import './ProfileBox.css'

function ProfileSelectBtn () {
    return (<button className='profileSelectButton'>프로필 사진 선택</button>);
}

function ProfileBox() {


    return (<div className='profileImageBox'>
        <ProfileIcon width={'128px'} height={'128px'} className="profileIcon" />
        <ProfileSelectBtn />
    </div>);
    
}

export default ProfileBox;