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
          {props.allValues[props.allValues.length-1].tempUpper}
        </td>
        <td>
          {props.allValues[props.allValues.length-1].tempLower}
        </td>
      </tr>
      <tr>
        <td>VCCBram, V</td>
        <td>
          {props.allValues[props.allValues.length-1].VCCBramUpper}
        </td>
        <td>
          {props.allValues[props.allValues.length-1].VCCBramLower}
        </td>
      </tr>
      <tr>
        <td>VCCaux, V</td>
        <td>
          {props.allValues[props.allValues.length-1].VCCauxUpper}
        </td>
        <td>
          {props.allValues[props.allValues.length-1].VCCauxLower}
        </td>
      </tr>
    </table>
  )
}

export default TresholdTable