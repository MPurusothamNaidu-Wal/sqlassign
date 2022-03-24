import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from 'react';

const TodoApp = () => {
  let [todos, setTodos] = useState([{ item: 'cricket', status: 'completed' }]);
  useEffect(() => {
    getTodos();
  }, []);
  const getTodos = () => {
    axios
      .get('/todosql')
      .then((res) => {
        setTodos(res.data.results);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const createTable = () => {
    axios
      .get('/todosql/createtable')
      .then((res) => alert('Table added'))
      .catch((e) => console.log(e));
  };
  const addTodo = (e) => {
    e.preventDefault();
    let todoObj = {
      item: e.target.item.value,
      status: e.target.status.value,
    };
    axios
      .post('/todosql', todoObj)
      .then((res) => getTodos())
      .catch((e) => console.log(e));
  };
  const deleteTodo = (item) => {
    axios
      .delete('/todosql/' + item)
      .then((res) => console.log(res.data))
      .catch((e) => console.log(e));
    getTodos();
  };
  const deleteAllTodos = () => {
    axios
      .get('todosql/deleteall')
      .then((res) => getTodos())
      .catch((e) => console.log(e));
  };
  return (
    <div>
      <form className='todo' onSubmit={addTodo}>
        <h3>
          <label>Todo</label>
        </h3>
        <input type='text' name='item' placeholder='Enter TODO' />
        <h3 className='displayinline'>
          <label>Status</label>
        </h3>
        <select className='form-select' name='status'>
          <option value='completed'>completed</option>
          <option value='incomplete'>incomplete</option>
        </select>
        <br />
        <div className='text-center'>
          <button className='btn btn-secondary'>Add todo</button>
        </div>
      </form>
      <div>
        <button className='btn btn-secondary' onClick={createTable}>
          Create Todo Table
        </button>
        <button className='btn btn-primary' onClick={deleteAllTodos}>
          Delete all todos
        </button>
      </div>
      {todos.map((val, index) => {
        return (
          <div>
            <h3>{val.item}</h3>
            <p>{val.status}</p>
            <button
              className='btn btn-warning'
              onClick={() => {
                deleteTodo(val.item);
              }}
            >
              delete this todo
            </button>
          </div>
        );
      })}
    </div>
  );
};
export default TodoApp;
