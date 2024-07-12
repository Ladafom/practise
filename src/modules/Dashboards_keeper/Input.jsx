import React from "react";
import '../../styles/home-form.css'

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
  const [correctValue, setCorrectValue] = React.useState(false)
  const [errorText,setErrorText] = React.useState('')
  async function establishValue(userValue){
    if(correctValue){
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
    else if(isNaN(parseValue)){
      setErrorText('')
      setCorrectValue(false)
    }
    else{
      setCorrectValue(true)
    }
  }

  function handleChange(event){
    switch(props.name){
      case 'temperature-upper':
        validation(event.target.value, 125.0, -40.0)
        break
      case 'temperature-lower':
        validation(event.target.value, 125.0, -40.0)
        break
      case 'VCCbram-upper' || 'VCCbram-lower':
        validation(event.target.value, 0.92, 0.76)
        break
      case 'VCCbram-lower':
        validation(event.target.value, 0.92, 0.76)
        break
      case 'VCCaux-upper' || 'VCCaux-lower':
        validation(event.target.value, 1.89, 1.75)
        break
      case 'VCCaux-lower':
        validation(event.target.value, 1.89, 1.75)
        break
    }
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
    <>
      <div className="dashboard_flex dashboard__text dashboard__text_margin">
        <label className=' dashboard__text_padding' htmlFor="">
          Изменить {props.name.split('-')[0]} {props.name.split('-')[1]}:
          <input type="text" value={userValue} onChange={handleChange} name={props.name}
            className={`home-form__input home-form__input_positon${correctValue? '':'input-error'}`}
          />
        </label>
        <button className='dashboard__btn dashboard__btn_little'
          onClick={()=> establishValue(userValue)}
          disabled={correctValue ? false:true}> изменить значение
        </button>
      </div>
      {
        !correctValue &&
          <p className="dashboard__text dashboard__text_little dashboard__text_margin dashboard__text_padding"
            style={{color:'rgba(244, 101, 99, 0.8)'}}>
            {errorText}
          </p>
      }
    </>
  )
}

export default Input