import Review from "../component/game/Reveiw";
import BottomBar from "../component/game/BottomBar";
import SectionHeader from "../component/game/SectionHeader";
import UserInfo from "../component/game/UserInfo";
import TesterReview from "../component/game/TesterReview";
import ReviewUploadTab from "../component/game/ReviewUploadTab";
import { SummaryReview } from "../component/game/Reveiw";
import { ReactComponent as ArrowRight } from "../icons/chevron_right.svg";
import { ReactComponent as FavEmptyIcon } from '../icons/favorite_empty.svg'
import { ReactComponent as FavFillIcon } from '../icons/favorite_fill.svg'
import { ReactComponent as ShareIcon } from '../icons/share.svg'
import { ReactComponent as DownloadIcon } from '../icons/download.svg'

import { categoryListKR, categoryList } from "../category";

import '../styles/GameDetail.css'
import { useEffect, useState } from "react";
import { useLoaderData, useParams } from "react-router-dom";
import { getUserSession } from "../api/User";
import { useMutation } from "@tanstack/react-query";
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { deleteFav, postFav } from "../api/Fav";
import { engageGame } from "../api/Proto";

const gameStatus = ["recruiting","reviewing", "done", "yet"];

// 컴포넌트로 옯겨야함 (마이페이지에도 존재)
function WhereAmI({categoryName, gameName}) {
    return (
        <div className="where-am-i">
            <div className="top-navi">
                모든 게임
            </div>
            <ArrowRight width="26px" height="26px"/>
            <div className="sub-navi">
                {categoryListKR[categoryList.indexOf(categoryName)]}
            </div>
            <ArrowRight width="26px" height="26px"/>
            <div className="sub-navi">
                {gameName}
            </div>
        </div>
    )
}

function TestInfo(props) {
    // body api 고려해서 수정 필요
    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "4px"}}>
            <div className="game-detail-test-info-title">
                {props.title}
            </div>
            <div className="game-detail-test-info-body">
                {props.body}
            </div>
        </div>
    )
}


function parseDate(date) {
    const parsedDate = new Date(date);

    return parsedDate.getFullYear() + "-" + (parsedDate.getMonth() + 1) + "-" + parsedDate.getDate();
}

function getGameStatus(today, startDate, endDate, reviewDate) { 
    // 테스트 사용자 모집기간(테스트 시작 ~ 테스트 종료 전) -> 리뷰 작성기간(테스트 종료 후 ~ 리뷰 마감일 전) -> 리뷰 마감일 후(테스트 종료 후
    if (today < startDate) {
        return gameStatus[3];
    } else if (today >= startDate && today <= endDate) {
        return gameStatus[0];
    } else if (today > endDate && today <= reviewDate) {
        return gameStatus[1];
    } else if (today > reviewDate) {
        return gameStatus[2];
    }
}

