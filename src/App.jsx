import React from 'react'
import { useState } from 'react'
import {createBrowserRouter, RouterProvider, Routes, Route, BrowserRouter} from 'react-router-dom'
import Home from './modules/Home'
import Dashboards from './modules/Dashboards_keeper/Dashboards'
import './App.css'


function App(){
  const [dbData, setdbData] = React.useState([{
    "boardId": "none",
    "boardIp": "none",
    "portNum": "none",
    "locale": "none",
    "note": "none"
  }])

  React.useEffect(()=>{
    dataBaseApi()
  },[])

  async function dataBaseApi(){
    fetch('http://localhost:8001/boards')
    .then(res => {
      if(res.ok){
        return res.json()
      }
      else{throw new Error('Something went wrong')}
    })
    .then(data => {setdbData(data)})
    // .catch((error) => {
    //   setCatchFetchError(true)
    // });
  }
  const rows=[]
  for (let i = 0; i < dbData.length; i++) {
    rows.push(<Route path={`dashboard/${dbData[i].boardId}`}
              element={<Dashboards port={dbData[i].portNum}
              ipBoard={dbData[i].boardIp}/>} key={dbData[i].boardId} />);
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home db={dbData} dataBaseApi={() => dataBaseApi()}/>}/>
        {rows}
      </Routes>
    </BrowserRouter>
  );
}

export default App
