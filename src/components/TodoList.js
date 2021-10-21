import { RiSendPlaneFill } from "react-icons/ri";
import { FaThumbsUp } from "react-icons/fa";

function TodoList(props) {
    let editedInput = props.editedInput;
    let todos = props.todos;
    let deleteTodo =props.deleteTodo;
    let editTodo = props.editTodo;
    let handleEditChangeInput = props.handleEditChangeInput;
    let submitEditedData = props.submitEditedData;
    let checkTodo = props.checkTodo;
    let unCheckTodo = props.unCheckTodo;
   
    return (
        <div>            
            <div className="todo-list">
            {todos.map((todoData, index)=> {                   
                
                return(
                <>
                {todoData.editStatus===false?
                <div>
                    {todoData.contentStatus===false?   
                    <div className="todo-item">                         
                        <div className="checker">                            
                            <span className=''>                            
                            <input type="checkbox"  onChange={(event)=>checkTodo(event,todoData.id)} />
                            </span>
                        </div>
                        <span key={todoData.id}> {todoData.content}</span>
                        <button className="float-end remove-todo-item btn text-danger" onClick={()=>deleteTodo(todoData.id)}><i className="fa fa-trash"></i></button>
                        <button className="float-end remove-todo-item btn  text-info" onClick={()=>editTodo(todoData.id, index)}><i className="fa fa-edit"></i></button>

                    </div>

                    :

                    <div className="todo-item todo-done">                         
                        <div className="checker">                            
                            <span className=''>                            
                            <input type="checkbox"   onChange={(event)=>unCheckTodo(event,todoData.id)} />
                            </span>
                        </div>
                        <span key={todoData.id}> {todoData.content}</span>
                        <span className='float-end'><FaThumbsUp color='green' size='20' /></span>
                        
                    </div>
                
                    }
                </div>

                :
                <div>
                    <form onSubmit={(event)=>submitEditedData(event, todoData.id,index)}>
                    <div className="todo-item"> 
                                                
                    <div className='col-md-12 d-flex justify-content-between'> 
                    <div>
                        <input type="text" className='form-control' value={editedInput} onChange={(event)=>handleEditChangeInput(event)} />
                    </div> 
                    <div>
                    <button className="btn remove-todo-item" ><RiSendPlaneFill color='blue' size='25'/></button>
                    
                    </div>                          
                    
                    </div>
                    
                    
                    </div>
                    </form>
                </div>
                }
                </>
                )
                })
            }
            </div>
        </div>
    )
}

export default TodoList
