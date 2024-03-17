import './ReviewUploadTab.css'
import {ReactComponent as CloseIcon} from '../../icons/close.svg'

function ReviewUploadTab() {
    const gameReview={gamename: "게임 제목: 찬란한 나날들", username: "말린사과", userage: 33, usergender: "여"}
    return (
        <div className="review-upload-tab">
            <div className="review-upload-tab-header">
                <div className="review-upload-close">
                    <div className="close-icon">
                        <CloseIcon width={'24px'} height={'24px'}/>                   
                    </div>
                </div>
                <div className="review-upload-game-name">{gameReview.gamename}</div>
                <div className="review-upload-user-info">
                    {gameReview.username + ', ' + gameReview.userage + ', ' + gameReview.usergender}
                </div>
                {/* 아마도 라인?  */}
            </div>
            <div className="review-upload-tab-body">
                <textarea className='review-upload-textarea' placeholder='리뷰를 작성해주세요!'></textarea>
            </div>
            <div className="review-upload-buttons">
                <div className="review-upload-upload-button">
                    리뷰 게시하기
                </div>
                <div className="review-upload-summary-button">
                    다른 사용자들의 피드백 보기
                </div>
            </div>
        </div>
    )
}

export default ReviewUploadTab;