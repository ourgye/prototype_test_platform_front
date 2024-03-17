import '../styles/Proto.css'
import Topbar from "../component/Topbar";
import LongButton from '../component/sign/LongButton';
import { Link } from 'react-router-dom';

function Proto() {
    return (
        <>
            <header>
            <Topbar/>   
            </header>
            <div className="mainContainer">
                <div className="new-project-tab">
                    <div className="document-title">
                        <h1>새 게임 프로젝트 생성</h1>
                        <p>만들 게임 프로젝트를 선택해주세요.</p>
                    </div>
                    <div className="project-type-selection">
                        <Link to={'newgame'}  className="project-type"> 
                            새로운 게임으로 프로젝트 시작하기
                        </Link>
                        <Link to={'newproject'} className="project-type">
                            기존 게임으로 프로젝트 시작하기
                        </Link>
                    </div>
                    <LongButton width="240px" value="다음 단계로 넘어가기" yellow={true} />
                </div>
            </div>
        </>
    )
}

export default Proto;