import "./InputDropDown.css"

function InputDropDown(props) { 
    return (
        <>
            <select className="inputDropDown" defaultValue={props.defaultValue} style={{ width: props.width ?? '460px', height: props.height}} onChange={props.onChange}>
                <option value="default" >==선택==</option>
                {props.optionList && props.optionList.map((value, i) => {
                    
                    return (
                        <option value={value} key={i}>
                            {value}
                        </option>);
                })}
            </select>
        </>
    )
}

export default InputDropDown;