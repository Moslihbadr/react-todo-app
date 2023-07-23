const TodoForm = () => {
  return (
    <form>
        <div className="input-group mb-3">
          <input type="text" className="form-control task-todo" placeholder="Task Todo" aria-label="Recipient's username" aria-describedby="button-addon2" />
          <button className="btn btn-outline-primary" type="submit" id="button-addon2">Add Task</button>
        </div>
    </form>
  )
}

export default TodoForm
