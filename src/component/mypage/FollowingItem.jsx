import './FollowingItem.css'

function FavCategory(props) {
    return (
        <div className="fav-category">
            {props.category}
        </div>
    )

}

function FollowingItem() {
    return (
        <div className="following-item-container">
            <div className="profile-thumbnail">
                {/* image */}
            </div>
            <div className="following-info">
                <div className="following-name-fav">
                    <div className="following-name">
                        {/* temp name */}
                        사용자 이름
                    </div>
                    <div className="following-fav">
                        {/* temp */}
                        <FavCategory category="카테고리 길어" />
                        <FavCategory category="짧아" />
                    </div>
                </div>
                <button className="unfollow-btn">
                    언팔로우
                </button>
            </div>
        </div>
    )
}

export default FollowingItem;