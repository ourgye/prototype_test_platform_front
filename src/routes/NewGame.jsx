import { useState } from "react";
import Topbar from "../component/Topbar";
import InputBox from "../component/sign/InputBox";
import LongButton from '../component/sign/LongButton';
import { makeNewGame } from "../api/Proto";

import { ReactComponent as AddCircleIcon } from "../icons/add_circle.svg";

import '../styles/NewGame.css'
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import InputDropDown from "../component/sign/InputDropDown";

const newGame = {
    name: "", 
    category: "",
}

function NewGame() { 
    const navigation = useNavigate();
    const [gameName, setGameName] = useState('');
    const [category, setCategory] = useState('ACTION')

    const handleChangeGameName = (e) => {
        setGameName(e.target.value)
    }

    const { mutate: handleCreateNewdGame, isLoading, isError, error, isSuccess } = useMutation({
        mutationFn: makeNewGame,
        onSuccess: (res) => {
            // 게임 아이디 저장
            navigation({
                pathname: '../newproject',
                state: { gameId: res.gameId }
            })
        },
        onError: (error) => {
            console.error("An error occurred during make new game:", error)
            alert("게임을 만드는 데 실패했습니다. ")
        }
    }); 

    return (
    <>
        <header>
        <Topbar/>   
        </header>
        <div className="mainContainer">
            <div className="new-project-tab">
                <div className="document-title">
                        <h1>새 게임 프로젝트 생성</h1>
                        <p>새로운 게임의 프로젝트를 제작합니다</p>
                    </div>
                    <div className="new-game-input-wrapper">
                        <div className="new-game-input game-name-input">
                            게임 제목<br/>
                            <InputBox width="inherit" onChange={handleChangeGameName} value={gameName} />
                        </div>
                        <div className="new-game-input add-category">
                            카테고리<br />
                            <div className="added-category-wrapper">
                                <InputDropDown width="inherit" />
                            </div>
                        </div>  
                    </div>
                    <LongButton value={"게임 프로젝트 생성하러 가기"} width={"300px"} onClick={() => {
                        newGame.name = gameName;
                        newGame.category = category;
                        console.log(newGame);
                        handleCreateNewdGame(newGame); 
                    }}/>
            </div>
        </div>
    </>
    )
    
}

export default NewGame; 
