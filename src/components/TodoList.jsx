import TodoItem from "./TodoItem";

const TodoList = () => {
  return (
    <div className="card" style={{width: '18rem'}}>
      <ul className="list-group list-group-flush">
        <TodoItem />
        <TodoItem />
        <TodoItem />
        <TodoItem />
      </ul>
    </div>
  )
}

export default TodoList
