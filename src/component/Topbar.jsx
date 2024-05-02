import "../styles/Topbar.css";
import logo from "../logo.svg";
import logoWhite from '../logo_white.svg'
import { ReactComponent as SearchIcon } from "../icons/search.svg";
import { useEffect, useState } from "react";
import GameCategoryDropdown from "./GameCategoryDropdown";
import { Link } from "react-router-dom";
// api 
import { getUserSession, logout } from "../api/User";
import { getUserProfileURL } from "../firebase/firebaseStorage";

// 내비게이션 아이템
function NavItems(props) {
  const [showGames, setShowGames] = useState(false);
  const onClickGames = () => { setShowGames(!showGames) }

  return (
    <Link className="nav-item" to={props.href} onClick={props.games? onClickGames: undefined}>
      {props.name}
      {showGames && <GameCategoryDropdown/>}
    </Link>
  );
}

// 검색창
// api 추가 필요
function SearchBox(props) {
  const [searchKeyword, setSearchKeyword] = useState("");

  return (
    <div className="search-box">
      <input className="search-input" type="text" placeholder="검색어를 입력하세요." value={searchKeyword} onChange={(e)=>setSearchKeyword(e.target.value)}/>
      <Link className="search-icon" to={'/search?keyword='+searchKeyword}>
        <SearchIcon width={20} height={20} />
      </Link>
    </div>
  );
}

// 상단바 버튼
function TopbarBtn(props) {
  return (
    <Link
      className={
        props.color == "yellow" ? "yellow-btn topbar-btn" : "grey-btn topbar-btn"
      }
      to={props.href}
      onClick={props.onClick}
    >
      {props.name}
    </Link>
  );
}

// 로그인 상태일 때 상단바 버튼
function TopbarLogin({ user }) {
  const [userImg, setUserImg] = useState();

  useEffect(() => {
    getUserProfileURL(user.email).then((url) => {
      setUserImg(url);
    });
  }, [user.email]);
  
  return (<>
    <img src={userImg} alt="프로필 사진"  className="topbar-user-profile"/>
    <TopbarBtn name="로그아웃" onClick={() => {
      logout();
      window.location.reload();
    }} />
    <TopbarBtn name="프로토타입 제작"  href='/proto' color="yellow" />
  </>
  );
}

// 미로그인 상태일 때 상단바 버튼
function TopbarDefault() {
  return (
    <>
      <TopbarBtn name="로그인" href='/signin' />
      <TopbarBtn name="가입" href="/signup" />
    </>
  );
  
}

// 상단바 컴포넌트
function Topbar() {
  //스크롤 위치 갱신
  const [scrollY, setScrollY] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const user = getUserSession();

  const updateScroll = () => {
    setScrollY(window.scrollY || document.documentElement.scrollTop);
  }

  useEffect(() => {
    window.addEventListener("scroll", updateScroll);
    return () => { window.removeEventListener("scroll", updateScroll);}
  }, [])

  //스크롤 위치에 따라 class 더 해주기
  useEffect(() => {
    if (scrollY > 90) {
      setIsScrolled(true);
    } else setIsScrolled(false);
  }, [scrollY])

  return (
    <div className={`topbar ${isScrolled? 'scrolled': ''}`}>
      <div className="topbar-left">
        <Link to="/"><img src={isScrolled? logoWhite: logo} /></Link>
        <ul id="nav">
          <NavItems name="게임들" games={true} href="#"/>
          <NavItems name="마이페이지" href="/mypage" />
          <NavItems name="사용자 가이드" href="." />
        </ul>
      </div>
      <div className="topbar-right">
        <SearchBox />
        <div className="top-bar-buttons">
          {user ? <TopbarLogin user={user} /> : <TopbarDefault/>}
        </div>
      </div>
    </div>
  );
}

export default Topbar;
