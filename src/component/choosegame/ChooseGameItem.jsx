import './ChooseGameItem.css';
import { categoryList, categoryListKR } from '../../category';

function ChooseGameItem(props) {
    return (
        <div className={props.selected? "choose-item-container selected-game": "choose-item-container" } onClick={props.onClick}>
            <img className="game-thumbnail" src={props.imgPath} alt={props.gameName} />
            <div className="game-review-container">
                <div className="game-info-container">
                    <div className="game-name-test">
                        <div className="game-name">
                            {props.gameName.length > 50 ? props.gameName.slice(0, 50) + "..." : props.gameName}
                        </div>
                        <div className="test-count">{props.testCount+"차"}</div>
                    </div>
                    <div className="game-category">
                        {categoryListKR.at(categoryList.indexOf(props.gameCategory))}
                    </div>
                </div>
            </div>
        </div>
    )    
}

export default ChooseGameItem;
