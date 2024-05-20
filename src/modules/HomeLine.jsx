import React from "react";
import { Link } from "react-router-dom"
import '../styles/home.css'

let timeout
function HomeLine(props){
  // объявление переменных
  const [allErrorsSensore, setAllErrorsSensore] = React.useState([{
    "errors": "undefined"}])
  const [catchFetchErrorSensore, setCatchFetchErrorSensore] = React.useState(false)
  const [noteContent, setNoteContent] = React.useState(props.note)
  const [localeContent, setLocaleContent] = React.useState(props.locale)
  const [editStatus, setEditStatus] = React.useState(false)

  React.useEffect(()=>{
    renderAll() // вызов get-запроса
  },[])

  async function renderAll(){ // функция выполнения get-запроса
    // вызов функции get-запроса
    await getApiData(props.ipBoard,props.portNum,setAllErrorsSensore,setCatchFetchErrorSensore,catchFetchErrorSensore)
    timeout=window.setTimeout(renderAll, 1000) // выполнение get-запроса каждую секунду (установка таймаута)
  }
  // функция get-запроса об общем состоянии платы
  async function getApiData(ipBoard,portNum, SetUseEffect, setCatchFetchError,catchFetchError) {
    fetch(`http://${ipBoard}:${portNum}/sensore`) // отправка get-запроса на сервер
    .then(res => {
      if(res.ok){ // если ответ получен
        setCatchFetchError(false) // переменная catchFetchErrorSensore == false
        return res.json() // переход на следующий метод then
      } // сообщить об ошибке, если ответ не получен
      else{throw new Error('Something went wrong')}
    })
    .then(data => {SetUseEffect(data)}) // запись данных с сервера в объект catchFetchErrorSensore
    .catch((error) => { // если была поймана ошибка при получении ответа
      setCatchFetchError(true) // переменная catchFetchErrorSensore == true
    });
  }
  async function editDataBase(){ // функция put-запроса к серверу
    const requestOptions = { // содержимое запроса
      method: 'PUT', // объявление метода запроса
      headers: { // заголовок запроса
        'Content-Type': 'application/json' // тип отсылаемого запроса - json
      },
      body: JSON.stringify({"locale": localeContent, // тело запроса
                            "note": noteContent,
                            'boardId':props.idBoard})
    };
    await fetch(`http://localhost:8001/boards/${props.idBoard}`, requestOptions)
  }
  async function deleteRowDataBase(){ // функция delete-запроса к серверу
    const requestOptions = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({'boardId':props.idBoard})
    };
    await fetch(`http://localhost:8001/boards/${props.idBoard}`, requestOptions)
    props.dataBaseApiHandler() // вызов get-запроса
  }

  function editManage(){ // функция отслеживания изменений в БД
    setEditStatus(!editStatus)
    if(editStatus === true){ // если статус редактирования true
      editDataBase() // вызов функции put-запроса к серверу
      props.dataBaseApiHandler() // вызов get-запроса
    }
  }
  function timeOutHandler(){
    window.opener.clearTimeout(timeout) // очистка таймаута
  }
  return(
    <>
      <tr className={`line ${catchFetchErrorSensore ?
          'critical-error': allErrorsSensore[allErrorsSensore.length-1].errors > 0 ?
          'error':''}`}>
        <td> {/*переход на страницу платы*/}
          <Link to={`dashboard/${props.idBoard}`} onClick={timeOutHandler}>
            {props.ipBoard} <br/> (Нажмите сюда, чтобы увидеть детали)
          </Link>
        </td>
        <td>
          {props.portNum}
        </td>
        <td> {/*статус платы*/}
        {catchFetchErrorSensore ? 'Нет ответа' :
            allErrorsSensore[allErrorsSensore.length-1].errors > 0 ? 'Ошибка' : 'OК'}
        </td>
        <td> {/* если статус редактирования true, разрешить запись в поле*/}
          {editStatus ?
            <textarea rows="5" cols="33"
              value={localeContent}
              placeholder="Местонахождение платы"
              onChange={e => setLocaleContent(e.target.value)}>
            </textarea> :
            <p style={{background:'none'}}>{props.locale}</p>
          }
        </td>
        <td>
          {editStatus ?
            <textarea rows="5" cols="33"
              value={noteContent}
              placeholder="Заметка о плате"
              onChange={e => setNoteContent(e.target.value)}>
            </textarea> :
            <p style={{background:'none'}}>{props.note}</p>
          }
        </td> {/*кнопка отправки put-запроса*/}
        <button onClick={editManage}>{editStatus? 'Опубликовать':'Редактировать'}</button>
        {/*кнопка отправки delete-запроса*/}
        <button onClick={deleteRowDataBase}>Удалить</button>
      </tr>
    </>
  )
}
export default HomeLine