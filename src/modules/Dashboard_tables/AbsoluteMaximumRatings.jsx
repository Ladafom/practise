import React from "react";
import '../../styles/table.css'

function AbsoluteMaximumRatings(props){
  return(
    <table className="data-table">
      <tr>
        <th>Абсолютные граничные значения</th>
        <th>Upper</th>
        <th>Lower</th>
      </tr>
      <tr>
        <td>Температура хранения, C</td>
        <td className='td-width'>
            125
        </td>
        <td className='td-width'>
          -40
        </td>
      </tr>
      <tr>
          <td>Рабочая температура C</td>
        <td className='td-width'>
          85
        </td>
        <td className='td-width'>
          0
        </td>
      </tr>
      <tr>
        <td>VCCBram, V</td>
        <td>
          1
        </td>
        <td>
          -0.5
        </td>
      </tr>
      <tr>
        <td>VCCaux, V</td>
        <td>
          2
        </td>
        <td>
          -0.5
        </td>
      </tr>
      <tr>
        <td>VCCint, V</td>
        <td>
          1
        </td>
        <td>
          - 0.5
        </td>
      </tr>
      <tr>
        <td>VCCintlp, V</td>
        <td>
          1
        </td>
        <td>
          - 0.5
        </td>
      </tr>
      <tr>
        <td>VCCintfp, V</td>
        <td>
          1
        </td>
        <td>
          - 0.5
        </td>
      </tr>
      <tr>
        <td>VCCpsaux, V</td>
        <td>
          2
        </td>
        <td>
          -0.5
        </td>
      </tr>
    </table>
  )
}

export default AbsoluteMaximumRatings