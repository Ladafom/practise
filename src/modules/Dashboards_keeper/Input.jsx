import React from "react";
import '../../styles/input.css'

function Input(props){
  const defaultResponse = {
    'buttonType': 'undefined',
    'temperature-upper':'undefined',
    'temperature-lower' : 'undefined',
    'VCCbram-upper':'undefined',
    'VCCbram-lower':'undefined',
    'VCCaux-upper':'undefined',
    'VCCaux-lower':'undefined'
  }
  const [userValue, setUserValue] = React.useState('')
  const [correctValue, setCorrectValue] = React.useState(true)
  const [errorText,setErrorText] = React.useState('')
  async function establishValue(userValue){
    const hexValue = converter(userValue)
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({...defaultResponse,[props.name]: hexValue})
    };
    await fetch(`http://${props.ipBoard}:${props.port}/sensore`, requestOptions)
    setUserValue('')
  }

  function validation(value, upperValue, lowerValue){
    const parseValue = parseFloat(value)
    if(parseValue >= upperValue){
      setErrorText('Введенное значение превышает допустимую промышленное значение')
      setCorrectValue(false)
    }
    else if(parseValue <= lowerValue){
      setErrorText('Введенное значение меньше промышленного значения')
      setCorrectValue(false)
    }
    else if(isNaN(parseValue) && value !='' && value !='-'){
      setErrorText('Введенное значение некорректно')
      setCorrectValue(false)
    }
      else{
      setCorrectValue(true)
    }
  }

  function handleChange(event){
    switch(props.name){
      case 'temperature-upper' || 'temperature-lower':
        validation(event.target.value, 125.0, -40.0)
        break
      case 'VCCbram-upper' || 'VCCbram-lower':
        validation(event.target.value, 0.92, 0.86)
        break
      case 'VCCaux-upper' || 'VCCaux-lower':
        validation(event.target.value, 1.89, 1.75)
    }
    // converter(parseValue)
    setUserValue(event.target.value)
  }

  function converter(x){
    let a
    if (props.name.split('-')[0] == 'temperature'){
      a = ((parseFloat(x)+280.23)*(2**16))/509.314
    }
    else{
      a = (((parseFloat(x))*(2**16))/3)
    }
    const hexNum = (a.toString(16)).slice(0,4)
    return hexNum
  }
  return(
    <div className="change-value">
      <label htmlFor="">
        Изменить {props.name.split('-')[0]} {props.name.split('-')[1]}:
        <input type="text" value={userValue} onChange={handleChange} name={props.name} className={correctValue? '':'input-error'}/>
        {!correctValue && <p>{errorText}</p>}
      </label>
      <button onClick={()=> establishValue(userValue)} disabled={correctValue ? '':'disabled'}> изменить значение </button>
    </div>
  )
}

export default Input