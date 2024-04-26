import './ReviewItem.css'

import { ReactComponent as ReviewIcon } from '../../icons/review.svg'

// props : gameName, gameCategory, testCount
function ReviewItem(props) {
    return (
        <div className="review-item-contianer">
            <img className="game-thumbnail" src={props.imgPath} />
            <div className="game-review-container">
                <div className="game-info-container">
                    <div className="game-name-test">
                        <div className="game-name">
                            {props.gameName}
                        </div>
                        <div className="test-count">{props.testCount+"차"}</div>
                    </div>
                    <div className="game-category">
                        {props.gameCategory}
                    </div>
                </div>
                <div className="my-review">
                    <ReviewIcon height={"28px"} width={"28px"} />
                    <div className="review-preview">
                        {props.reviewText}
                    </div>
                </div>
            </div>
        </div>
    )    
}

export default ReviewItem;
