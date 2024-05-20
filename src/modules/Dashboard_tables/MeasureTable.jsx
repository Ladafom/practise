import React from "react";
import '../../styles/table.css'

function Table(props){
  return (
    <table className="data-table">
      <tr>
        <th>Измеряемая величина</th>
        <th>Значение</th>
      </tr>
      <tr>
        <td className={props.allValues[props.allValues.length-1].errors[7]==='1'||props.allValues[props.allValues.length-1].errors[1]==='1' ?
            'value-bad' : 'value-good'}>Temperature, C</td>
        <td>
          {Math.round(props.allValues[props.allValues.length-1].temperature * 100)/100}
        </td>
      </tr>
      <tr>
        <td className={props.allValues[props.allValues.length-1].errors[0]==='1' ?
          'value-bad' : 'value-good'}> VCCBram, V</td>
        <td>
          {Math.round(props.allValues[props.allValues.length-1].VCCBram * 100)/100}
        </td>
      </tr>
      <tr>
        <td className={props.allValues[props.allValues.length-1].errors[2]==='1' ?
          'value-bad' : 'value-good'}> VCCaux, V</td>
        <td>
          {Math.round(props.allValues[props.allValues.length-1].VCCaux*100)/100}
        </td>
      </tr>
      <tr>
        <td className={props.allValues[props.allValues.length-1].errors[6]==='1' ?
          'value-bad' : 'value-good'}>VCCint, V</td>
        <td>{props.allValues[props.allValues.length-1].errors[6]==='1' ?
          'Not OK' : 'OK'}
        </td>
      </tr>
      <tr>
        <td className={props.allValues[props.allValues.length-1].errors[5]==='1' ?
          'value-bad' : 'value-good'}>VCCintpl, V</td>
        <td>{props.allValues[props.allValues.length-1].errors[5]==='1' ?
          'Not OK' : 'OK'}
        </td>
      </tr>
      <tr>
        <td className={props.allValues[props.allValues.length-1].errors[4]==='1' ?
          'value-bad' : 'value-good'}>VCCintfp, V</td>
        <td>{props.allValues[props.allValues.length-1].errors[4]==='1' ?
          'Not OK' : 'OK'}
        </td>
      </tr>
      <tr>
        <td className={props.allValues[props.allValues.length-1].errors[3]==='1' ?
          'value-bad' : 'value-good'}>VCCpsaux, V</td>
        <td>{props.allValues[props.allValues.length-1].errors[3]==='1' ?
          'Not OK' : 'OK'}
        </td>
      </tr>
    </table>
  )
}

export default Table