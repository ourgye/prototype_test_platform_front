import './UserInfo.css'
import {ReactComponent as StarIcon} from '../../icons/star.svg'
import { useState } from 'react';

function UserInfo({user}) {
    const [showFollow, setShowFollow] = useState(false);

    const handleClickUserName = () => {
        setShowFollow(!showFollow);
    }

    return (
        <div className="posted-user-wrapper">
            <div className="posted-user" onClick={handleClickUserName}>
                @{user}
            </div>
            {showFollow && <div className='user-follow'>
                <StarIcon/>팔로우하기
            </div>}
        </div>
    )
}

export default UserInfo;