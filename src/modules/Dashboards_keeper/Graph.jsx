import React, { PureComponent } from "react"
import { LineChart, Line, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Tooltip, Legend } from 'recharts';

function Graph(props){

  return(
    <LineChart width={1650} height={340} data={props.data} margin={{ top: 40, right: 20, bottom: 40, left: -20 }}>
      <Line type="monotone" dataKey={props.yValue} stroke={props.lineColor} animationDuration={0}/>
      <CartesianGrid stroke="rgba(0, 53, 94, 0.3)" strokeDasharray="3 3"/>
      <XAxis  style={{
        fontSize: '15px',
        fontFamily: 'Roboto',
        color: '#00355E',
        }} stroke='#00355E' dataKey="time" interval={0} angle={80} dy={25}/>
      <YAxis  style={{
        fontSize: '15px',
        fontFamily: 'Roboto',
        color: '#00355E',
        }} stroke='#00355E'  type="number" domain={['auto','auto']}/>
      <Tooltip />
    </LineChart>
    )
}

export default Graph