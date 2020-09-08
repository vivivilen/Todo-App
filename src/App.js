import React, { useState } from 'react';
import './App.css';
import { InputField } from './Component/InputField';
import { TodoList } from './Component/TodoList';
import axios from 'axios';

function App() {
  const [todo, setTodo] = useState([]);
  const [data, setData] = useState([]);

  const getRequest = () => {
        axios.get('http://localhost:8000/todos')
            .catch(err => console.log('error: ', err))
            .then(response => { setData(response.data.data) })
    }

  return (
    // console.log('data: ', data),
    <div className="App">
      <h1>To-do List</h1>
      <InputField todo={todo} setTodo={setTodo} data={data} setData={setData}/>
      <TodoList data={data} getRequest={getRequest}/>
    </div>
  );
}

export default App;