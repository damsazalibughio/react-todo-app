import React from 'react'

function TodoForm(props) {
    let getTodoLists = props.getTodoLists;
    let input = props.input;
    let handleChangeInput = props.handleChangeInput;
    return (
        <div>
            <form onSubmit={getTodoLists}>
                  <input type="text" className="form-control add-task" placeholder="New Task..." value={input} onChange ={handleChangeInput}/>
             </form>
        </div>
    )
}

export default TodoForm
