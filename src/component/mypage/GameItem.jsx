import './GameItem.css'
import { ReactComponent as ReviewIcon } from '../../icons/review.svg';

// props: title, testCount, gameCategory, reviewNum
function GameItem(props) {

    return (<div className='gameItem'>
        <div className='gameThumbnailImg'></div>
        <div className="gameDescription">
            <div className='GDLeft'>
                <div className="titleNcount">
                    <div className="gameTitle">{props.title}</div>
                    <div className="testCount">{props.testCount+"차"}</div>
                </div>
                <div className="gameCategory">
                    {props.gameCategory}
                </div>
            </div>
            <div className="reviewNum">
                <div>
                     {props.reviewNum}
                </div>
                <ReviewIcon height={"20px"} width={"20px"} />
            </div>
        </div>
    </div>);
}

export default GameItem;