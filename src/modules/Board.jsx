import React from "react";
import { Link } from "react-router-dom"
import '../styles/home.css'

let timeout

function Board(props){
  const [allErrorsSensore, setAllErrorsSensore] = React.useState([{
    "errors": "undefined"}])
  const [catchFetchErrorSensore, setCatchFetchErrorSensore] = React.useState(false)
  const [toHomeTable, setHomeTable]=  React.useState({})
  React.useEffect(()=>{
    // setInterval(renderAll, 1000)
    renderAll()
    // setTimeout(renderAll, 1000)
  },[])
  async function renderAll(){
    await getApiData(props.ipBoard,props.portNum,setAllErrorsSensore,setCatchFetchErrorSensore,catchFetchErrorSensore)
    timeout=setTimeout(renderAll, 1000)
    setHomeTable({'ipBoard': props.ipBoard,
                  'status':'Status',
                  'location':'Location'
                })
  }
  async function getApiData(ipBoard,portNum, SetUseEffect, setCatchFetchError,catchFetchError) {
    fetch(`http://${ipBoard}:${portNum}/sensore`,{
      signal: AbortSignal.timeout(500)
    })
    .then(res => {
      if(res.ok){return res.json()}
      else{throw new Error('Something went wrong')}
    })
    .then(data => {SetUseEffect(data)})
    .catch((error) => {
      setCatchFetchError(!catchFetchError)
    });
  }
  function timeOutHandler(){
    clearTimeout(timeout)
  }
  return(
    <>
      <Link to={`dashboard/${props.idBoard}`} className={`sensor ${catchFetchErrorSensore ?
        'critical-error': allErrorsSensore[allErrorsSensore.length-1].errors > 0 ?
        'error':''}`} onClick={timeOutHandler}></Link>
    </>
  )
}

export default Board