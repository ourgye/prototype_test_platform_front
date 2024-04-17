import './Review.css'
import {ReactComponent as DropdownIcon} from '../../icons/expand_more.svg'
import {ReactComponent as ToggleOnIcon} from '../../icons/toggle_on.svg'
import {ReactComponent as ToggleOffIcon} from '../../icons/toggle_off.svg'

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
                    {props.owner && (hasFeedback? ownerFeedback : <div className="feedback-done-box">피드백 완료</div>)} 
                    {props.round + "차"}
                </div>
            </div>
            <div className="review-content">
                {data.reviewText}
            </div>
        </div>
    );
}

export function SummaryReview(props) { 
    const user = {
        name: "멋진 멜론", age: "21", gender: '여자', test: 3, feedbackDone: true, review: "대법원에 대법관을 둔다. 다만, 법률이 정하는 바에 의하여 대법관이 아닌 법관을 둘 수 있다. 계엄을 선포한 때에는 대통령은 지체없이 국회에 통고하여야 한다. 국가는 여자의 복지와 권익의 향상을 위하여 노력하여야 한다. 교육의 자주성·전문성·정치적 중립성 및 대학의 자율성은 법률이 정하는 바에 의하여 보장된다. 국가안전보장에 관련되는 대외정책·군사정책과 국내정책의 수립에 관하여 국무회의의 심의에 앞서 대통령의 자문에 응하기 위하여 국가안전보장회의를 둔다. 국가의 세입·세출의 결산, 국가 및 법률이 정한 단체의 회계검사와 행정기관 및 공무원의 직무에 관한 감찰을 하기 위하여 대통령 소속하에 감사원을 둔다."}
    
    return (
        <div className={"game-review-wrapper tester-feedback-summary"}>
            <div className="game-header">
                <div className="user-information">
                    <h2>테스터 피드백 요약</h2>
                </div>
                <div className='feedback-and-count clickable'>
                    {user.test + "차"}
                    <DropdownIcon />
                </div>
            </div>
            <div className="review-content">
                {user.review}
            </div>
        </div>
    );
}