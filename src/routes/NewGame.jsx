import { useState } from "react";
import Topbar from "../component/Topbar";
import InputBox from "../component/sign/InputBox";
import LongButton from '../component/sign/LongButton';

import { ReactComponent as AddCircleIcon } from "../icons/add_circle.svg";

import '../styles/NewGame.css'
import { useNavigate } from "react-router-dom";

function NewGame() { 
    const navigation = useNavigate();
    const [gameName, setGameName] = useState('');

    const handleChangeGameName = (e) => {
        setGameName(e.target.value)
    }

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
                                <AddCircleIcon className="add-category-icon" width={"32px"} height={'32px'}/>
                            </div>
                        </div>  
                    </div>
                    <LongButton value={"게임 프로젝트 생성하러 가기"} width={"300px"} onClick={() => {
                        navigation('../newproject')
                    }}/>
            </div>
        </div>
    </>
    )
    
}

export default NewGame; 
