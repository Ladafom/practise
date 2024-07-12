import React from "react";
import '../../styles/dashboard-table.css'

function TresholdTable(props){
  return(
    <table className="dashboard-table">
      <thead>
        <tr className="dashboard-table__tr">
          <th className="dashboard-table__th">Граничные значения</th>
          <th className="dashboard-table__th">Upper</th>
          <th className="dashboard-table__th">Lower</th>
        </tr>
      </thead>
      <tbody>
        <tr className="dashboard-table__tr">
          <td className="dashboard-table__td">Temperature, °C</td>
          <td>
            {Math.round(props.allValues[props.allValues.length-1].tempUpper * 100)/100}
          </td>
          <td>
            {Math.round(props.allValues[props.allValues.length-1].tempLower* 100)/100}
          </td>
        </tr>
        <tr className="dashboard-table__tr">
          <td className="dashboard-table__td">VCCBram, B</td>
          <td>
            {Math.round(props.allValues[props.allValues.length-1].VCCBramUpper*100)/100}
          </td>
          <td>
            {Math.round(props.allValues[props.allValues.length-1].VCCBramLower*100)/100}
          </td>
        </tr>
        <tr className="dashboard-table__tr">
          <td className="dashboard-table__td">VCCaux, B</td>
          <td>
            {Math.round(props.allValues[props.allValues.length-1].VCCauxUpper *100)/100}
          </td>
          <td>
            {Math.round(props.allValues[props.allValues.length-1].VCCauxLower*100)/100}
          </td>
        </tr>
      </tbody>
    </table>
  )
}

export default TresholdTable