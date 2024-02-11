import TopBar from "../component/Topbar";
import Banner from "../component/Banner";
import Carousel from "../component/Carousel";

function Main() {
  return (
    <>
      <header>
        <TopBar />
      </header>
      <div className="mainContianer">
        <Banner />
        <Carousel ai={true} title={"AI 추천 게임"} />
        <Carousel rank={true} title={"Top10"} />
      </div>
    </>
  );
}

export default Main;
