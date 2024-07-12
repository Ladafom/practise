import React from "react";
import '../../styles/dashboard-table.css'

function Table(props){
  return (
    <table className="dashboard-table">
      <thead>
        <tr className="dashboard-table__tr">
          <th className="dashboard-table__th">Измеряемая величина</th>
          <th className="dashboard-table__th">Значение</th>
        </tr>
      </thead>
      <tbody>
        <tr className="dashboard-table__tr">
        <td className={ props.allValues[props.allValues.length-1].errors[7]==='1'||props.allValues[props.allValues.length-1].errors[1]==='1' ?
            'dashboard-table__tr_error' : 'dashboard-table__tr_ok'}>Temperature, °C</td>
        <td>
          {Math.round(props.allValues[props.allValues.length-1].temperature * 100)/100}
        </td>
        </tr>
        <tr className="dashboard-table__tr">
          <td className={ props.allValues[props.allValues.length-1].errors[0]==='1' ?
            'dashboard-table__tr_error' : 'dashboard-table__tr_ok'}> VCCBram, B</td>
          <td>
            {Math.round(props.allValues[props.allValues.length-1].VCCBram * 100)/100}
          </td>
        </tr>
        <tr className='dashboard-table__tr'>
          <td className={props.allValues[props.allValues.length-1].errors[2]==='1' ?
            'dashboard-table__tr_error': 'dashboard-table__tr_ok'}> VCCaux, B</td>
          <td>
            {Math.round(props.allValues[props.allValues.length-1].VCCaux*100)/100}
          </td>
        </tr>
        <tr className='dashboard-table__tr'>
          <td className={props.allValues[props.allValues.length-1].errors[6]==='1' ?
            'dashboard-table__tr_error' : 'dashboard-table__tr_ok'}>VCCint, B</td>
          <td>{props.allValues[props.allValues.length-1].errors[6]==='1' ?
            'Not OK' : 'OK'}
          </td>
        </tr>
        <tr className='dashboard-table__tr'>
          <td className={props.allValues[props.allValues.length-1].errors[5]==='1' ?
            'dashboard-table__tr_error' : 'dashboard-table__tr_ok'}>VCCintpl, B</td>
          <td>{props.allValues[props.allValues.length-1].errors[5]==='1' ?
            'Not OK' : 'OK'}
          </td>
        </tr>
        <tr className='dashboard-table__tr'>
          <td className={props.allValues[props.allValues.length-1].errors[4]==='1' ?
            'dashboard-table__tr_error' : 'dashboard-table__tr_ok'}>VCCintfp, B</td>
          <td>{props.allValues[props.allValues.length-1].errors[4]==='1' ?
            'Not OK' : 'OK'}
          </td>
        </tr>
        <tr className='dashboard-table__tr'>
          <td className={props.allValues[props.allValues.length-1].errors[3]==='1' ?
            'dashboard-table__tr_error': 'dashboard-table__tr_ok'}>VCCpsaux, B</td>
          <td>{props.allValues[props.allValues.length-1].errors[3]==='1' ?
            'Not OK' : 'OK'}
          </td>
        </tr>
      </tbody>
    </table>
  )
}

export default Table