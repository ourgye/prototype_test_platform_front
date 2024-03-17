import './BottomBar.css'

function BottomBar(props) {
    // 테스트 참여 전/ 참여 후 / 테스트 게시자
    // 어떻게 알 수 있지? 
    const user={name: "달콤한 인생"}
    const bottomBarContent_btest = {message: '현재 테스트 모집 중인 게임이에요', buttonValue: "이 테스트 참여하기"} 
    const bottomBarContent_atest = {message: `${user.name}님이 참여 중인 게임이에요.`, buttonValue: "리뷰 작성하러 가기"} 

    return (
        <div className="bottom-bar-wrapper finished-wrapper">
            <div className="bottom-bar-msg">
                {bottomBarContent_btest.message}
            </div>
            <div className="bottom-bar-button finished-button" >
                {bottomBarContent_btest.buttonValue}
            </div>
        </div>
    );
}

export default BottomBar;