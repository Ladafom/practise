import React, { PureComponent } from "react"
import { LineChart, Line, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Tooltip, Legend } from 'recharts';

function Graph(props){

  return(
    <LineChart width={props.width} height={340} data={props.data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
      <Line type="monotone" dataKey={props.yValue} stroke={props.lineColor} animationDuration={0}/>
      <CartesianGrid stroke="#ccc" strokeDasharray="3 3"/>
      <XAxis dataKey="time" interval={0} angle={80} dy={25}/>
      <YAxis  type="number" domain={['auto','auto']}/>
      <Tooltip />
    </LineChart>
    )
}

export default Graph