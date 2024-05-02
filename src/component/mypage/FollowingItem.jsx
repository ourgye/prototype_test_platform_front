import { useEffect, useState } from 'react';
import { categoryList, categoryListKR } from '../../category';
import './FollowingItem.css'
import { defaultUserProfile, getUserProfileURL } from '../../firebase/firebaseStorage';
import { useMutation } from '@tanstack/react-query';
import { unfollowUser } from '../../api/Follow';

function FavCategory(props) {
    return (
        <div className="fav-category">
            {props.category}
        </div>
    )

}

function FollowingItem({ userName, imgPath, favCategories, userEmail, currentUserEmail, setClickUnfollow}) {
    const [userImg, setUserImg] = useState();
    
    useEffect(() => {
        if (!imgPath) { 
            setUserImg(defaultUserProfile); 
            return;
        }

        getUserProfileURL(userEmail).then((url) => {
          setUserImg(url);
        });
    }, [userEmail, userImg]);    
    

    const { mutate: handleUnfollowBtn } = useMutation({
        mutationFn: () => { return unfollowUser(currentUserEmail, userEmail) },
        onSuccess: (res) => {
            alert(res);
            setClickUnfollow(true);
        },
        onError: (error) => {
            alert(error);
        }
    })

    return (
        <div className="following-item-container">
            <img className="profile-thumbnail" src={userImg} alt={userName} />
            <div className="following-info">
                <div className="following-name-fav">
                    <div className="following-name">
                        {userName}
                    </div>
                    <div className="following-fav">
                        {favCategories.map((category, index) => {
                            return <FavCategory category={categoryListKR.at(categoryList.indexOf(category))} />
                        })}
                    </div>
                </div>
                <button className="unfollow-btn" onClick={handleUnfollowBtn}>
                    언팔로우
                </button>
            </div>
        </div>
    )
}

export default FollowingItem;