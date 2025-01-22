import React from 'react';
import { Tasks } from '../app/App';
import ItemTodo from '../item-todo/ItemTodo';

type ListTodoProps = {
	tasks: Tasks;
	setTasks: React.Dispatch<React.SetStateAction<Tasks>>;
};

const ListTodo: React.FC<ListTodoProps> = ({ tasks, setTasks }) => {
	const toggleTask = (id: number) => {
		setTasks((prev) =>
			prev.map((task) =>
				task.id === id ? { ...task, completed: !task.completed } : task
			)
		);
	};

	return (
		<ul className='todos-list'>
			{tasks.map((task) => (
				<ItemTodo key={task.id} task={task} toggleTask={toggleTask} />
			))}
		</ul>
	);
};

export default ListTodo;
