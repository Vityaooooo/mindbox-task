import { useState } from "react";
import Title from "../ui/title/Title";
import FormTodo from '../form-todo/FormTodo';
import ButtonsPanel from "../buttons-panel/ButtonsPanel";
import ListTodo from "../list-todo/ListTodo";

export type Task = {
	id: number;
	taskName: string;
	completed: boolean;
}

export type Tasks = Array<Task>;

const App = () => {
	const [tasks, setTasks] = useState<Tasks>([]);
	const [filter, setFilter] = useState<'all' | 'completed' | 'active'>('all');

	const handleClearComplitedTasks = () => {
		setTasks((prevState) => prevState.filter((task) => !task.completed));
	}

	const filteredTasks = tasks.filter((task) => {
    if (filter === 'completed') return task.completed;
    if (filter === 'active') return !task.completed;
    return true;
  });
	
	return (
		<>
			<Title className="todo-title">
				ToDo
			</Title>
			<FormTodo setTasks={setTasks} />
			<ButtonsPanel remainingTasks={filteredTasks.length} filter={filter} handleClearComplitedTasks={handleClearComplitedTasks} setFilter={setFilter}/>
			<ListTodo tasks={filteredTasks} setTasks={setTasks} />
		</>
	);
};

export default App;
