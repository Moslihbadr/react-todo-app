import TodoList from './components/TodoList'
import TodoForm from './components/TodoForm'
import { useState } from 'react';

const App = () => {

  const [ tasksList, setTasksList ] = useState([])

  const addTask = (text) => {
    setTasksList(prevTaskList => ([...prevTaskList, {id: crypto.randomUUID(), text: text, completed: false}]))
  }

  const handleTaskClick = (id) => {
    setTasksList(prevTasks =>
      prevTasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  }

  return (
    <div className='container p-2 text-center'>
      <h1 className='m-3 mb-5'>Todo App</h1>
      <TodoForm addTask={addTask} />
      <TodoList tasks={tasksList} onTaskClick={handleTaskClick} />
    </div>
  );
}

export default App;
