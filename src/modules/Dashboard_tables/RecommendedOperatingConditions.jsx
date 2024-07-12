import React from "react";
import { Table, ConfigProvider } from "antd";
import '../../styles/dashboard-table.css'

function RecommendedOperatingConditions(){
  const dataSource = [
    {
      key: '1',
      recommendedConditions: 'Temperature, °C',
      upper: '85',
      lower: '0',
    },
    {
      key: '2',
      recommendedConditions: 'VCCBram, В',
      upper: '0.92',
      lower: '0.76',
    },
    {
      key: '3',
      recommendedConditions: 'VCCaux, В',
      upper: '1.854',
      lower: '1.746',
    },
    {
      key: '4',
      recommendedConditions: 'VCCint, В',
      upper: '0.876',
      lower: '0.825',
    },
    {
      key: '5',
      recommendedConditions: 'VCCintlp, В',
      upper: '0.892',
      lower: '0.808',
    },
    {
      key: '6',
      recommendedConditions: 'VCCintfp, В',
      upper: '0.892',
      lower: '0.808',
    },
    {
      key: '7',
      recommendedConditions: 'VCCpsaux, В',
      upper: '1.89',
      lower: '1.71',
    },
  ];

  const columns = [
    {
      title: 'Рекомендуемые условия эксплуатации',
      align: 'center',
      dataIndex: 'recommendedConditions',
      key: 'recommendedConditions',
    },
    {
      title: 'Upper',
      align: 'center',
      dataIndex: 'upper',
      key: 'upper',
    },
    {
      title: 'Lower',
      align: 'center',
      dataIndex: 'lower',
      key: 'lower',
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

export default RecommendedOperatingConditions