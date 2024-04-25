import LongButton from '../sign/LongButton'
import { SummaryReview } from "./Reveiw";
import Review from "./Reveiw";
import {getReviewListOfTest, getReviewSummary, searchReview } from "../../api/Review";
import SectionHeader from "./SectionHeader";
import { useEffect, useState } from 'react';

import { ReactComponent as DropdownIcon } from '../../icons/expand_more.svg'
import {ReactComponent as SearchIcon} from '../../icons/search.svg'

import './TesterReview.css'
import { useMutation } from '@tanstack/react-query';

function SearchReview({value, setValue, onClickSearch}){ 
    return (
        <div className="review-search-tab">
            <div className="dropdown-filter">
                {"모든 회차 리뷰"}
                {/* <DropdownIcon /> */}
            </div>
            <div className="review-search-box">
                <input className="search-input" type="text" placeholder="검색어를 입력하세요."  value={value} onChange={(e)=>{setValue(e.target.value)}}/>
                <div onClick={onClickSearch}>
                    <SearchIcon width={20} height={20} />
                </div>
            </div>
        </div>
    )
}


function TesterReview({ testId, onClickReviewWrite, owner }) {
    const [isExpand, setIsExpand] = useState(true);
    
    const [reviewData, setReviewData] = useState(); 
    const [reviewList, setReviewList] = useState([]);
    const [reviewSummaryData, setReviewSummaryData] = useState({});
    const [keyword, setKeyword] = useState('');

    useEffect(() => {
        getReviewListOfTest(testId).then((res) => {
            setReviewData(res);
            if(res) setReviewList(res.reviewList);
        })

    }, [testId]);
    
    useEffect(() => {
        getReviewSummary(testId).then((res) => {
            setReviewSummaryData(res);
            console.log("res", res)
        }).catch((error) => {
            console.log(error);
        })
    }, [testId]);

    const { mutate: getKeywordReview } = useMutation({
        mutationFn: () => {
            if (keyword == '') {
                return getReviewListOfTest(testId)
            } else {
                return searchReview(testId, keyword, reviewSummaryData.testRound)
            }
        },
        onSuccess: (res) => {
            setReviewList(res.reviewList);
        },
        onError: (error) => {
            console.error(error);
        }
    });


    const testOwner =
        <>
            <SummaryReview testId={testId} reviewSummaryData={reviewSummaryData} />
            <SearchReview value={keyword} setValue={setKeyword} onClickSearch={getKeywordReview} />
        </>
    
    const tester =
        <LongButton width="90%" yellow={true} value={"리뷰 작성하러 가기"} height={"50px"} onClick={onClickReviewWrite} />

    return (
        <div className="game-detail-review-section">
            <SectionHeader title="테스터 리뷰" onClickArrow={setIsExpand} isExpand={isExpand} />
            {isExpand &&
                <>
                    {owner ? testOwner : tester}
                    <div className="game-detail-review-wrapper">
                        {(reviewData && reviewList.length > 0)? reviewList.map((review) => {
                            return <Review round={reviewData['testRound']} data={review} feedbackDone={review.feedbackDone} owner={owner} />
                        }) : <div className='game-detail-no-review'>아직까지 작성된 리뷰가 없습니다.</div>}
                    </div>
                    </>
            }
        </div>
    )
}

export default TesterReview;