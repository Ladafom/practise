import React from "react";
import { Link } from "react-router-dom"
import '../styles/home.css'
import HomeLine from "./HomeLine";

let timeout

function HomeTable(props){

  // const [allErrorsSensore, setAllErrorsSensore] = React.useState([{
  //   "errors": "undefined"}])
  // const [catchFetchErrorSensore, setCatchFetchErrorSensore] = React.useState(false)
  // React.useEffect(()=>{
  //   // setInterval(renderAll, 1000)
  //   renderAll()
  //   // setTimeout(renderAll, 1000)
  // },[])
  // async function renderAll(){
  //   await getApiData(props.ipBoard,props.portNum,setAllErrorsSensore,setCatchFetchErrorSensore,catchFetchErrorSensore)
  //   timeout=setTimeout(renderAll, 1000)
  // }
  // async function getApiData(ipBoard,portNum, SetUseEffect, setCatchFetchError,catchFetchError) {
  //   fetch(`http://${ipBoard}:${portNum}/sensore`,{
  //     signal: AbortSignal.timeout(500)
  //   })
  //   .then(res => {
  //     if(res.ok){return res.json()}
  //     else{throw new Error('Something went wrong')}
  //   })
  //   .then(data => {SetUseEffect(data)})
  //   .catch((error) => {
  //     setCatchFetchError(!catchFetchError)
  //   });
  // }
  // function timeOutHandler(){
  //   clearTimeout(timeout)
  // }
  return(
    <>
      <table className="data-table">
      <tr>
        <th>IP of a board</th>
        <th>Status</th>
        <th>Location</th>
      </tr>
        <HomeLine idBoard={1} ipBoard={'10.42.0.29'} portNum={8000}/>
        <HomeLine idBoard={2} ipBoard={'localhost'} portNum={8002}/>
        <HomeLine idBoard={3} ipBoard={'localhost'} portNum={8003}/>
    </table>
    </>
  )
}

export default HomeTable