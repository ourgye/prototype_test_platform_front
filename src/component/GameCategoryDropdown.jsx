import '../styles/GameCategoryDropdown.css'
import {ReactComponent as ExpandMoreIcon} from '../icons/expand_more.svg'
import { Link } from 'react-router-dom'
import { categoryListKR, categoryList } from '../category'

export default function GameCategoryDropdown() { 
    return <ul className='game-category-dropdown-wrapper'>
        <div className="category-header">카테고리</div>
        {categoryListKR.map((element, index) => <div><Link to={"/games/"+categoryList[categoryListKR.indexOf(element)]} state={{data: element}} key={index}>{element}</Link></div>)}
    </ul>
}