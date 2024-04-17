import LongButton from '../sign/LongButton'
import { SummaryReview } from "./Reveiw";
import Review from "./Reveiw";
import {getReviewListOfTest } from "../../api/Review";
import SectionHeader from "./SectionHeader";
import { useEffect, useState } from 'react';

import { ReactComponent as DropdownIcon } from '../../icons/expand_more.svg'
import {ReactComponent as SearchIcon} from '../../icons/search.svg'

function SearchReview() {
    return (<div className="review-search-tab">
        <div className="dropdown-filter">
            {"모든 회차 리뷰"}
            <DropdownIcon />
        </div>
        <div className="review-search-box">
            <input className="search-input" type="text" placeholder="검색어를 입력하세요." />
            <SearchIcon width={20} height={20} />
        </div>
    </div>)
}


function TesterReview({ testId }) {
    const [isExpand, setIsExpand] = useState(true);
    
    const [reviewData, setReviewData] = useState(); 
    const [reviewList, setReviewList] = useState([]);

    useEffect(() => {
        getReviewListOfTest(testId).then((res) => {
            setReviewData(res);
            if(res) setReviewList(res.reviewList);
        })
    }, [testId]); 

    const testOwner =
        <>
            <SummaryReview />
            <SearchReview />
        </>
    
    const tester =
        <LongButton width="90%" yellow={true} value={"리뷰 작성하러 가기"} height={"50px"} />

    return (
        <div className="game-detail-review-section">
            <SectionHeader title="테스터 리뷰" onClickArrow={setIsExpand} isExpand={isExpand} />
            {isExpand &&
                <div className="game-detail-review-wrapper">
                    {reviewData? reviewList.map((review) => {
                        return <Review round={reviewData['testRound']} data={review} feedbackDone={review.feedbackDone} owner={false} />
                    }) : <div>리뷰가 없습니다.</div>}
                </div>}
        </div>
    )
}

export default TesterReview;