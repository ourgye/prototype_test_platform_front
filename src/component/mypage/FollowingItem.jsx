import { categoryList, categoryListKR } from '../../category';
import './FollowingItem.css'

function FavCategory(props) {
    return (
        <div className="fav-category">
            {props.category}
        </div>
    )

}

function FollowingItem({userName, imgPath, favCategories}) {
    return (
        <div className="following-item-container">
            <img className="profile-thumbnail" src={imgPath} alt={userName} />
            <div className="following-info">
                <div className="following-name-fav">
                    <div className="following-name">
                        {userName}
                    </div>
                    <div className="following-fav">
                        {favCategories.map((category, index) => {
                            <FavCategory category={categoryListKR.at(categoryList.indexOf(category))} />
                        })}
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