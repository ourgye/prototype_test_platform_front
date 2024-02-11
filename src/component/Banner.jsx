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

const tempGameData = {gamename: "게임 제목 입니다", category: ["액션", "퍼즐", "RPG"]}

export default function Banner() {

  return (
    <div className="Banner">
      <Swiper
        pagination={{clickable: true}}
        navigation={true}
        modules={[Pagination, Navigation]}
      >
        <SwiperSlide><BannerItem gameName={tempGameData.gamename} category={tempGameData.category} /></SwiperSlide>
        <SwiperSlide><BannerItem gameName={tempGameData.gamename} category={tempGameData.category} /></SwiperSlide>
        <SwiperSlide><BannerItem gameName={tempGameData.gamename} category={tempGameData.category} /></SwiperSlide>
        <SwiperSlide><BannerItem gameName={tempGameData.gamename} category={tempGameData.category} /></SwiperSlide>
        <SwiperSlide><BannerItem gameName={tempGameData.gamename} category={tempGameData.category} /></SwiperSlide>
      </Swiper>
    </div>
  );
}
