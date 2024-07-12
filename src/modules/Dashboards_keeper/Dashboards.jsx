import React from "react"
import { Link } from "react-router-dom"
import Graph from "./Graph"
// import '../../styles/dashboard.css'
import '../../styles/dashboard-table.css'
import '../../styles/dashboard.css'
import '../../styles/home-btn.css'
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
    renderAll()
  },[])
  async function renderAll(){
    await getApiData()
    timeout=setTimeout(renderAll, 1000);
  }

    async function getApiData() {
      fetch(`http://${props.ipBoard}:${props.port}/sensore`,{
        signal: AbortSignal.timeout(500)
      })
      .then(res => {
        if(res.ok){
          setCatchFetchError(false)
          return res.json()
        }
        else{throw new Error('Something went wrong')}
      })
      .then(data => {setAllValues(data)})
      .catch((error) => {
        setCatchFetchError(true)
      });
    }
    async function handleClick(){
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({buttonType: 'reset-btn'})
      };
      await fetch(`http://${props.ipBoard}:${props.port}/sensore`, requestOptions)
    }

    function timeOutHandler(){
      clearTimeout(timeout)
    }

  return(
    <>
        <Link to={`/`} className="dashboard__btn dashboard__btn_margin" onClick={timeOutHandler}>⬅ Go home</Link>
        {catchFetchError ? <h1>Плата не отвечает</h1> :
      <>
        <div className="dashboard-table_flex dashboard-table_margin">
          <AbsoluteMaximumRatings/>
          <RecommendedOperatingConditions/>
          <HintTable />
          <MeasureTable allValues={allValues}/>
          <TresholdTable allValues={allValues}/>
        </div>
        <div>
          <div className="dashboard__graph_center"> {/* график */}
          <Dashboard allValues={allValues} yValue='VCCBram' lineColor='#f5b027'
            dataValue={allValues[allValues.length-1].VCCBram} errors={allValues[allValues.length-1].errors[0]}
            data="VCCBram"/>
          <Input name="VCCbram-upper"port={props.port} ipBoard={props.ipBoard}/>
          <Input name="VCCbram-lower"port={props.port} ipBoard={props.ipBoard}/>
          </div>
          <div className="dashboard__graph_center">
            <Dashboard allValues={allValues} yValue='VCCaux' lineColor='#FF7927'
              dataValue={allValues[allValues.length-1].VCCaux} errors={allValues[allValues.length-1].errors[2]}
              data="VCCaux"/>
            <Input name="VCCaux-upper"port={props.port} ipBoard={props.ipBoard}/>
            <Input name="VCCaux-lower"port={props.port} ipBoard={props.ipBoard}/>
          </div>
        </div>
        <div>
          <div className="dashboard__graph_center">
            <Graph data={allValues} yValue='temperature' lineColor='#8884d8' width={1650}/>
            <p className="dashboard__text dashboard__text_margin dashboard__text_padding">Температура:
             {Math.round(allValues[allValues.length-1].temperature * 100)/100}°C</p>
            <p className="dashboard__text dashboard__text_margin dashboard__text_padding">
              Наибольшее граничное значение потльзовательской температуры:
              {Math.round(allValues[allValues.length-1].temperature * 100)/ 100}°C</p>
            <p className={`dashboard__text dashboard__text_margin dashboard__text_padding dashboard__text_little
              ${allValues[allValues.length-1].errors[7] === '1' || allValues[allValues.length-1].errors[1] ==='1' ?
              'dashboard__text_error' : 'dashboard__text_ok'}`} >
              {allValues[allValues.length-1].errors[7] === '1' ?
              'Пользовательская температура находится за пороговым значением' :
              allValues[allValues.length-1].errors[1] === '1' ?
              'Температура находится за пороговым значением' : 'Температура в пределах порогового значения'}
            </p>
            <Input name="temperature-upper" port={props.port} ipBoard={props.ipBoard}/>
            <Input name="temperature-lower" port={props.port} ipBoard={props.ipBoard}/>
          </div>
        </div>
        <button onClick={handleClick} className="home-btn home-btn_width home-btn_position"
          disabled={allValues[allValues.length-1].errors === '00000000' ?
          true: allValues[allValues.length-1].errors === 'undefined' ? true : false}>
          Сбросить ошибки
        </button>
      </> }
    </>
  )
}
export default Dashboards