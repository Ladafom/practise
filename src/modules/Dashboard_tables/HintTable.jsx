import React from "react";
import { Table, ConfigProvider } from "antd";
import '../../styles/dashboard-table.css'

function HintTable(){
  const dataSource = [
    {
      key: '1',
      name: 'VCCBram',
      value: 'Напряжение питания ОЗУ',
    },
    {
      key: '2',
      name: 'VCCaux',
      value: 'Вспомогательное напряжение питания',
    },
    {
      key: '3',
      name: 'VCCint',
      value: 'Напряжение питания программируемой логики',
    },
    {
      key: '4',
      name: 'VCCintlp',
      value: 'Напряжение питания процессорной системы в спящем режиме',
    },
    {
      key: '5',
      name: 'VCCintfp',
      value: 'Напряжение питания процессорной системы в активном режиме',
    },
    {
      key: '6',
      name: 'VCCpsaux',
      value: 'Вспомогательное напряжение питания процессорной системы',
    },
  ];

  const columns = [
    {
      title: 'Название',
      align: 'center',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Значение',
      align: 'center',
      dataIndex: 'value',
      key: 'value',
    },
  ];

  return(
    <>
      <ConfigProvider
        theme={{
          components: {
            Table: {
              colorBgContainer:'#EDECEA',
              cellFontSize:20,
              cellPaddingBlock:10,
              cellPaddingInline:15,
              headerColor:'#00355E',
              colorText:'#00355E',
              headerBorderRadius:0,
              fontFamily:"Roboto",
            },
          },
        }}>
          <Table dataSource={dataSource} columns={columns}
          pagination={false} scroll={{ x: '30%' }}/>
      </ConfigProvider>
    </>
  )
}

export default HintTable