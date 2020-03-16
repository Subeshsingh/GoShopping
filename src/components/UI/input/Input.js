import React from 'react'
import './Input.css';

const Input = (props) => {

    let inputElement=null;
    switch (props.elementType){
        
        case('input'):
            inputElement = (
                <input 
                className="Input"
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed}/>
            );
        break;
        default:
            inputElement = (
                <input className="Input"
                {...props.elementConfig}
                   value={props.value}
                   onChange={props.changed}/>
            );
    }

    return (
        <div className="InputWrapper">
            <label className="Label">{props.label}</label><br/> 
            {inputElement}     
        </div>
    )
}

export default Input;