function GameDetail() {
    // 화면 이동시 맨위로 이동
    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);
    

    const gameInfo = useLoaderData('gameDetail');
    const [showReviewUpload, setShowReviewUpload] = useState(false);
    const [isFav, setIsFav] = useState(false);
    const [isExpandDesc, setIsExpandDesc] = useState(true);    
    const params = useParams(); 
    const today = new Date();
    const testStartdate = new Date(gameInfo.startDate); 
    const testEnddate = new Date(gameInfo.endDate);
    const reviewEnddate = new Date(gameInfo.reviewDate);

    const currentGameStatus = getGameStatus(today, testStartdate, testEnddate, reviewEnddate);
    const userInfo = getUserSession(); 
    
    const { mutate: handleClickFavPost } = useMutation({
        mutationFn: () => { return postFav(userInfo.email, params.testId) },
        onSuccess: (res) => {
            setIsFav(true);
            alert(res); 
        }
    });

    const { mutate: handleClickFavDelete } = useMutation({
        mutationFn: () => { return deleteFav(userInfo.email, params.testId) },
        onSuccess: (res) => {
            setIsFav(false);
            alert(res); 
        }
    });

    const handleClickFav = () => {
        // 로그인 확인
        if (!userInfo) {
            alert("로그인이 필요한 서비스입니다.");
            return;
        }

        if(isFav) {
            handleClickFavDelete();
        } else {
            handleClickFavPost();
        }
    }

    // 게임 참여하기 버튼 클릭시
    const { mutate: handleClickParticipate } = useMutation({
        mutationFn: () => { return engageGame(params.testId, userInfo.email) },
        onSuccess: (res) => {
            alert(res);
        },
        onError: (error) => {
            if (error == "Error: Forbidden") { 
                alert("로그인이 필요한 서비스입니다.");
                return;
            }
            alert(error);
        }
    });

    // 현재 페이지 복사
    const CopyUrlButton = () => {
        const currentUrl = window.location.href;
        const handleCopyUrl = () => {
            navigator.clipboard.writeText(currentUrl)
                .then(() => {
                    // toast message
                    toast("클립보드에 복사되었습니다", {
                        position: "bottom-center",
                        autoClose: 2000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: false,
                        progress: undefined,
                        theme: "colored",
                        transition: Bounce,
                    });
                })
                .catch((error) => {
                    toast.error("클립보드에 복사가 실패하였습니다",{
                        position: "bottom-center",
                        autoClose: 2000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: false,
                        progress: undefined,
                        theme: "colored",
                        transition: Bounce,
                    });
                });
        }

        handleCopyUrl();
        
    };
    
    return (
        <>
            <ToastContainer />
            <WhereAmI gameName={gameInfo.gameName} categoryName={gameInfo.category}/>
            {showReviewUpload && <ReviewUploadTab gameName={gameInfo.gameName} userName={userInfo.userName} onClickClose={()=>{setShowReviewUpload(false)}} testId={params.testId}/>}
            <div className="game-detail-wrapper">
                <div className="game-detail-header">
                    <div className="game-detail-test-round">
                        {gameInfo.round}차
                    </div>
                    <div className="game-detail-basic-info">
                        <div className="game-detail-name-age">
                            {gameInfo.gameName}
                            {/* <span className="game-detail-age">{test.restricted_age}</span> */}
                        </div>
                        <div className="game-detail-user-name">
                            <UserInfo gameUserName={gameInfo.userName} gameUserEmail={gameInfo.userEmail} currentUserEmail={userInfo.email}/>
                        </div>
                    </div>
                </div>
                <div className="game-detail-game-summary">
                    <div className="game-detail-game-image-button">
                        <img className="game-detail-game-image" src={gameInfo.imgPath} />
                        <div className="game-detail-buttons-warpper">
                            <div className="game-detail-button" onClick={handleClickFav}>
                                {isFav ? <FavFillIcon width = { '24px' } fill = "var(--accent)"/> : <FavEmptyIcon width={'24px'} fill="var(--accent)" />}
                            </div>
                            <div className="game-detail-button" onClick={CopyUrlButton}>
                                <ShareIcon width={'24px'}/>
                            </div>
                            <a className="game-detail-button download-button" href={gameInfo.downloadLink} download={gameInfo.gameName} >
                                <DownloadIcon width={'24px'} />
                            </a>
                        </div>
                    </div>
                    <div className="game-detail-test-info">
                        <TestInfo title="테스터 모집 기간" body={parseDate(gameInfo.startDate) +" ~ "+parseDate(gameInfo.endDate)} />
                        <TestInfo title="리뷰 작성 기한" body={parseDate(gameInfo.reviewDate)} />
                        <TestInfo title="테스터 모집 인원" body={gameInfo.recruitedTotal+"명"} />
                        {/* <TestInfo title="테스터 연령 제한" body="만 19세 이상"/> */}
                    </div>
                </div>
                <div className="game-detail-detail-section">
                    <SectionHeader title="게임 설명" isExpand={isExpandDesc} onClickArrow={setIsExpandDesc} />
                    {isExpandDesc && <div className="game-detail-description" dangerouslySetInnerHTML={{ __html: gameInfo.description }} />}
                </div>
                <TesterReview currentGameStatus={currentGameStatus} gameId={gameInfo.gameId} testId={params.testId} onClickReviewWrite={()=>setShowReviewUpload(true)} owner={userInfo.userId == gameInfo.userId}/>
            </div>
            <BottomBar currentGameStatus={currentGameStatus} currentUser={userInfo} gameMaker={gameInfo.userId} onClickButton={handleClickParticipate} />
        </>
    )
    
}

export default GameDetail;