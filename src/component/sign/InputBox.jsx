import './InputBox.css'

function InputBox(props) { 
    return (
        <>
            <input type="text" style={{ width: props.width ?? '460px', height: props.height }} className={`inputBox ${props.error? 'error': ''}` } placeholder={props.placeholder} />
        </>
    )

}

export default InputBox;