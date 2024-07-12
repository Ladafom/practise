import React from "react"
import '../styles/home-table.css'
import '../styles/home-form.css'
import '../styles/home-btn.css'
import HomeLine from "./HomeLine"

function Home(props){

  React.useEffect(()=>{
    setTableWidth(formRef.current.offsetWidth)
  },[])
  const formRef = React.useRef(0);
  const [tableWidth, setTableWidth] = React.useState(500)
  const formStyle = {
    maxWidth : tableWidth
    }
  const [addStatus,setAddStatus] = React.useState(false)
  const [boardIpContent, setBoardIpContent] = React.useState()
  const [boardPortContent, setBoardPortContent] = React.useState()
  const rows=[]

  function showLines() {
    for (let i = 0; i < props.db.length; i++) {
      rows.push(<HomeLine idBoard={props.db[i].boardId} ipBoard={props.db[i].boardIp}
        portNum={props.db[i].portNum} locale={props.db[i].locale}
        note={props.db[i].note} dataBaseApiHandler={props.dataBaseApi}
        key={props.db[i].boardId}/>);
    }
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
  function changeAddStatus() {
    setAddStatus(!addStatus)
  }
  showLines()

    return(
    <>
    <table ref={formRef} className="home-table home-table_center">
      <tr className="home-table__tr home-table_gray">
        <th className="home-table__th home-table_gray">IP устройства</th>
        <th className="home-table__th home-table_gray">Порт</th>
        <th className="home-table__th home-table_gray">Статус</th>
        <th className="home-table__th home-table_gray">Местоположение</th>
        <th className="home-table__th home-table_gray">Заметки</th>
        <th className="home-table__th home-table_gray">Действия</th>
      </tr>
        {rows}
    </table>
    {addStatus ?
      <form id="dbForm" style={formStyle} action={addToDB}
      className="home-form home-form_center">
        <label className="home-form__label_margin"> Введите ip-адрес устройства:
          <input type="text" value={boardIpContent}
                  placeholder="ip"
                  onChange={e => setBoardIpContent(e.target.value)}
                  className="home-form__input home-form__input_positon"
                  maxlength="15">
          </input>
        </label>
        <label className="home-form__label_margin"> Введите порт устройства:
          <input type="text" value={boardPortContent}
                  placeholder="port"
                  onChange={e => setBoardPortContent(e.target.value)}
                  className="home-form__input home-form__input_positon"
                  maxlength="4">
          </input>
        </label>
      <div className="home-form__buttons_flex">
        <button className="home-form__button"
        onClick={addToDB}>Добавить</button>
        <button className="home-form__button"
        onClick={changeAddStatus}>Отменить</button>
      </div>
      </form>
    : <></>
    }
      <button className="home-btn home-btn_position" style={formStyle} onClick={changeAddStatus}
      disabled={addStatus? true : false}>Новое устройство</button>
    </>
  )
}

export default Home