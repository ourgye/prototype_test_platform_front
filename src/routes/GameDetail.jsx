import Topbar from "../component/Topbar";
import Review from "../component/game/Reveiw";
import BottomBar from "../component/game/BottomBar";
import SectionHeader from "../component/game/SectionHeader";
import UserInfo from "../component/game/UserInfo";
import LongButton from '../component/sign/LongButton'
import ReviewUploadTab from "../component/game/ReviewUploadTab";
import { SummaryReview } from "../component/game/Reveiw";
import { ReactComponent as ArrowRight } from "../icons/chevron_right.svg";
import { ReactComponent as FavEmptyIcon } from '../icons/favorite_empty.svg'
import { ReactComponent as FavFillIcon } from '../icons/favorite_fill.svg'
import { ReactComponent as ShareIcon } from '../icons/share.svg'
import { ReactComponent as DownloadIcon } from '../icons/download.svg'
import { ReactComponent as DropdownIcon } from '../icons/expand_more.svg'
import {ReactComponent as SearchIcon} from '../icons/search.svg'

import '../styles/GameDetail.css'
import { useState } from "react";

// 컴포넌트로 옯겨야함 (마이페이지에도 존재)
function WhereAmI(props) {
    return (
        <div className="where-am-i">
            <div className="top-navi">
                모든 게임
            </div>
            <ArrowRight width="26px" height="26px"/>
            <div className="sub-navi">
                카테고리 이름
            </div>
            <ArrowRight width="26px" height="26px"/>
            <div className="sub-navi">
                게임 이름
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

function SearchReview() {
   return ( <div className="review-search-tab">
       <div className="dropdown-filter">
            {"모든 회차 리뷰"}
           <DropdownIcon />
        </div>
        <div className="review-search-box">
                <input className="search-input" type="text" placeholder="검색어를 입력하세요."/>
                <SearchIcon width={20} height={20} />
        </div>
    </div>)
}

function TesterReview() {
    const testOwner =
        <>
            <SummaryReview />
            <SearchReview />
        </>
    
    const tester =
        <LongButton width="90%" yellow={true} value={"리뷰 작성하러 가기"} height={"50px"} />

    return (
        <div className="game-detail-review-section">
            <SectionHeader title="테스터 리뷰" />
            <div className="game-detail-review-wrapper">
                {tester}
                {/* {testOwner} */}

                <Review feedbackDone={true} owner={true} />
                <Review feedbackDone={false} owner={true} />
                <Review />
            </div>
        </div>
    )
}


function GameDetail() {

    const test = { name: "게임 제목", round: 2, restricted_age: 19, category: "액션" }
    const [showReviewUpload, setShowReviewUpload] = useState(false);
    const [isFav, setIsFav] = useState(false);

    return (
        <>
            <header>
                <Topbar />
            </header>
            <div className="mainContainer">
                <WhereAmI />
                {showReviewUpload && <ReviewUploadTab />}
                <div className="game-detail-wrapper">
                    <div className="game-detail-header">
                        <div className="game-detail-test-round">
                            {test.round}차
                        </div>
                        <div className="game-detail-basic-info">
                            <div className="game-detail-name-age">
                                {test.name}
                                <span className="game-detail-age">{test.restricted_age}</span>
                            </div>
                            <div className="game-detail-user-name">
                                {/* 유저명 삽입해야함 */}
                                <UserInfo />
                            </div>
                        </div>
                    </div>
                    <div className="game-detail-game-summary">
                        <div className="game-detail-game-image-button">
                            <div className="game-detail-game-image"/>
                            <div className="game-detail-buttons-warpper">
                                <div className="game-detail-button" onClick={()=>setIsFav(!isFav)}>
                                    {isFav ? <FavFillIcon width = { '24px' } fill = "var(--accent)"/> : <FavEmptyIcon width={'24px'} fill="var(--accent)" />}
                                </div>
                                <div className="game-detail-button">
                                    <ShareIcon width={'24px'}/>
                                </div>
                                <div className="game-detail-button download-button">
                                    <DownloadIcon width={'24px'} />
                                </div>
                            </div>
                        </div>
                        <div className="game-detail-test-info">
                            <TestInfo title="테스터 모집 기간" body="2024.1.4 10:00AM - 2024.01.16 23:59PM"/>
                            <TestInfo title="리뷰 작성 기한"  body="2024.1.4 10:00AM"/>
                            <TestInfo title="테스터 모집 인원" body="70/100명"/>
                            <TestInfo title="테스터 연령 제한" body="만 19세 이상"/>
                        </div>
                    </div>
                    <div className="game-detail-detail-section">
                            <SectionHeader title="게임 설명" />
                    </div>
                   <TesterReview />
                </div>
                <BottomBar />
            </div>
        </>
    )
    
}

export default GameDetail;