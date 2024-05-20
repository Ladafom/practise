import React from "react";
import '../../styles/table.css'

function TresholdTable(props){
  return(
    <table className="data-table">
      <tr>
        <th>Граничные значения</th>
        <th>Upper</th>
        <th>Lower</th>
      </tr>
      <tr>
        <td>Temperature, C</td>
        <td>
          {Math.round(props.allValues[props.allValues.length-1].tempUpper * 100)/100}
        </td>
        <td>
          {Math.round(props.allValues[props.allValues.length-1].tempLower* 100)/100}
        </td>
      </tr>
      <tr>
        <td>VCCBram, V</td>
        <td>
          {Math.round(props.allValues[props.allValues.length-1].VCCBramUpper*100)/100}
        </td>
        <td>
          {Math.round(props.allValues[props.allValues.length-1].VCCBramLower*100)/100}
        </td>
      </tr>
      <tr>
        <td>VCCaux, V</td>
        <td>
          {Math.round(props.allValues[props.allValues.length-1].VCCauxUpper *100)/100}
        </td>
        <td>
          {Math.round(props.allValues[props.allValues.length-1].VCCauxLower*100)/100}
        </td>
      </tr>
    </table>
  )
}

export default TresholdTable