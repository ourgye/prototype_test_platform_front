import TopBar from "../component/Topbar";
import {ReactComponent as ArrowRight} from '../icons/chevron_right.svg'

import GameItem from "../component/mypage/GameItem";
import UserProfile from "../component/mypage/UserProfile";
import UserProfileNav from "../component/mypage/UserProfileNav";
import ReviewItem from "../component/mypage/ReviewItem";
import FollowingItem from "../component/mypage/FollowingItem";

import '../styles/MyPage.css'
import { useState } from "react";

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
function ReviewList() {
    const reviewList = Array.from({ length: 10 }, (_, index) => {
        return (<ReviewItem gameName="게임 이름" testCount="3" gameCategory="게임 카테고리"/>); 
    });

    return (
        <div className="review-list inner-list">
        {reviewList}
        </div>
    )
}


function GameList() {
    const gameList = Array.from({ length: 10 }, (_, index) => {
        return (<GameItem title="게임 이름" testCount="3" gameCategory="게임 카테고리" reviewNum="42"/>); 
    });

    return (
        <div className="game-list inner-list">
        {gameList}
        </div>
    )
}

function FollowingList() {
    const followingList = Array.from({ length: 10 }, (_, index) => {
        return (<FollowingItem />)
    })

    return (
        <div className="following-list inner-list">
            {followingList}
        </div>
    );
}


function FavGameList() {
    const favGameList = Array.from({ length: 10 }, (_, index) => {
        return (<GameItem title="찜 게임 이름" testCount="3" gameCategory="게임 카테고리" reviewNum="42"/>)
    })

    return (
        <div className="game-list inner-list">
        {favGameList}
        </div>
    )
}

function MyPage() {
    const [whichClicked, setWhichClicked] = useState(4);

    const DisplayedList = () => {
        switch (whichClicked) {
            case 2: 
                return <ReviewList />
            case 3: 
                return <FollowingList />
            case 4: 
                return <FavGameList />
            default: 
                return <GameList />
        }
    }


    return (<>
        <TopBar/>
        <div className="mainContainer">
            <WhereAmI />
            <div className="mypage-container">
                <UserProfile />
                <div className="mypage-inner-tab">
                    <UserProfileNav whichClicked={whichClicked} onClick={setWhichClicked} />
                    {DisplayedList()}
                </div>
            </div>
        </div>
    </>);
}

export default MyPage; 