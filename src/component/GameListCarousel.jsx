import { Grid, Pagination } from 'swiper/modules';
import '../styles/GameListCarousel.css'
import GameItem from './GameItem'
import { ReactComponent as LeftArrow } from '../icons/chevron_left.svg'
import { ReactComponent as RightArrow } from '../icons/chevron_right.svg'
import { Link } from 'react-router-dom';


function GameListCarousel({title, data}) {
    const GameItemList = data.gameList.map((game, index) => {
        console.log(game)
        return <Link to={`/game/${game.testId}`}><GameItem key={game.gameId} gameName={game.gameName} imgPath={game.imgPath}/></Link>
    });

    //game list pagination (< 1 2 3 4 5 >)
    const Pagination = (curr, start, end) => {
        const pages = Array.from({ length: 5 }, (_, index) => (
            <div className={index + start === curr ? "focus" : 'notFocus'}>
                {index+start}
            </div>
        ))

        return (
            <div className="games-pagination">
                <div className="arrow"><LeftArrow width={32} height={32}/></div>
                <div className="pages">{pages}</div>
                <div className="arrow"><RightArrow width={32} height={32} /></div>
            </div>
        )
    }

    return (
        <div className="game-category-list-container">
            <div className="title">{title}</div>
            <div className="game-category-list">
                {GameItemList}
            </div>
            {/* {Pagination(1, 1, 1)} */}
        </div>
    )
}

export default GameListCarousel;