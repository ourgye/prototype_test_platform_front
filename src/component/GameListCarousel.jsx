import { Grid, Pagination } from 'swiper/modules';
import '../styles/GameListCarousel.css'
import GameItem from './GameItem'
import { ReactComponent as LeftArrow } from '../icons/chevron_left.svg'
import { ReactComponent as RightArrow } from '../icons/chevron_right.svg'


function GameListCarousel(props) {
    const GameItemList = Array.from({ length: 16 }, (_, index) => (
        <GameItem key={index} gameName={index} />
    ));

    //game list pagination (< 1 2 3 4 5 >)
    const Pagination = (curr, start, end) => {
        const pages = Array.from({ length: 5 }, (_, index) => (
            <div className={index + start === curr ? "focus" : 'notFocus'}>
                {index+start}
            </div>
        ))

        return (
            <div className="pagination">
                <div className="Arrow"><LeftArrow width={32} height={32}/></div>
                <div className="pages">{pages}</div>
                <div className="Arrow"><RightArrow width={32} height={32} /></div>
            </div>
        )
    }

    return (
        <div className="gameListContainer">
            <div className="title">{props.title}</div>
            <div className="gameList">
                {GameItemList}
            </div>
            {Pagination(1, 1, 1)}
        </div>
    )
}

export default GameListCarousel;