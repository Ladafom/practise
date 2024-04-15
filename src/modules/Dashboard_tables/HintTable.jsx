import React from "react";

function HintTable(){
  return(
    <table className="data-table">
    <tr>
      <th>Название</th>
      <th>Значение</th>
    </tr>
    <tr>
      <td>VCCBram</td>
      <td className='td-width'>
        Напряжение питания ОЗУ
      </td>
    </tr>
    <tr>
      <td>VCCaux</td>
      <td>
        Вспомогательное напряжение питания
      </td>
    </tr>
    <tr>
      <td>VCCint</td>
      <td>
        Напряжение питания программируемой логики
      </td>
    </tr>
    <tr>
      <td>VCCintlp</td>
      <td>
        Напряжение питания процессорной системы в спящем режиме
      </td>
    </tr>
    <tr>
      <td>VCCintfp</td>
      <td>
        Напряжение питания процессорной системы в активном режиме
      </td>
    </tr>
    <tr>
      <td>VCCpsaux</td>
      <td>
        Вспомогательное напряжение питания процессорной системы
      </td>
    </tr>
  </table>
  )
}

export default HintTable