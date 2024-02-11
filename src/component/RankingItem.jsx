import '../styles/RankingItem.css'

export default function RankingItem(props) { 
    return (
        <div className="rankingItem">
            <div className="rankingThumbnail">
                <img src={props.imgsrc} alt="rankingThumbnail" />
            </div>
            <div className="description">
                <div className="rankNum">
                    {props.rank}
                </div>
                <div className="gameDescription">
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