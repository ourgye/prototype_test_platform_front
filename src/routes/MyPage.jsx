import {ReactComponent as ArrowRight} from '../icons/chevron_right.svg'

import GameItem from "../component/mypage/GameItem";
import UserProfile from "../component/mypage/UserProfile";
import UserProfileNav from "../component/mypage/UserProfileNav";
import ReviewItem from "../component/mypage/ReviewItem";
import FollowingItem from "../component/mypage/FollowingItem";

import '../styles/MyPage.css'
import { useEffect, useState } from "react";
import { useLocation, useRouteLoaderData } from "react-router-dom";
import { defaultUserProfile, getUserProfileURL } from "../firebase/firebaseStorage";
import { getFollowingList, getUserSession } from "../api/User";
import { getReviewList } from "../api/Review";
import { getEngagedList, getMyGames } from "../api/Proto";
import { getFav } from '../api/Fav';

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
function ReviewList({user}) {
    const [reviews, setReviews] = useState([]);
    const [engagedList, setEngagedList] = useState([]);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await getReviewList(user);
                setReviews(response.reviewList);
            } catch (error) {
                console.error('Error fetching reviews:', error);
            }
        };

        const fetchEngageGames = async () => {
            try {
                const response = await getEngagedList(user);
                setEngagedList(response);
            } catch (error) {
                console.error('Error fetching engage games:', error);
            }
        }

        fetchReviews();
        fetchEngageGames();
    }, [user]);

    const reviewList = engagedList.map((test, i) => {
        const index = reviews.findIndex(review => review.testId === test.testId);
        console.log("reviewlist", index)
        if (index !== -1) {
            return <ReviewItem key={test.testId} gameName={test.gameName} testCount={test.round} reviewText={reviews[index].reviewText} imgPath={test.imgPath} />
          } else {
            return <ReviewItem key={test.testId} gameName={test.gameName} testCount={test.round} reviewText={"리뷰를 아직 작성하지 않았습니다."} imgPath={test.imgPath} />
        }
   });

    return (
        <div className="review-list inner-list">
        {reviewList}
        </div>
    )
}


function GameList({ user }) {
    const [games, setGames] = useState([]);

    useEffect(() => {
        const fetchGames = async () => {
            try {
                const response = await getMyGames(user);
                setGames(response.gameList);
            } catch (error) {
                console.error('Error fetching made games:', error);
            }
        };

        fetchGames();
    }, [user]);

    const gameList = games.map((game, index) => (
        <GameItem key={index}
            testId={game.testId}
            title={game.gameName.length > 15 ? game.gameName.slice(0, 15) + '...' : game.gameName}
            testCount={game.testRound}
            gameCategory={game.category}
            reviewNum={game.reviewCount}
            imgPath={game.imgPath}
            clickable={true}
        />
    ));

    return (
        <div className="game-list inner-list">
        {gameList}
        </div>
    )
}

function FollowingList({user}) {
    const [followings, setFollowings] = useState([]);
    const [clickUnfollow, setClickUnfollow] = useState(false);

    useEffect(() => {
        const fetchFollowingList = async () => {
            try {
                const response = await getFollowingList(user);
                setFollowings(response.followingList);
            } catch (error) {
                console.error('Error fetching following list:', error);
            }

            if (clickUnfollow) setClickUnfollow(false);
        };

        fetchFollowingList();
    }, [user, clickUnfollow]);

    const followingList = followings.map((following, index) => (
        <FollowingItem key={index} userName={following.userName} imgPath={following.imgPath} favCategories={[following.category1, following.category2, following.category3]} userEmail={following.userEmail} currentUserEmail={user} setClickUnfollow={setClickUnfollow} />
    ));


    return (
        <div className="following-list inner-list">
            {followingList}
        </div>
    );
}


function FavGameList({user}) {
    const [favGames, setFavGames] = useState([]);

    useEffect(() => {
        const fetchFavGames = async () => {
            try {
                const response = await getFav(user);
                setFavGames(response.dibsList);
            } catch (error) {
                console.error('Error fetching favorite games:', error);
            }
        };

        fetchFavGames();
    }, [user]);


    const favGameList = favGames.map((game, index) => (
        <GameItem
            key={index}
            title={game.gameName.length > 15 ? game.gameName.slice(0, 15) + '...' : game.gameName}
            testCount={game.round}
            imgPath={game.imgPath}
            testId={game.testId}
            gameCategory={game.category}
            reviewNum={game.reviewCount}
            clickable={true}
        />
    ));
    
    return (
        <div className="game-list inner-list">
        {favGameList}
        </div>
    )
}

function MyPage() {
    const userinfo = useRouteLoaderData('mypageindex');
    const user = userinfo.user;
    const userEmail = getUserSession().email;

    
    const [userImg, setUserImg] = useState();

    useEffect(() => {
      getUserProfileURL(userEmail).then((url) => {
        setUserImg(url);
      });
    }, [userEmail]);
    

    const [whichClicked, setWhichClicked] = useState(1);

    const DisplayedList = () => {
        switch (whichClicked) {
            case 2: 
                return <ReviewList user={userEmail} />
            case 3: 
                return <FollowingList user={userEmail}/>
            case 4: 
                return <FavGameList user={userEmail} />
            default: 
                return <GameList user={userEmail}/>
        }
    }

   
    return (<>
        <WhereAmI />
        <div className="mypage-container">
            <UserProfile username={user.name} userbio={user.bio} imgPath={userImg} usercnt={userinfo.userCount} />
            <div className="mypage-inner-tab">
                <UserProfileNav whichClicked={whichClicked} onClick={setWhichClicked}/>
                {DisplayedList()}
            </div>
        </div>
    </>);
}

export default MyPage; 