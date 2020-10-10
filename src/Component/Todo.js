import React from 'react';
import InputField from './InputField';
import TodoList from './TodoList';

const Todo = () => {
    return (
        <div className="todo">
            <h1>To-do List</h1>
            <InputField />
            {/* <TodoList /> */}
        </div>
    )
}

export default Todo
