import Banner from "../component/Banner";
import Carousel from "../component/Carousel";
import { useRouteLoaderData } from "react-router-dom";

function Main() {
  const top10game = useRouteLoaderData('main');

  // console.log(top10game);
  return (
    <>
        <Banner />
        <Carousel ai={true} title={"AI 추천 게임"} />
        <Carousel rank={true} title={"TOP 10"} data={top10game} />
    </>
  );
}

export default Main;
