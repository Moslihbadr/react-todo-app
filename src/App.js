import TodoList from './components/TodoList'
import TodoForm from './components/TodoForm'
import { useState, useEffect } from 'react';

const App = () => {

  // Tasks state
  const [ tasksList, setTasksList ] = useState(() => {
    const tasks = localStorage.getItem('tasks');
    if (tasks === null) return [];
    try {
      return JSON.parse(tasks);
    } catch (error) {
      console.error('Error parsing tasks from localStorage:', error);
      return [];
    }
  });

  // warning state
  const [ showWarning, setShowWarning ] = useState(() => {
    const warning = localStorage.getItem('showWarning');
    if (warning === null) return true;
    return JSON.parse(warning);
  });

  // darkMode state
  const [ darkMode, setDarkMode ] = useState(() => {
    const darkMode = localStorage.getItem('darkMode');
    if (darkMode === null) return true;
    return JSON.parse(darkMode);
  })


  // saving tasks state in localStorage
  useEffect(() => {
      localStorage.setItem('tasks', JSON.stringify(tasksList))
  }, [tasksList])

  // saving showWarning state in localStorage
  useEffect(() => {
    localStorage.setItem('showWarning', JSON.stringify(showWarning));
  }, [showWarning]);

    // saving showWarning state in localStorage
    useEffect(() => {
      localStorage.setItem('darkMode', JSON.stringify(darkMode));
    }, [darkMode]);


  // function to add task
  const addTask = (text) => {
    setTasksList(prevTaskList => ([...prevTaskList, {id: crypto.randomUUID(), text: text, completed: false}]))
  }

  // function for handling task click
  const handleTaskClick = (id) => {
    setTasksList(prevTasks =>
      prevTasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  }

  // function for handling task delete
  const handleTaskDelete = (id) => {
    setTasksList(prevTasks =>
      prevTasks.filter(task => task.id !== id)
    );
  }

  // function for dark mode toggle
  const darkModeToggle = () => {
    setDarkMode(prevState => !prevState)
  }


  return (
    <div className='wrapper' style={{backgroundColor: darkMode  ? '#212529' : '#FFFFFF'}}>
      <div className='container p-2 text-center' style={{color: darkMode  ? '#FFFFFF' : '#212529'}}>
        { showWarning && 
        <div className="alert alert-warning alert-dismissible fade show"> 
          <strong>Heads up:</strong> Double-click on the task to mark it as completed. 
          <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={() => setShowWarning(false)}></button>
        </div> }
        <nav className='d-flex justify-content-between align-items-baseline mb-3'>
          <h1 className='m-3 mb-5'>Todo App</h1>
          <div className="toggleMode d-flex">
            <p className='mx-2'>Light</p>
            <div className='toggleBar' style={{color: darkMode  ? '#FFF' : '#212529'}} onClick={darkModeToggle}>
              { darkMode ? <svg xmlns="http://www.w3.org/2000/svg" height="1.7em" viewBox="0 0 576 512">
                <path d="M192 64C86 64 0 150 0 256S86 448 192 448H384c106 0 192-86 192-192s-86-192-192-192H192zm192 96a96 96 0 1 1 0 192 96 96 0 1 1 0-192z"/>
              </svg> : <svg xmlns="http://www.w3.org/2000/svg" height="1.7em" viewBox="0 0 576 512">
                <path d="M384 128c70.7 0 128 57.3 128 128s-57.3 128-128 128H192c-70.7 0-128-57.3-128-128s57.3-128 128-128H384zM576 256c0-106-86-192-192-192H192C86 64 0 150 0 256S86 448 192 448H384c106 0 192-86 192-192zM192 352a96 96 0 1 0 0-192 96 96 0 1 0 0 192z"/>
              </svg> }
            </div>
            <p className='mx-2'>Dark</p>
          </div>
        </nav>
        <TodoForm addTask={addTask} />
        {tasksList.length === 0 && <h1>No Tasks</h1>}
        <TodoList tasks={tasksList} darkMode={darkMode} onTaskClick={handleTaskClick} onTaskDelete={handleTaskDelete} />
      </div>
    </div>
  );
}

export default App;
