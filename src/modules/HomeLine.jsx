import React from "react";
import { Link } from "react-router-dom";
import '../styles/home-table.css';
import delete_svg from '../images/delete.svg';
import edit_svg from '../images/edit.svg';
import success_svg from '../images/checkbox.svg'
let timeout
function HomeLine(props){

  const [allErrorsSensore, setAllErrorsSensore] = React.useState([{
    "errors": "undefined"}])
  const [catchFetchErrorSensore, setCatchFetchErrorSensore] = React.useState(false)
  const [noteContent, setNoteContent] = React.useState(props.note)
  const [localeContent, setLocaleContent] = React.useState(props.locale)
  const [editStatus, setEditStatus] = React.useState(false)
  React.useEffect(()=>{
    renderAll()
  },[])

  async function renderAll(){
    await getApiData(props.ipBoard,props.portNum,setAllErrorsSensore,setCatchFetchErrorSensore,catchFetchErrorSensore)
    timeout=window.setTimeout(renderAll, 1000)
  }

  async function getApiData(ipBoard,portNum, SetUseEffect, setCatchFetchError,catchFetchError) {
    fetch(`http://${ipBoard}:${portNum}/sensore`)
    .then(res => {
      if(res.ok){
        setCatchFetchError(false)
        return res.json()
      }
      else{throw new Error('Something went wrong')}
    })
    .then(data => {SetUseEffect(data)})
    .catch((error) => {
      setCatchFetchError(true)
    });
  }
  async function editDataBase(){
    const requestOptions = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({"locale": localeContent,
                            "note": noteContent,
                            'boardId':props.idBoard})
    };
    await fetch(`http://localhost:8001/boards/${props.idBoard}`, requestOptions)
    props.dataBaseApiHandler()
  }
  async function deleteRowDataBase(){
    const requestOptions = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({'boardId':props.idBoard})
    };
    await fetch(`http://localhost:8001/boards/${props.idBoard}`, requestOptions)
    props.dataBaseApiHandler()
  }
  function editManage(){
    setEditStatus(!editStatus)
    if(editStatus === true){
      editDataBase()
    }
  }
  function timeOutHandler(){
    window.opener.clearTimeout(timeout)
  }
  return(
    <>
      <tr className={`home-table__tr ${catchFetchErrorSensore ?
          'home-table__tr_critical-error': allErrorsSensore[allErrorsSensore.length-1].errors > 0 ?
          'home-table__tr_error':''}`}>
        <td className="home-table__td">
          <Link to={`dashboard/${props.idBoard}`} onClick={timeOutHandler}>
            {props.ipBoard} <br/> (Нажмите сюда, чтобы увидеть детали)
          </Link>
        </td>
        <td className="home-table__td">
          {props.portNum}
        </td>
        <td className="home-table__td">
        {catchFetchErrorSensore ? 'Нет ответа' :
            allErrorsSensore[allErrorsSensore.length-1].errors > 0 ? 'Ошибка' : 'OК'}
        </td>
        <td className="home-table__td">
          {editStatus ?
            <textarea rows="5" cols="33"
              value={localeContent}
              placeholder="Местонахождение платы"
              onChange={e => setLocaleContent(e.target.value)}
              className="home-table__textarea">
            </textarea> :
            <p style={{background:'none'}}>{props.locale}</p>
          }
        </td>
        <td className="home-table__td">
          {editStatus ?
            <textarea rows="5" cols="33"
              value={noteContent}
              placeholder="Заметка о плате"
              onChange={e => setNoteContent(e.target.value)}
              className="home-table__textarea">
            </textarea> :
            <p style={{background:'none'}}>{props.note}</p>
          }
        </td>
        <td className="home-table__td home-table__td_flex">
          {editStatus? <img onClick={editManage} src={success_svg} alt="Опубликовать" className="home-table__svg"/>:
          <img onClick={editManage} src={edit_svg} alt="Редактировать" className="home-table__svg"/>}
          <img onClick={deleteRowDataBase} src={delete_svg} alt="Удалить" className="home-table__svg"/>
        </td>
      </tr>
    </>
  )
}
export default HomeLine