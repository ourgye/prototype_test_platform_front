import React from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import '../styles/Banner.css';

// import required modules
import { Pagination, Navigation } from 'swiper/modules';

// import banner items 
import BannerItem from './BannerItem';

export default function Banner({ gameData }) {

  const slides = gameData? gameData.gameList.map((game, index) => {
    return <SwiperSlide><BannerItem gameName={game.gameName} category={game.category} imgPath={game.imgPath} testId={game.testId} /></SwiperSlide>;
  }) : null;


  return (
    <div className="banner">
      {gameData ?
        <Swiper
          pagination={{ clickable: true }}
          navigation={true}
          modules={[Pagination, Navigation]}
        >
          {slides}
        </Swiper>: null}
    </div>
  );
}
