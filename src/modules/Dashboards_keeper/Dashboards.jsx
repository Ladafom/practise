import React from "react"
import { Link } from "react-router-dom"
import Graph from "./Graph"
import '../../styles/dashboard.css'
import Dashboard from "./Dasboard"
import MeasureTable from "../Dashboard_tables/MeasureTable"
import Input from "./Input"
import TresholdTable from "../Dashboard_tables/TresholdTable"
import HintTable from "../Dashboard_tables/HintTable"
import AbsoluteMaximumRatings from "../Dashboard_tables/AbsoluteMaximumRatings"
import RecommendedOperatingConditions from "../Dashboard_tables/RecommendedOperatingConditions"

let timeout
function Dashboards(props){
  // объявление объекта allValues
  const [allValues, setAllValues] = React.useState([{"date": "undefined",
                                                    "time": "undefined",
                                                    "temperature": "undefined",
                                                    "VCCBram": "undefined",
                                                    "VCCaux": "undefined",
                                                    "voltage3": "undefined",
                                                    "errors": "undefined",
                                                    "tempUpper":"undefined",
                                                    "tempLower":"undefined",
                                                    "VCCBramUpper":"undefined",
                                                    "VCCBramLower":"undefined",
                                                    "VCCauxUpper":"undefined",
                                                    "VCCauxLower":"undefined",
                                                    "VCCintUpper":"undefined",
                                                    "VCCintLower":"undefined"}])
  const [catchFetchError, setCatchFetchError] = React.useState(false)
  React.useEffect(()=>{
    renderAll() // вызов get-запроса
  },[])
  async function renderAll(){ // функция выполнения get-запроса
    await getApiData() // вызов функции get-запроса
    timeout=setTimeout(renderAll, 1000); // выполнение get-запроса каждую секунду (установка таймаута)
  }

    async function getApiData() { // функция get-запроса об общем состоянии платы
      fetch(`http://${props.ipBoard}:${props.port}/sensore`,{
        signal: AbortSignal.timeout(500) // прекратить ждать ответ после 0.5 секунд
      })
      .then(res => {
        if(res.ok){// если ответ получен
          setCatchFetchError(false) // переменная catchFetchError == false
          return res.json() // переход на следующий метод then
        } // сообщить об ошибке, если ответ не получен
        else{throw new Error('Something went wrong')}
      }) // запись данных с сервера в объект allValues
      .then(data => {setAllValues(data)})
      .catch((error) => { // если была поймана ошибка при получении ответа
        setCatchFetchError(true) // переменная catchFetchError == true
      });
    }
    async function handleClick(){ // функция post-запроса к серверу
      const requestOptions = { // содержимое запроса
        method: 'POST', // объявление метода запроса
        headers: { // заголовок запроса
          'Content-Type': 'application/json' // тип отсылаемого запроса - json
        },
        body: JSON.stringify({buttonType: 'reset-btn'}) // тело запроса
      };
      await fetch(`http://${props.ipBoard}:${props.port}/sensore`, requestOptions)
    }

    function timeOutHandler(){
      clearTimeout(timeout)  // очистка таймаута
    }

  return(
    <> {/* ссылка на главную страницу */}
        <Link to={`/`} className="go-home-btn" onClick={timeOutHandler}>⬅ Go home</Link>
        {catchFetchError ? <h1>Плата не отвечает</h1> :
      <>
        <div className="tables"> {/* таблицы */}
          <AbsoluteMaximumRatings/>
          <RecommendedOperatingConditions/>
          <HintTable />
          <MeasureTable allValues={allValues}/>
          <TresholdTable allValues={allValues}/>
        </div>
        <div className="dashboards">
          <div> {/* график */}
          <Dashboard allValues={allValues} yValue='VCCBram' lineColor='#f5b027' graphWidth={1600}
            dataValue={allValues[allValues.length-1].VCCBram} errors={allValues[allValues.length-1].errors[0]}
            data="VCCBram"/>
          {/* поля для ввода новых граничных значений*/}
          <Input name="VCCbram-upper"port={props.port} ipBoard={props.ipBoard}/>
          <Input name="VCCbram-lower"port={props.port} ipBoard={props.ipBoard}/>
          </div>
          <div>
            <Dashboard allValues={allValues} yValue='VCCaux' lineColor='#FF7927' graphWidth={1600}
              dataValue={allValues[allValues.length-1].VCCaux} errors={allValues[allValues.length-1].errors[2]}
              data="VCCaux"/>
            <Input name="VCCaux-upper"port={props.port} ipBoard={props.ipBoard}/>
            <Input name="VCCaux-lower"port={props.port} ipBoard={props.ipBoard}/>
          </div>
        </div>
        <div className="dashboards">
          <div>
            <Graph data={allValues} yValue='temperature' lineColor='#8884d8' width={1600}/>
            <p className="value">Температура: {allValues[allValues.length-1].temperature}C</p>
            <p className="value">
              Наибольшее граничное значение потльзовательской температуры:
              {allValues[allValues.length-1].temperature}C</p>
            <p className={allValues[allValues.length-1].errors[7] === '1'
            || allValues[allValues.length-1].errors[1] ==='1' ?
            'error-text' : 'no error-text'} >
              {allValues[allValues.length-1].errors[7] === '1' ?
              'Пользовательская температура находится за пороговым значением' :
              allValues[allValues.length-1].errors[1] === '1' ?
              'Температура находится за пороговым значением' : 'Температура в пределах порогового значения'}
            </p>
            <Input name="temperature-upper" port={props.port} ipBoard={props.ipBoard}/>
            <Input name="temperature-lower" port={props.port} ipBoard={props.ipBoard}/>
          </div>
        </div> {/* кнопка сброса ошибок */}
        <button onClick={handleClick} className="error-btn" disabled={allValues[allValues.length-1].errors === '00000000' ?
              'disabled': allValues[allValues.length-1].errors === 'undefined' ? 'disabled' : ''}>Сбросить ошибки</button>
      </> }
    </>
  )
}
export default Dashboards