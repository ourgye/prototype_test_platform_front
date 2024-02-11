import TopBar from "../component/Topbar";
import Banner from "../component/Banner";
import GameListCarousel from "../component/GameListCarousel";

function Games() {
  return (
    <>
      <header>
        <TopBar />
      </header>
      <div className="mainContianer">
        <Banner />
        <GameListCarousel title={"카테고리 이름"} />
      </div>
    </>
  );
}

export default Games;
