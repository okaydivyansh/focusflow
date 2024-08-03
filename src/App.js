import { useEffect,useState } from "react";
import ToDo from "./components/ToDo";
import { addToDo,deleteToDo,getAllToDo,updateToDo } from "./utils/HandleApi";

function App() {

  //all the following four are states
  const [toDo,setToDo]=useState([])
  const [text,setText]=useState("")
  const [isUpdating,setIsUpdating]=useState(false) // this will be used in changing the button's name from add to update

  const [toDoId,setToDoId]=useState("")

  
  useEffect(()=>{
    getAllToDo(setToDo)
  },[])

  const updateMode=(_id,text)=>{
      setIsUpdating(true)
      setText(text)
      setToDoId(_id)
  }
  return (
    <div className="App">
      <div className="container">
        <h1>Focus Flow</h1>

        <div className="top">


          <input type="text" placeholder="Please task add kar do bhai mere...."
          value={text} onChange={(e)=>setText(e.target.value )}/>


          <div className="add" 
          onClick={isUpdating ?
          ()=>updateToDo(toDoId,text,setToDo,setText,setIsUpdating)
          : ()=>addToDo(text,setText,setToDo)}>
            {isUpdating?"Update":"Add"}
          </div>

        </div>
        <div className="list">
            {toDo.map((item)=> 
            <ToDo key={item._id} 
            text={item.text}
            updateMode={()=>updateMode(item._id,item.text)}
            deleteToDo={()=>deleteToDo(item._id,setToDo)}/>)}
             {/* <ToDo text="Hi" />
            <ToDo text="Hi" />
            <ToDo text="Hi" />  */}
        </div>
      </div>
      <div className="divyansh">Created by <a href="https://github.com/okaydivyansh"><b>Divyansh</b></a></div>
    </div>
  );
}

export default App;
