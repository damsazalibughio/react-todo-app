import React, { useState, useEffect } from 'react';
import { db } from "./server/firebase";
import './App.css';
import { FcTodoList } from "react-icons/fc";
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';

function App() {  
  const appDetails = ['Todo App', 'This Todo App has been created using Functional Components'];
  const [title, desc] = appDetails;

  let [input, setInput] = useState('');
  let [editedInput, setEditedInput] = useState('');
  let [todos, setTodos] = useState([]);
  // let [editStatus, setEditStatus]=useState(false);

  let handleChangeInput =(event) =>{       
      setInput(event.target.value)
     
  }
  let getTodoLists = (event)=>{
    
    event.preventDefault();
      if(input !==''){  

        db.collection('todos').add({  
          id: Math.floor(Math.random()*10000),       
          content: input,
          contentStatus:false,
          editStatus:false

        }) 
      setInput('') 

      }else{
        alert('Please fill the Field')
      }
  } 

  const deleteTodo= (id) =>{ 

    db.collection('todos').doc(id).delete()   
  }

  const editTodo =(id, index) =>{
    console.log(id)
    todos[index].editStatus=true;
     
    // db.collection("todos").doc(id).set({
    //   editStatus: true,
    // },{merge:true});

    // getting content for from database setting the value of editedInput
    var docRef = db.collection("todos").doc(id);
    docRef.get().then((doc) => {
        if (doc.exists) {
            // console.log("Document data:", doc.data().content);           
              setEditedInput(doc.data().content)
             
        } else {
            console.log("No such document!");
        }
    }).catch((error) => {
        console.log("Error getting document:", error);
    }); 

  }

  let handleEditChangeInput =(event) =>{    
    setEditedInput(event.target.value)
   
  }
  const submitEditedData =(event, id, index)=>{
    event.preventDefault()   
   
      db.collection("todos").doc(id).set({
        content:editedInput,
      },{merge:true});
      todos[index].editStatus=false;
      setEditedInput('')
      // setEditStatus(false)
      // console.log(editStatus);
   

  }
  const checkTodo = (event, id)=>{
    console.log(event.target.checked);
    // event.target.value=true
    db.collection("todos").doc(id).set({
      contentStatus: event.target.checked
    },{merge:true});  
   
  }
  const unCheckTodo = (event,id)=>{
    console.log(event.target.checked);
    // event.target.value=false
    db.collection("todos").doc(id).set({
      contentStatus: event.target.checked
    },{merge:true});
  }

useEffect(()=>{

   db.collection('todos').onSnapshot((snapshot)=>{
    // console.log(snapshot.docs.map(doc => doc.data().content));
   setTodos(snapshot.docs.map(doc =>(

    {
      id:doc.id, 
      content:doc.data().content,
      contentStatus:doc.data().contentStatus,
      editStatus:doc.data().editStatus
    }
   
     )))
    
    
    

   }) 
    
},[])


  return (     
  <div className="container">
    <h1 className="display-4 text-center text-info m-3"> <FcTodoList/> {title}</h1>
        <p className="text-info fw-bold text-center">{desc}</p>
    <div className="row">
        <div className="col-md-12">
            <div className="card card-white">
                <div className="card-body">
                  <TodoForm
                    input={input}
                    handleChangeInput={handleChangeInput}
                    getTodoLists={getTodoLists}
                  />
                   
                    {/* <ul className="nav nav-pills todo-nav">
                        <li role="presentation" className="nav-item all-task active"><button onClick={()=>getAllTodo()} className="btn btn-info-outline">All</button></li>
                        <li role="presentation" className="nav-item active-task"><button onClick={()=>getActiveTodos()} className="btn btn-info-outline">Active</button></li>
                        <li role="presentation" className="nav-item completed-task"><a href={'f'} className="nav-link">Completed</a></li>
                    </ul> */}
                    
                   

                   <TodoList
                   editedInput ={editedInput}
                   todos ={todos}
                   deleteTodo ={deleteTodo}
                   editTodo = {editTodo}
                   handleEditChangeInput = {handleEditChangeInput}
                   submitEditedData = {submitEditedData}
                   checkTodo = {checkTodo}
                   unCheckTodo = {unCheckTodo}
                   
                   
                   />

                   
                   
                  
                </div>
            </div>
        </div>
    </div>
  </div>
    
  )
}

export default App;
