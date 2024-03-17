import '../styles/RankingItem.css'

export default function RankingItem(props) { 
    return (
        <div className="rankingItem">
            <div className="rankingThumbnail">
                <img src={props.imgsrc} alt="rankingThumbnail" />
            </div>
            <div className="rank-game-item-tab">
                <div className="rankNum">
                    {props.rank}
                </div>
                <div className="rank-item-game-description">
                    <div className="gameName">
                        {props.gameName}
                    </div>
                    <div className="gameCategory">
                        {props.category}
                    </div>
                </div>
            </div>
        </div>
    )
}