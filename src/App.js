import TodoList from './components/TodoList'
import TodoForm from './components/TodoForm'
import { useState, useEffect } from 'react';

const App = () => {

  const [tasksList, setTasksList] = useState(() => {
    const tasks = localStorage.getItem('tasks');
    if (tasks === null) return [];
    try {
      return JSON.parse(tasks);
    } catch (error) {
      console.error('Error parsing tasks from localStorage:', error);
      return [];
    }
  });

  const [showWarning, setShowWarning] = useState(() => {
    const warning = localStorage.getItem('showWarning');
    if (warning === null) return true;
    return JSON.parse(warning);
  });

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

  const handleTaskDelete = (id) => {
    setTasksList(prevTasks =>
      prevTasks.filter(task => task.id !== id)
    );
  }

  useEffect(() => {
      localStorage.setItem('tasks', JSON.stringify(tasksList))
  }, [tasksList])

  useEffect(() => {
    localStorage.setItem('showWarning', JSON.stringify(showWarning));
  }, [showWarning]);


  return (
    <div className='container p-2 text-center'>
      {showWarning && 
      <div className="alert alert-warning alert-dismissible fade show"> 
        <strong>Heads up:</strong> Double-click on the task to mark it as completed. 
        <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={() => setShowWarning(false)}></button>
      </div>}
      <h1 className='m-3 mb-5'>Todo App</h1>
      <TodoForm addTask={addTask} />
      {tasksList.length === 0 && <h1>No Tasks</h1>}
      <TodoList tasks={tasksList} onTaskClick={handleTaskClick} onTaskDelete={handleTaskDelete} />
    </div>
  );
}

export default App;
