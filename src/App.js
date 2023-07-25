import TodoList from './components/TodoList'
import TodoForm from './components/TodoForm'
import NavBar from './components/NavBar';
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
        <NavBar darkMode={darkMode} darkModeToggle={darkModeToggle} />
        <TodoForm addTask={addTask} />
        {tasksList.length === 0 && <h1>No Tasks</h1>}
        <TodoList tasks={tasksList} darkMode={darkMode} onTaskClick={handleTaskClick} onTaskDelete={handleTaskDelete} />
      </div>
    </div>
  );
}

export default App;
