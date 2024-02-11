import "./InputDropDown.css"

function InputDropDown(props) { 
    return (
        <>
            <select className="inputDropDown" style={{ width: props.width ?? '460px', height: props.height }}>
                <option></option>
            </select>
        </>
    )
}

export default InputDropDown;