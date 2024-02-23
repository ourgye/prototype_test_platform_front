import './InputBox.css'

function InputBox(props) { 
    return (
        <>
            <input type={props.type}
                name={props.name}
                style={{ width: props.width ?? '460px', height: props.height }}
                className={`inputBox ${props.error ? 'error' : ''}`}
                placeholder={props.placeholder}
                onChange={props.onChange}
            />
        </>
    )

}

export default InputBox;