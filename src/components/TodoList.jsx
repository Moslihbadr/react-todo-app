import TodoItem from "./TodoItem";

const TodoList = ({ tasks, darkMode, onTaskClick, onTaskDelete }) => {
  return (
    <div className="card">
      <ul className="list-group list-group-flush">
        {tasks.map(task => <TodoItem key={task.id} task={task}  darkMode={darkMode} onTaskClick={onTaskClick} onTaskDelete={onTaskDelete}/>)}
      </ul>
    </div>
  )
}

export default TodoList
