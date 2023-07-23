import TodoList from './components/TodoList'
import TodoForm from './components/TodoForm'

function App() {
  return (
    <div className='container p-2 text-center'>
      <h1 className='m-3 mb-5'>Todo App</h1>
      <TodoForm />
      <TodoList />
    </div>
  );
}

export default App;
