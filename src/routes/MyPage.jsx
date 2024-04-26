import {ReactComponent as ArrowRight} from '../icons/chevron_right.svg'

import GameItem from "../component/mypage/GameItem";
import UserProfile from "../component/mypage/UserProfile";
import UserProfileNav from "../component/mypage/UserProfileNav";
import ReviewItem from "../component/mypage/ReviewItem";
import FollowingItem from "../component/mypage/FollowingItem";

import '../styles/MyPage.css'
import { useEffect, useState } from "react";
import { useRouteLoaderData } from "react-router-dom";
import { defaultUserProfile, getUserProfileURL } from "../firebase/firebaseStorage";
import { getFollowingList, getUserSession } from "../api/User";
import { getReviewList } from "../api/Review";
import { getMyGames } from "../api/Proto";
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

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await getReviewList(user);
                setReviews(response.reviewList);
            } catch (error) {
                console.error('Error fetching reviews:', error);
            }
        };

        fetchReviews();
    }, [user]);

    const reviewList = reviews.map((review, index) => (
        <ReviewItem key={index} gameName={review.gameName} testCount={review.testRound} reviewText={review.reviewText} imgPath={review.imgPath} />
    ));

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
            gameId={game.testId}
            title={game.gameName.length > 15 ? game.gameName.slice(0, 15) + '...' : game.gameName}
            testCount={game.testRound}
            gameCategory={game.category}
            reviewNum={game.reviewCount}
            imgPath={game.imgPath}
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
    
    useEffect(() => {
        const fetchFollowingList = async () => {
            try {
                const response = await getFollowingList(user);
                setFollowings(response.followingList);
            } catch (error) {
                console.error('Error fetching following list:', error);
            }
        };

        fetchFollowingList();
    }, [user]);

    const followingList = followings.map((following, index) => (
        <FollowingItem key={index} userName={following.name} imgPath={following.imgPath} favCategories={[following.category1, following.category2, following.category3]}/>
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
            testId={game.gameId}
            gameCategory={game.category}
            reviewNum={game.reviewCount}
            clickable={false}
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