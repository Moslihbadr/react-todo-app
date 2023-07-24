import TodoItem from "./TodoItem";

const TodoList = ({ tasks }) => {
  return (
    <div className="card" style={{width: '25rem'}}>
      <ul className="list-group list-group-flush">
        {tasks.map(task => <TodoItem key={task.id} task={task} />)}
      </ul>
    </div>
  )
}

export default TodoList
