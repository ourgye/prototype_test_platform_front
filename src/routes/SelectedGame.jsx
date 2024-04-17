import { useLoaderData, useNavigate } from "react-router-dom";
import ChooseGameItem from "../component/choosegame/ChooseGameItem";
import LongButton from "../component/sign/LongButton";

import '../styles/SelectedGame.css';
import { useState } from "react";

function SelectedGame() {
  const gameList = useLoaderData('choosegame');
  const [gameId, setGameId] = useState();
  const navigate = useNavigate();

  const handleSelectGame = (gameId) => { 
      setGameId(gameId);
  }

  const handleMakeProject = () => {
    if (!gameId) return alert('게임을 선택해주세요.');

    navigate(`../newproject`, { state: {testId: gameId}});
  }      

  return (
    <>
    <div className="new-project-tab">
        <div className="document-title">
            <h1>새 게임 프로젝트 생성</h1>
            <p>기존 게임에서 만들 게임 프로젝트를 선택해주세요.</p>
        </div>
        <div className="game-selection">
          {gameList.tests.map((game, index) => {
            return (
              <ChooseGameItem
                key={game.testId}
                selected={gameId === game.testId}
                imgPath={game.imgPath}
                gameName={game.gameName}
                testCount={game.round}
                gameCategory={game.category}
                onClick={() => handleSelectGame(game.testId)}
              />
            );
          })}
        </div>
        <LongButton width="400px" height="48px" value="게임 프로젝트 생성하러 가기" onClick={handleMakeProject} />
    </div>
</>
  );
}

export default SelectedGame;