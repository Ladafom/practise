import React from "react";
import Graph from "./Graph"
import '../../styles/dashboard.css'

function Dashboard(props){
  return(
    <div>
        <Graph data={props.allValues} yValue={props.yValue} lineColor={props.lineColor}/>
        <p className="dashboard__text dashboard__text_padding dashboard__text_margin">
          {props.data}: {Math.round(props.dataValue * 100)/100}V
        </p>
        <p className={ `dashboard__text dashboard__text_padding dashboard__text_margin dashboard__text_little
          ${props.errors === '1' ? 'dashboard__text_error' : 'dashboard__text_ok'}`} >
          {props.errors === '1' ? 'Напряжение находится за пороговым значением' :
          'Напряжение в пределах порогового значения'}
        </p>
    </div>
  )
}

export default Dashboard