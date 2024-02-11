import "../styles/BannerItem.css"
// 배너 아이템(이미지와 게임이름)
// props - gameName:string, category:list 
export default function BannerItem(props) { 
    return (<>
        <div className="BannerSlideItem">
            <div className="BannerText">
                <div className="GameName">{props.gameName}</div>
                <div className="GameCategory">
                {props.category.map((element, index) => (
                    <div className="category" key={index}>{element}</div>
                ))}
                </div>
            </div>
            <div className="BannerImage">
                <img src={props.imgsrc} alt={props.alt} />
            </div>
        </div>
    </>)
}