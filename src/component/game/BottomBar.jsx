import './BottomBar.css'

function BottomBar(props) {
    // 테스트 참여 전/ 참여 후 / 테스트 게시자
    const userId = props.currentUser.userId; 
    const gameMaker = props.gameMaker;


    // props.currentGameStatus = "recruiting","reviewing", "done", "yet"
    // 게임 상태에 따라 다른 메시지와 버튼을 보여줌, 클라스도 설정
    let buttomBarContent = { message: "", buttonValue: "", className: "", classButton: ""} ;
    if (props.currentGameStatus === "recruiting") {
        buttomBarContent.message = "현재 모집 중인 게임이에요";
        buttomBarContent.buttonValue = "이 게임 테스트 참여하기";
        buttomBarContent.className = "";
    } else if (props.currentGameStatus === "reviewing") {
        buttomBarContent.message = "참여 중인 게임이에요";
        buttomBarContent.buttonValue = "리뷰 작성하러 가기";
        buttomBarContent.className = "participated-wrapper";
        buttomBarContent.classButton = "participated-button";
    } else if (props.currentGameStatus === "done") {
        buttomBarContent.message = "테스트가 종료되었습니다";
        buttomBarContent.buttonValue = "이 게임 테스트 게임 참여하기";
        buttomBarContent.className = "finished-wrappe";
        buttomBarContent.classButton = "finished-button";
    } else if (props.currentGameStatus === "yet") {
        buttomBarContent.message = "아직 시작하지 않은 게임이에요";
        buttomBarContent.buttonValue = "이 게임 테스트 게임 참여하기";
        buttomBarContent.className = "finished-wrapper";
        buttomBarContent.classButton = "finished-button";
    }

    // 테스트 게시자인 경우
    if (userId == gameMaker) { 
        buttomBarContent.message = "이 게임은 내가 게시한 게임이에요";
        buttomBarContent.buttonValue = "이 게임 테스트 게임 참여하기";
        buttomBarContent.className = "owner-wrapper";
        buttomBarContent.classButton = "owner-button";
    }
    
    const participateTest = (userId == gameMaker || props.currentGameStatus === "done") ? null : props.onClickButton;
    const handleOnClick = (props.currentGameStatus === "reviewing") ? props.onClickReviewWrite : participateTest;

    return (
        <div className={`bottom-bar-wrapper ${buttomBarContent.className}`}>
            <div className="bottom-bar-msg">
                {buttomBarContent.message}
            </div>
            <div className={`bottom-bar-button ${buttomBarContent.classButton}`} onClick={handleOnClick}>
                {buttomBarContent.buttonValue}
            </div>
        </div>
    );
}

export default BottomBar;