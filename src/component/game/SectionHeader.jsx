import './SectionHeader.css'
import { ReactComponent as OpenedIcon } from '../../icons/expand_more.svg'
import { ReactComponent as ClosedIcon } from '../../icons/expand_less.svg'

function SectionHeader(props) {
    return <div className='section-header'>
        {props.title}
        <div className="pointer-cursor" onClick={()=>props.onClickArrow(!props.isExpand)}>
            {props.isExpand ? <OpenedIcon width={'36px'} height={'36px'}/> : <ClosedIcon width={'36px'} height={'36px'}/>}
        </div>
    </div>
}

export default SectionHeader;