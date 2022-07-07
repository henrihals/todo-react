import React from "react";
import { useState, useRef, useEffect } from 'react';
import './App.scss';
import Todolist from "./Todolist";
import { v4 as uuidv4 } from 'uuid';

const LOCAL_STORAGE_KEY = 'todoApp.todos'

function App() {
  const [todos, setTodos] = useState([])
  const todoNameRef = useRef()

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if (storedTodos) setTodos(storedTodos)
  }, [])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  function toggleTodo(id) {
    const newTodos = [...todos]
    const todo = newTodos.find(todo => todo.id === id)
    todo.complete = !todo.complete
    setTodos(newTodos) 
  }

  function handleAddTodo(e) {
    const name = todoNameRef.current.value
      if (name === '' ) return
        setTodos(prevTodos => {
          return [...prevTodos, { id: uuidv4(), name: name, complete: false }]
        })
        todoNameRef.current.value = null
  }

  function handleClearTodos() {
    const newTodos = todos.filter(todo => !todo.complete)
    setTodos(newTodos)
  }

  return (
    <>
      <h1>Ma Todo List</h1>
      <div className="writeBox">
        <input ref={todoNameRef}
          type="text" 
          id="name" 
          className="titre" 
          required
        />
      </div>
      <div className="buttonBox">
        <button onClick={handleAddTodo}>Ajouter à ma liste</button>
        <button onClick={handleClearTodos}>Effacer les todos faits</button>
      </div>
      <div className="todoNumberBox">
        {todos.filter(todo => !todo.complete).length} todo à faire
      </div>
      <div className="todoBox">
        <Todolist todos={todos} toggleTodo={toggleTodo} />
      </div>
    </>
  )
}

export default App;