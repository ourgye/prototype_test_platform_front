import LongButton from '../sign/LongButton'
import { SummaryReview } from "./Reveiw";
import Review from "./Reveiw";
import {getReviewByRound, getReviewListOfTest, getReviewSummary, searchReview } from "../../api/Review";
import SectionHeader from "./SectionHeader";
import { useEffect, useState } from 'react';

import { ReactComponent as DropdownIcon } from '../../icons/expand_more.svg'
import {ReactComponent as SearchIcon} from '../../icons/search.svg'

import './TesterReview.css'
import { useMutation } from '@tanstack/react-query';
import { set } from 'firebase/database';
import { getTotalTestRound } from '../../api/Proto';

function SearchReview({ value, setValue, onClickSearch, totalTestRound, selectedRound, setSelectedRound }) { 
    const ReviewFilter = ({ totalRounds }) => {
        const handleRoundChange = (event) => {
          setSelectedRound(Number(event.target.value));
        };
      
        const roundOptions = Array.from({ length: totalRounds }, (_, index) => index + 1);
      
        return (
          <div className="dropdown-filter">
            <select className="dropdown-select" value={selectedRound} onChange={handleRoundChange}>
                    <option key={-1} value={-1}>모든 회차 리뷰</option>
              {roundOptions.map((round) => (
                <option key={round} value={`${round}`}>
                      {round}회차
                  </option>
              ))}
            </select>
           
          </div>
        );
      };

    return (
        <div className="review-search-tab">
            <ReviewFilter totalRounds={totalTestRound} />
            <div className="review-search-box">
                <input className="search-input" type="text" placeholder="검색어를 입력하세요."  value={value} onChange={(e)=>{setValue(e.target.value)}}/>
                <div onClick={onClickSearch}>
                    <SearchIcon width={20} height={20} />
                </div>
            </div>
        </div>
    )
}


function TesterReview({ testId, gameId, onClickReviewWrite, owner, userEmail, totalTestRound}) {    
    const [isExpand, setIsExpand] = useState(true);
    const [testRound, setTestRound] = useState(0);
    const [selectedRound, setSelectedRound] = useState(-1);
    const [reviewData, setReviewData] = useState(); 
    const [reviewList, setReviewList] = useState([]);
    const [reviewSummaryData, setReviewSummaryData] = useState({});
    const [keyword, setKeyword] = useState('');

    // 리뷰 가져오기
    useEffect(() => {
        const fetchReviews = async () => {
            const res = await getReviewByRound(gameId, selectedRound);
            setReviewData(res);
            if (res.reviewsCnt > 0) setReviewList(res.reviewList);
        };
      
        fetchReviews();
      }, [testId, selectedRound]);
    
    useEffect(() => {
        getReviewSummary(testId).then((res) => {
            setReviewSummaryData(res);
            console.log("res", res)
        }).catch((error) => {
            console.log(error);
        })
    }, [testId]);

    useEffect(() => {
        getTotalTestRound(testId).then((res) => {
            setTestRound(res.roundsCnt);
        }).catch((error) => {
            console.log(error);
        })
    }, [testId]);   

    const { mutate: getKeywordReview } = useMutation({
        mutationFn: () => {
            if (keyword == '') {
                return getReviewListOfTest(gameId)
            } else {
                return searchReview(gameId, keyword, selectedRound)
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
            <SummaryReview testId={testId} gameId={gameId} reviewSummaryData={reviewSummaryData} totalTestRound={testRound} selectedRound={selectedRound}  setSelectedRound={setSelectedRound} />
            <SearchReview value={keyword} setValue={setKeyword} onClickSearch={getKeywordReview} totalTestRound={testRound} selectedRound={selectedRound}  setSelectedRound={setSelectedRound}/>
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
                            return <Review round={review['testRound']} data={review} feedbackDone={review.feedbackDone} owner={owner} userEmail={userEmail} />
                        }) : <div className='game-detail-no-review'>아직까지 작성된 리뷰가 없습니다.</div>}
                    </div>
                    </>
            }
        </div>
    )
}

export default TesterReview;