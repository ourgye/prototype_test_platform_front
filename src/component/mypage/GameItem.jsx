import './GameItem.css'
import { ReactComponent as ReviewIcon } from '../../icons/review.svg';
import { Link } from 'react-router-dom';
import { categoryListKR, categoryList } from '../../category';

// props: title, testCount, gameCategory, reviewNum
function GameItem(props) {
    const imgDefault = "https://firebasestorage.googleapis.com/v0/b/game-proto-8ffe0.appspot.com/o/turtoise.jpg?alt=media&token=a7d01c00-829f-4163-994e-6811a72cf632"
    
    return (<Link className='game-item-wrapper' to={props.clickable? `/game/${props.testId}` : ''}>
        <img className='game-mypage-thumbnail-img' src={props.imgPath ?? imgDefault}/>
        <div className="game-description">
            <div className='game-description-left'>
                <div className="title-count">
                    <div className="game-title">{props.title}</div>
                    <div className="test-count-mypage">{props.testCount+"차"}</div>
                </div>
                <div className="game-category">
                    {categoryListKR[categoryList.indexOf(props.gameCategory)]}
                </div>
            </div>
            <div className="review-num">
                <div>
                     {props.reviewNum}
                </div>
                <ReviewIcon height={"20px"} width={"20px"} />
            </div>
        </div>
    </Link>);
}

export default GameItem;