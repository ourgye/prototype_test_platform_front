import { useState } from 'react'
import './UserProfileNav.css'

import { Link } from "react-router-dom"

function UserProfileNavItem(props) {
    return (
        <div className={props.clicked? "clicked user-profile-nav-item": "user-profile-nav-item"}  onClick={()=>{props.onClick(props.num)}}>
            <div to={props.to}>{props.name}</div>
        </div>
    )
}

function UserProfileNav(props) {

    return (
        <div className="user-profile-nav">
            <UserProfileNavItem name="게임" num={1} clicked={props.whichClicked == 1 ? true : false} onClick={props.onClick} />
            <UserProfileNavItem name="리뷰" num={2} clicked={props.whichClicked==2? true: false} onClick={props.onClick} />
            <UserProfileNavItem name="팔로잉" num={3} clicked={props.whichClicked==3? true: false } onClick={props.onClick}/>
            <UserProfileNavItem name="찜한 게임" num={4} clicked={props.whichClicked==4? true: false} onClick={props.onClick}/>
        </div>
    )
}

export default UserProfileNav;