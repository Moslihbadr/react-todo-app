import TodoItem from "./TodoItem";

const TodoList = ({ tasks, onTaskClick }) => {
  return (
    <div className="card" style={{width: '25rem'}}>
      <ul className="list-group list-group-flush">
        {tasks.map(task => <TodoItem key={task.id} task={task} onTaskClick={onTaskClick} />)}
      </ul>
    </div>
  )
}

export default TodoList
