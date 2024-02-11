import '../styles/GameItem.css'

export default function RecommendItem(props) { 
    return (
        <div className="RecommendContainer">
            <div className="thumbnail">
                <img src={props.imgsrc} alt="gamethumbnail" />
            </div>
            <div className="gameName">
                {props.gameName}
            </div>
        </div>
    )
}