import "./UserProfile.css"

import { ReactComponent as FavIcon } from "../../icons/favorite_fill.svg";
import { ReactComponent as GameIcon } from '../../icons/videogame_asset.svg';
import { ReactComponent as ReviewIcon } from "../../icons/review_star.svg";
import { Link } from "react-router-dom";
import { defaultUserProfile } from "../../firebase/firebaseStorage";

function UserProfileImage(props) {
    return (<div className="user-profile-image-container">
        <img width={"64px"} height={"64px"} src={props.path}  className="user-profile-image"/>
        <Link className="user-profile-modify-button" to={'modify'}>프로필 수정</Link>
    </div>);
}

function UserInfoBoxItem(props) {
    return (
        <div className="user-infobox-item">
            <div className="detailed-info-name">
                {props.icon}
                <div>{props.name}</div>
            </div>
            <div className="detailed-info-num">
                {props.infoNum}
            </div>
        </div>
    )

}

function UserInfoBox(props) {
    return (
        <div className="user-page-detailed-info">
            <UserInfoBoxItem icon={ <ReviewIcon />} name={"작성한 리뷰 수"} infoNum={props.usercnt.reviewsCnt} />
            <UserInfoBoxItem icon={<GameIcon /> } name={"만든 게임 수"} infoNum={props.usercnt.gamesCnt} />
            <UserInfoBoxItem icon={ <FavIcon />} name={"팔로워 수"} infoNum={props.usercnt.followersCount} />
        </div>
    );
}

function UserProfile(props) {
    
    const imgPath = props.imgPath ?? defaultUserProfile;

    return (
        <div className="user-profile-container">
            <UserProfileImage path={imgPath} />
            <div className="user-infomation">
                <div className="user-name-bio">
                    <div className="username">{props.username}</div>
                    <div className="userbio">{props.userbio}</div>
                </div>
                <UserInfoBox usercnt={props.usercnt} />
            </div>
        </div>
    );
}

export default UserProfile;