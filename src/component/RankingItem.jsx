import '../styles/RankingItem.css'

export default function RankingItem(props) { 
    return (
        <div className="ranking-item">
            <img className="ranking-thumbnail" src={props.imgPath} alt={props.gameName} />
            <div className="rank-game-item-tab">
                <div className="rank-num">
                    {props.rank}
                </div>
                <div className="rank-item-game-description">
                    <div className="game-name">
                        {props.gameName.length > 20 ? props.gameName.slice(0, 20) + "..." : props.gameName}
                    </div>
                    <div className="game-category">
                        {props.category}
                    </div>
                </div>
            </div>
        </div>
    )
}