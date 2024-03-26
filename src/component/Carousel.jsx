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


export default function Carousel(props) {
    const slideItems = props.ai ? <SwiperSlide><RecommendItem gameName={"게임 이름"}></RecommendItem></SwiperSlide> : (props.rank ? <SwiperSlide><RankingItem rank={1} gameName={"게임 이름"} category={"액션"} ></RankingItem></SwiperSlide> : null)
    const slideList = Array.from({ length: 10 }, (_, index) => (
          slideItems
      ));

    return (<div className='carousel-container'>
        <div className="title">{props.title}</div>
        <div className="main-carousel"> 
            <Swiper freeMode={{ enable: true }} modules={[FreeMode]} spaceBetween={24} slidesPerView={'auto'} slidesOffsetAfter={32} slidesOffsetBefore={32}>
            {slideList}
            </Swiper>
        </div>
    </div>)
}