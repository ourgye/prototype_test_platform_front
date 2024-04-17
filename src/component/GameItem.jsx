import '../styles/GameItem.css'

export default function RecommendItem(props) { 
    return (
        <div className="game-item-main">
            <img src={props.imgPath} alt={props.gameName} className="thumbnail-main" />
            <div className="game-name-main">
                {props.gameName.length > 20 ? props.gameName.slice(0, 20) + "..." : props.gameName}
            </div>
        </div>
    )
}