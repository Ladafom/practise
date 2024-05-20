import React from "react";
import Graph from "./Graph"

function Dashboard(props){
  return(
    <div>
        <Graph data={props.allValues} yValue={props.yValue} lineColor={props.lineColor} width={props.graphWidth}/>
        <p className="value">{props.data}: {Math.round(props.dataValue * 100)/100}V</p>
        <p className={props.errors === '1' ? 'error-text' : 'no error-text'} >
          {props.errors === '1' ? 'Напряжение находится за пороговым значением' : 'Напряжение в пределах порогового значения'}
        </p>
    </div>
  )
}

export default Dashboard