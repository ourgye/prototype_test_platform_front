import "../styles/BannerItem.css"
import { categoryList, categoryListKR } from "../category"
import { Link } from "react-router-dom"


export default function BannerItem(props) { 
    return (<>
        <Link className="banner-slide-item" to={`game/${props.testId}`}>
            <div className="banner-text">
                <div className="banner-game-name">{props.gameName}</div>
                <div className="banner-game-catdgory">
                    <div className="category">{categoryListKR.at(categoryList.indexOf(props.category))}</div>
                </div>
            </div>
            <img className="banner-image" src={props.imgPath} alt={props.alt} />
        </Link>
    </>)
}