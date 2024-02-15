import "./UserProfile.css"

import { ReactComponent as FavIcon } from "../../icons/favorite_fill.svg";
import { ReactComponent as VisitedIcon } from "../../icons/people_black.svg";
import { ReactComponent as GameIcon } from '../../icons/videogame_asset.svg';
import { ReactComponent as ReviewIcon } from "../../icons/review_star.svg";

function UserProfileImage(props) {
    return (<div className="user-profile-image-container">
        <div className="user-profile-image"><image width={"64px"} height={"64px"} /></div>
        <button className="user-profile-modify-button">프로필 수정</button>
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
            <UserInfoBoxItem icon={ <VisitedIcon />} name={"방문자 수"} infoNum={"123"} />
            <UserInfoBoxItem icon={ <ReviewIcon />} name={"작성한 리뷰 수"} infoNum={"123"} />
            <UserInfoBoxItem icon={<GameIcon /> } name={"만든 게임 수"} infoNum={"123"} />
            <UserInfoBoxItem icon={ <FavIcon />} name={"팔로워 수"} infoNum={"123"} />
        </div>
    );
}

function UserProfile(props) { 
    return (
        <div className="user-profile-container">
            <UserProfileImage />
            <div className="user-infomation">
                <div className="user-name-bio">
                    <div className="username"> 사용자 이름</div>
                    <div className="userbio">Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae beatae obcaecati dicta numquam qui similique doloribus corrupti eum ipsam ad aspernatur perferendis temporibus corporis harum incidunt cumque quos, a non!</div>
                </div>
                <UserInfoBox/>
            </div>
        </div>
    );
}

export default UserProfile;