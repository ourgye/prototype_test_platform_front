import Banner from "../component/Banner";
import GameListCarousel from "../component/GameListCarousel";
import { useParams, useRouteLoaderData } from 'react-router-dom';
import { categoryList, categoryListKR } from "../category";

function Games() {
  const gameList = useRouteLoaderData("categorygames");
  const categoryNameEn = useParams();
  const categoryName = categoryListKR[categoryList.indexOf(categoryNameEn["gameCategory"].toUpperCase())];
  
  return (
    <>
      <Banner />
      <GameListCarousel title={categoryName} data={gameList} />
    </>
  );
}

export default Games;
