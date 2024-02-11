import './LongButton.css'

function LongButton(props) { 
    const happyTemp = () => {
        alert("happy happy happy day!")
    }
    
    return (
        <div className={props.yellow? 'LongButton YellowButton': 'LongButton RedButton'} style={{ width: props.width, height: props.height}} onClick={props.onClick? props.onClick: happyTemp}>
            {props.value}
        </div>
    )
}

export default LongButton;