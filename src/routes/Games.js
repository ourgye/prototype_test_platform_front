import TopBar from "../component/Topbar";
import Banner from "../component/Banner";
import GameListCarousel from "../component/GameListCarousel";
import { useQuery, useQueryClient } from "@tanstack/react-query";

function Games() {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["games"],
    queryFn: () => {
      fetch("/games");
    },
  });

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
