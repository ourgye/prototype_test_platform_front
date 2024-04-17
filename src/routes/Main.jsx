import { getRecentGameList } from "../api/Proto";
import Banner from "../component/Banner";
import Carousel from "../component/Carousel";
import { useRouteLoaderData } from "react-router-dom";

function Main() {
  const maindata = useRouteLoaderData('main');

  return (
    <>
        <Banner gameData={maindata.bannerGames}/>
        <Carousel ai={true} title={"AI 추천 게임"} />
        <Carousel rank={true} title={"TOP 10"} data={maindata.top10Games} />
    </>
  );
}

export default Main;
