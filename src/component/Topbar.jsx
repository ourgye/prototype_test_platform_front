import "../styles/Topbar.css";
import logo from "../logo.svg";
import logoWhite from '../logo_white.svg'
import { ReactComponent as SearchIcon } from "../icons/search.svg";
import { useEffect, useState } from "react";

import GameCategoryDropdown from "./GameCategoryDropdown";
import { getUserSession, logout } from "../api/User";
import { Link } from "react-router-dom";

function NavItems(props) {
  const [showGames, setShowGames] = useState(false);
  const onClickGames = () => { setShowGames(!showGames) }

  return (
    <Link className="navItem" to={props.href} onClick={props.games? onClickGames: undefined}>
      {props.name}
      {showGames && <GameCategoryDropdown/>}
    </Link>
  );
}

function SearchBox(props) {
  return (
    <div className="SearchBox">
      <input className="SearchInput" type="text" placeholder="검색어를 입력하세요."/>
      <SearchIcon width={20} height={20} />
    </div>
  );
}

function TopbarBtn(props) {
  return (
    <Link
      className={
        props.color == "yellow" ? "btnYellow TopbarBtn" : "btnGrey TopbarBtn"
      }
      to={props.href}
      onClick={props.onClick}
    >
      {props.name}
    </Link>
  );
}

function TopbarLogin() {
  return (<>
    <div className="topbarProfile"></div>
    <TopbarBtn name="로그아웃" onClick={() => { logout(); window.location.reload(); }} />
    <TopbarBtn name="프로토타입 제작"  href='/proto' color="yellow" />
  </>
  );
}

function TopbarNLogin() {
  return (
    <>
      <TopbarBtn name="로그인" href='/SignIn' />
      <TopbarBtn name="가입" href="/SignUp" />
    </>
  );
  
}

function Topbar() {
  //스크롤 위치 갱신
  const [scrollY, setScrollY] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [user, setUser] = useState(getUserSession());

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
    <div className={`Topbar ${isScrolled? 'scrolled': ''}`}>
      <div className="topbarLeft">
        <Link to="/"><img src={isScrolled? logoWhite: logo} /></Link>
        {/* 내비게이션 코드 수정 필요 */}
        <ul id="nav">
          <NavItems name="게임들" games={true}/>
          <NavItems name="마이페이지" href="/mypage" />
          <NavItems name="사용자 가이드" href="." />
        </ul>
      </div>
      <div className="topbarRight">
        <SearchBox />
        <div className="top-bar-buttons">
          {user? <TopbarLogin/> : <TopbarNLogin/>}
        </div>
      </div>
    </div>
  );
}

export default Topbar;
