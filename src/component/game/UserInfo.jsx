import './UserInfo.css'
import {ReactComponent as StarIcon} from '../../icons/star.svg'
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { followUser } from '../../api/Follow';

function UserInfo({gameUserName, gameUserEmail, currentUserEmail}) {
    const [showFollow, setShowFollow] = useState(false);

    const { mutate: handleFollowBtn } = useMutation({
        mutationFn: () => { return followUser(currentUserEmail, gameUserEmail) },
        onSuccess: (res) => {
            alert(res);
        },
        onError: (error) => {
            alert(error);
        }
    })

    const handleClickUserName = () => {
        setShowFollow(!showFollow);
    }

    return (
        <div className="posted-user-wrapper">
            <div className="posted-user" onClick={handleClickUserName}>
                @{gameUserName}
            </div>
            {showFollow && <div className='user-follow' onClick={handleFollowBtn}>
                    <StarIcon/>팔로우하기
            </div>}
        </div>
    )
}

export default UserInfo;