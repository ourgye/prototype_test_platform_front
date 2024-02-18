import './ReviewItem.css'

import { ReactComponent as ReviewIcon } from '../../icons/review.svg'

// props : gameName, gameCategory, testCount
function ReviewItem(props) {
    return (
        <div className="review-item-contianer">
            <div className="game-thumbnail">
                {/* image */}
            </div>
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
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum hic a dolores, natus, accusantium qui earum repudiandae quo nihil illo ad et? Nobis quas inventore culpa, ex ad doloribus. Sed?
                    </div>
                </div>
            </div>
        </div>
    )    
}

export default ReviewItem;
