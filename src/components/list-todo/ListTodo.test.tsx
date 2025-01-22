import { render, screen } from '@testing-library/react';
import ListTodo from './ListTodo';
import { Tasks } from '../app/App';

describe('ListTodo Component', () => {
	let tasks: Tasks;
	let setTasks: jest.Mock;

	beforeEach(() => {
		tasks = [
			{ id: 1, taskName: 'Task 1', completed: false },
			{ id: 2, taskName: 'Task 2', completed: true },
		];
		setTasks = jest.fn();
	});

	test('should render list of tasks', () => {
		render(<ListTodo tasks={tasks} setTasks={setTasks} />);

		expect(screen.getByText('Task 1')).toBeInTheDocument();
		expect(screen.getByText('Task 2')).toBeInTheDocument();
		expect(screen.getAllByRole('checkbox')).toHaveLength(tasks.length);
	});
});
