import React from "react";
import { Table, ConfigProvider } from "antd";
import '../../styles/dashboard-table.css'

function AbsoluteMaximumRatings(){

  const dataSource = [
    {
      key: '1',
      absoluteTresholds: 'Температура хранения, °C',
      upperTresholds: '125',
      lowerTresholds: '-40',
    },
    {
      key: '2',
      absoluteTresholds: 'Рабочая температура °C',
      upperTresholds: '85',
      lowerTresholds: '0',
    },
    {
      key: '3',
      absoluteTresholds: 'VCCBram, В',
      upperTresholds: '1',
      lowerTresholds: '-0.5',
    },
    {
      key: '4',
      absoluteTresholds: 'VCCaux, В',
      upperTresholds: '2',
      lowerTresholds: '-0.5',
    },
    {
      key: '5',
      absoluteTresholds: 'VCCint, В',
      upperTresholds: '1',
      lowerTresholds: '-0.5',
    },
    {
      key: '6',
      absoluteTresholds: 'VCCintlp, В',
      upperTresholds: '1',
      lowerTresholds: '-0.5',
    },
    {
      key: '7',
      absoluteTresholds: 'VCCintfp, В',
      upperTresholds: '1',
      lowerTresholds: '-0.5',
    },
    {
      key: '8',
      absoluteTresholds: 'VCCpsaux, В',
      upperTresholds: '2',
      lowerTresholds: '-0.5',
    },
  ];

  const columns = [
    {
      title: 'Абсолютные граничные значения',
      align: 'center',
      dataIndex: 'absoluteTresholds',
      key: 'absoluteTresholds',
    },
    {
      title: 'Upper',
      align: 'center',
      dataIndex: 'upperTresholds',
      key: 'upperTresholds',
    },
    {
      title: 'Lower',
      align: 'center',
      dataIndex: 'lowerTresholds',
      key: 'lowerTresholds',
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
          pagination={false}/>
      </ConfigProvider>
    </>
  )
}

export default AbsoluteMaximumRatings