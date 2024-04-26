// src/components/TodoList.tsx
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
//@ts-ignore
import { RootState, AppDispatch } from '../store';
//@ts-ignore
import { addTodo, toggleTodo, deleteTodo } from '../store/todoSlice';

const TodoList: React.FC = () => {
  const todos = useSelector((state: RootState) => state.todos.todos);
  const dispatch = useDispatch<AppDispatch>();
  const [newTodo, setNewTodo] = useState('');

  const handleAddTodo = () => {
    if (newTodo.trim()) {
      dispatch(addTodo(newTodo.trim()));
      setNewTodo('');
    }
  };

  return (
    <div>
      <h2>TODO List</h2>
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
      />
      <button onClick={handleAddTodo}>Add TODO</button>
      <ul>
        {todos.map((todo: any) => (
          <li key={todo.id}>
            <span
              style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
              onClick={() => dispatch(toggleTodo(todo.id))}
            >
              {todo.text}
            </span>
            <button onClick={() => dispatch(deleteTodo(todo.id))}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;