import React from "react";
import '../../styles/table.css'

function RecommendedOperatingConditions(props){
  return(
    <table className="data-table">
      <tr>
          <th>Рекомендуемые условия эксплуатации</th>
        <th>Upper</th>
        <th>Lower</th>
      </tr>
      <tr>
        <td>Temperature, C</td>
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
          0.876
        </td>
        <td>
          0.876
        </td>
      </tr>
      <tr>
        <td>VCCaux, V</td>
        <td>
          1.854
        </td>
        <td>
          1.746
        </td>
      </tr>
      <tr>
        <td>VCCint, V</td>
        <td>
          0.876
        </td>
        <td>
          0.825
        </td>
      </tr>
      <tr>
        <td>VCCintlp, V</td>
        <td>
          0.892
        </td>
        <td>
          0.808
        </td>
      </tr>
      <tr>
        <td>VCCintfp, V</td>
        <td>
          0.892
        </td>
        <td>
          0.808
        </td>
      </tr>
      <tr>
        <td>VCCpsaux, V</td>
        <td>
          1.89
        </td>
        <td>
          1.710
        </td>
      </tr>
    </table>
  )
}

export default RecommendedOperatingConditions