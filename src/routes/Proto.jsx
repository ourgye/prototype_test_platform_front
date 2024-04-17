import '../styles/Proto.css'
import { Link } from 'react-router-dom';

function Proto() {
    return (
        <>
            <div className="new-project-tab">
                <div className="document-title">
                    <h1>새 게임 프로젝트 생성</h1>
                    <p>만들 게임 프로젝트를 선택해주세요.</p>
                </div>
                <div className="project-type-selection">
                    <Link to={'newgame'}  className="project-type"> 
                        새로운 게임으로 프로젝트 시작하기
                    </Link>
                    <Link to={'choosegame'} className="project-type">
                        기존 게임으로 프로젝트 시작하기
                    </Link>
                </div>
            </div>
        </>
    )
}

export default Proto;