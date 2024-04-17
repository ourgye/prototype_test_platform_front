import './LongButton.css'

function LongButton(props) { 

    return (
        <button className={props.yellow ? 'LongButton YellowButton' : 'LongButton RedButton'}
            style={{ width: props.width, height: props.height }}
            onClick={props.onClick}
            type={props.type}
            disabled={props.disabled}
        >
            {props.value}
        </button>
    )
}

export default LongButton;