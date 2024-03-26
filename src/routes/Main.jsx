import TopBar from "../component/Topbar";
import Banner from "../component/Banner";
import Carousel from "../component/Carousel";

function Main() {
  return (
    <>
        <Banner />
        <Carousel ai={true} title={"AI 추천 게임"} />
        <Carousel rank={true} title={"TOP 10"} />
    </>
  );
}

export default Main;
