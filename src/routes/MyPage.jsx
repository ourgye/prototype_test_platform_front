import GameItem from "../component/mypage/GameItem";
import UserProfile from "../component/mypage/UserProfile";

function MyPage() {
    return (<><GameItem testCount={4} title={"게임 이름"} reviewNum={48} gameCategory={"액션"} />
        <UserProfile/>
    </>);
}

export default MyPage; 