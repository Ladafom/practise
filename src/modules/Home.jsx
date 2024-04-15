import React from "react"
import '../styles/home.css'
import HomeLine from "./HomeLine"

function Home(props){

  const [addStatus,setAddStatus] = React.useState(false)
  const [boardIpContent, setBoardIpContent] = React.useState()
  const [boardPortContent, setBoardPortContent] = React.useState()
  const rows=[]
  function showLines() {
    for (let i = 0; i < props.db.length; i++) {
      rows.push(<HomeLine idBoard={props.db[i].boardId} ipBoard={props.db[i].boardIp}
        portNum={props.db[i].portNum} locale={props.db[i].locale}
        note={props.db[i].note} dataBaseApiHandler={props.dataBaseApi}/>);
    }
  }
  function addLineHandler() {
    setAddStatus(!addStatus)
  }
  async function addToDB(){
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({'boardIp':boardIpContent,
                            'port':boardPortContent})
    };
    await fetch(`http://localhost:8001/boards/${props.idBoard}`, requestOptions)
  }
    function cancelAddToDB() {
      setAddStatus(!addStatus)
    }
  showLines()

  return(
    <>
    <table className="home-table">
      <tr>
        <th>IP of a board</th>
        <th>Port</th>
        <th>Status</th>
        <th>Location</th>
        <th>Note</th>
      </tr>
        {rows}
    </table>
    {addStatus ?
    <form id="dbForm" action={addToDB}>
      <label> Введите ip-адрес устройства:
        <input type="text" value={boardIpContent}
                placeholder="ip"
                onChange={e => setBoardIpContent(e.target.value)}>
        </input>
      </label>
      <label> Введите порт устройства:
        <input type="text" value={boardPortContent}
                placeholder="port"
                onChange={e => setBoardPortContent(e.target.value)}>
        </input>
      </label>
      <div className="form-buttons">
        <button onClick={addToDB}>Добавить</button>
        <button onClick={cancelAddToDB}>Отменить</button>
      </div>
    </form>
    : <></>
    }
    <button className="add-btn" onClick={addLineHandler} disabled={addStatus? true : false}>Новое устройство</button>
    </>
  )
}

export default Home