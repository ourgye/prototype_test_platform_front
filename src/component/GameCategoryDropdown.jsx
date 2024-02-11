import '../styles/GameCategoryDropdown.css'
import {ReactComponent as ExpandMoreIcon} from '../icons/expand_more.svg'
import { Link } from 'react-router-dom'

const categoryList = ["액션", "롤플레잉", "전략", "어드벤처", "시뮬레이션", "스포츠 및 레이싱"]

export default function GameCategoryDropdown() { 
    return <ul className='gameCategoryDropdown'>
        <Link className="categoryHeader">카테고리</Link>
        {categoryList.map((element, index) => <Link to="/games" key={index}>{element}</Link>)}
        <Link className="moreIcon"><ExpandMoreIcon width={16} height={16} /></Link>
    </ul>
}