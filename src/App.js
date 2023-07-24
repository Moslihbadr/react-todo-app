import TodoList from './components/TodoList'
import TodoForm from './components/TodoForm'
import { useState } from 'react';

const App = () => {

  const [ tasksList, settasksList ] = useState([{
    id: crypto.randomUUID(),
    text: "test",
    completed : false
  },
  {
    id: crypto.randomUUID(),
    text: "test 2",
    completed : false
  }
  ])

  const addItem = () => {
    console.log(tasksList)
  }

  return (
    <div className='container p-2 text-center'>
      <h1 className='m-3 mb-5'>Todo App</h1>
      <TodoForm addItem={addItem} />
      <TodoList tasks={tasksList} />
    </div>
  );
}

export default App;
