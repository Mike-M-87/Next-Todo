import React, { useCallback, useState, useEffect } from "react";


const App = () => {
  // hooks
  const [newTodo, setNewTodo] = useState('')
  const [todos, setTodos] = useState([])

  const onNewTodoChange = useCallback((event) => {
    setNewTodo(event.target.value)
  }, [])

  const formSubmitted = useCallback((event) => {
    event.preventDefault()
    if (!newTodo.trim()) return;
    setTodos([
      {
        id: todos.length ? todos[todos.length -1].id+1 : 1,
        content: newTodo,
        done: false,
      },
      ...todos,
    ])
    setNewTodo('')
  }, [newTodo, todos])


  useEffect(() => {
    console.log('todos', todos)
    return () => {
      console.log('Component unmounted')
    }
  }, [todos])

  const addTodo = useCallback((todo, index) => (event) => {
    const newTodos = [...todos]
    newTodos.splice(index, 1, {
      ...todo,
      done: !todo.done
    });
    setTodos(newTodos);
  }, [todos]);

  const removeTodo = useCallback((todo) => (event) => {
    setTodos(todos.filter(otherTodo => otherTodo != todo))
  },[todos])

  const markAllDone = useCallback(() => {
    const updatedTodos = todos.map(todo => {
      return {
        ...todo,
        done: true,
      }
    })    
    setTodos(updatedTodos)
  },[todos])

  return (
    <div>
      <form onSubmit={formSubmitted}>
        <label htmlFor="newTodo">Enter a Todo: </label>
        <input
          id="newTodo"
          name="newTodo"
          value={newTodo}
          onChange={onNewTodoChange}
        />
        <button>Add Todo</button>
      </form>
      <button onClick={markAllDone}>Mark all Done</button>
      <ul>
        {todos.map((todo, index) => (
          <li key={todo.id}>
            <input
              checked={todo.done}
              type="checkbox"
              onChange={addTodo(todo, index)}
            />
            <span  className={todo.done ? 'done' : ''}>{todo.content}</span>
            <button onClick={removeTodo(todo)}>Remove Todo</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App;