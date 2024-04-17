import React from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import '../styles/Carousel.css'

// import required modules
import { FreeMode } from 'swiper/modules';

import RecommendItem from './GameItem';
import RankingItem from './RankingItem';
import { Link } from 'react-router-dom';
import { categoryListKR, categoryList } from '../category';

function gameItem(rank, gameName, category, gameId, imgPath, testId) {
    const gameCategory = categoryListKR.at(categoryList.indexOf(category));

    return (
        <SwiperSlide>
            <Link to={"/game/" + testId} preventScrollReset={false}>
                <RankingItem rank={rank} gameName={gameName} category={gameCategory} imgPath={imgPath} />
            </Link>
        </SwiperSlide>
    );
}

function gameItemAI(gameName) {
    return (
        <SwiperSlide>
            <RecommendItem gameName={gameName} />
        </SwiperSlide>
    );
}

export default function Carousel({ title, data }) {
    console.log(data)
    const slideList = data ? data.gameList.map((game, index) => { 
        return gameItem(index + 1, game.gameName, game.category, game.gameId, game.imgPath, game.testId);
    }) : null;

    return (<div className='carousel-container'>
        <div className="title">{title}</div>
        <div className="main-carousel"> 
            <Swiper freeMode={{ enable: true }} modules={[FreeMode]} spaceBetween={24} slidesPerView={'auto'} slidesOffsetAfter={32} slidesOffsetBefore={32}>
            {slideList}
            </Swiper>
        </div>
    </div>)
}