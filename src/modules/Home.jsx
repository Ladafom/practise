import React from "react"
import '../styles/home.css'
import HomeLine from "./HomeLine"

function Home(props){
  // объявление переменных
  // переменная addStatus типа boolean, отвечающая за статус добаления новой платы
  const [addStatus,setAddStatus] = React.useState(false)
  const [boardIpContent, setBoardIpContent] = React.useState()
  const [boardPortContent, setBoardPortContent] = React.useState()
  const rows=[]
  function showLines() { // функция объявления строк, содержащих информацию о платах
    for (let i = 0; i < props.db.length; i++) {
      rows.push(<HomeLine idBoard={props.db[i].boardId} ipBoard={props.db[i].boardIp}
        portNum={props.db[i].portNum} locale={props.db[i].locale}
        note={props.db[i].note} dataBaseApiHandler={props.dataBaseApi}/>);
    }
  }
  async function addToDB(){ // функция post-запроса к серверу
    const requestOptions = { // содержимое запроса
      method: 'POST', // объявление метода запроса
      headers: { // заголовок запроса
        'Content-Type': 'application/json' // тип отсылаемого запроса - json
      },
      body: JSON.stringify({'boardIp':boardIpContent, // тело запроса
                            'port':boardPortContent})
    };
    // отправка запроса на сервер
    await fetch(`http://localhost:8001/boards/${props.idBoard}`, requestOptions)
  }
    function changeAddStatus() { // функция изменения статуса добавления новой платы
      setAddStatus(!addStatus) // изменение статуса на противоположный
    }
  showLines() // вызов функции объявления строк

  return(
    <>
    <table className="home-table">
      <tr>
        <th>IP устройства</th>
        <th>Порт</th>
        <th>Статус</th>
        <th>Местоположение</th>
        <th>Заметки</th>
      </tr>
        {rows}
    </table>
    {/* если addStatus == true, то разрешено добавить новую плату*/}
    {addStatus ?
      <form id="dbForm" action={addToDB}>
        <label> Введите ip-адрес устройства:
          {/* поле для ввода ip-адреса*/}
          <input type="text" value={boardIpContent}
                  placeholder="ip"
                  onChange={e => setBoardIpContent(e.target.value)}>
          </input>
        </label>
        {/* поле для ввода порта*/}
        <label> Введите порт устройства:
          <input type="text" value={boardPortContent}
                  placeholder="port"
                  onChange={e => setBoardPortContent(e.target.value)}>
          </input>
        </label>
      <div className="form-buttons">
        {/* кнопка отправки post-запроса*/}
        <button onClick={addToDB}>Добавить</button>
        {/* кнопка изменения статуса добавления новой платы*/}
        <button onClick={changeAddStatus}>Отменить</button>
      </div>
      </form>
    : <></>
    }
    {/* кнопка изменения статуса добавления новой платы*/}
    <button className="add-btn" onClick={changeAddStatus}
      disabled={addStatus? true : false}>Новое устройство</button>
    </>
  )
}

export default Home