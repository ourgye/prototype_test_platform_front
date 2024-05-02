import { useEffect, useState } from "react";
import GameListCarousel from "../component/GameListCarousel";
import { useSearchParams } from "react-router-dom";
import { searchGameByKeyword } from "../api/Proto";

import '../styles/Search.css'

function Search() {
    const [searchParams, setSearchParams] = useSearchParams();
    const keyword = searchParams.get('keyword')
    const [gameList, setGameList] = useState({})

    useEffect(() => {
        searchGameByKeyword(keyword).then((res) => {
            setGameList({gameList: res.testList})
        })
    }, [keyword]);

  
    return (
        <div class="search-page-wrapper">
            <div class="search-result-title">"{keyword}" 검색 결과</div>
            <div class="search-result-count">총 {gameList.gameList?.length}개의 게임이 검색되었습니다.</div>
            <div className="search-result-items">
                <GameListCarousel title={" "} data={gameList} /> 
            </div>
        </div>
    );
}

export default Search;
