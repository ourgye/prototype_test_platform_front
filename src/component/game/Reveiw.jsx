import './Review.css'
import {ReactComponent as DropdownIcon} from '../../icons/expand_more.svg'
import {ReactComponent as ToggleOnIcon} from '../../icons/toggle_on.svg'
import {ReactComponent as ToggleOffIcon} from '../../icons/toggle_off.svg'
import { getReviewSummary } from '../../api/Review'
import { useEffect, useState } from 'react';
import { get } from 'firebase/database'

const genderKR = {"MALE": "남자", "FEMALE": "여자", "NONE": "선택안함"};

export default function Review(props) {
    const data = props.data;    
    const hasFeedback = data.reviewReflected != 'N'? true : false;

    const ownerFeedback =
        <div className={hasFeedback ? "feedback-done-box": "feedback-done-box feedback-not-done"}>
            피드백 개선 
            {hasFeedback ? <>
                <ToggleOnIcon width={"24px"} height={"24px"}/> 
            </> :
            <>
                <ToggleOffIcon width={"24px"} height={"24px"} />
            </>
            }
    </div> 
    
    return (
        <div className={hasFeedback? "game-review-wrapper feedback-done" : "game-review-wrapper"}>
            <div className="game-header">
                <div className="user-information">
                    <h2>{data.userName}</h2>
                    <p>{genderKR[data.userGender]}</p>
                </div>
                <div className='feedback-and-count'>
                    {props.owner ? ownerFeedback : (hasFeedback ? <div className="feedback-done-box">피드백 완료</div> : '')} 
                    {props.round + "차"}
                </div>
            </div>
            <div className="review-content">
                {data.reviewText}
            </div>
        </div>
    );
}

export function SummaryReview({testId, reviewSummaryData}){ 

    return (
        <div className={"game-review-wrapper tester-feedback-summary"}>
            <div className="game-header">
                <div className="user-information">
                    <h2>테스터 피드백 요약</h2>
                </div>
                <div className='feedback-and-count clickable'>
                    {reviewSummaryData.testRound ? reviewSummaryData.testRound + "차" : ''}
                    {/* <DropdownIcon /> */}
                </div>
            </div>
            <div className="review-content">
                {reviewSummaryData.reviewSummaryText ?? '아직 피드백이 없습니다.'}
            </div>
        </div>
    );
}