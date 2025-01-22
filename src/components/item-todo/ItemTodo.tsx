import React, { ReactNode } from "react"
import { Task } from "../app/App"
import Input from "../ui/input/Input";
import Title from "../ui/title/Title";

type ItemTodoProps = {
  task: Task;
  toggleTask(id: number): void;
}

const ItemTodo: React.FC<ItemTodoProps> = ({
  task,
  toggleTask
}): ReactNode => {
  return (
    <li className="todo-list__item">
      <article className="todo-card">
        <label className="todo-label">
          <Input checked={task.completed} name="checkbox" type="checkbox" className="checkbox todo__checkbox visually-hidden" 
            onChange={() => toggleTask(task.id)}/>
          <span className="todo__pseudo-checkbox"></span>
        </label>
          <Title level={2} className="todo-card__title">
            {task.taskName}
          </Title>
      </article>
    </li>
  )
} 

export default ItemTodo;