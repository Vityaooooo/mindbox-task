import { render, screen, fireEvent } from '@testing-library/react';
import ItemTodo from './ItemTodo';
import { Task } from '../app/App';

describe('ItemTodo Component', () => {
	const mockToggleTask = jest.fn();

	const mockTask: Task = {
		id: 1,
		taskName: 'Test Task',
		completed: false,
	};

	const completedTask: Task = {
		id: 2,
		taskName: 'Completed Task',
		completed: true,
	};

	afterEach(() => {
		jest.clearAllMocks();
	});

	test('checkbox is unchecked if task is not completed', () => {
		render(<ItemTodo task={mockTask} toggleTask={mockToggleTask} />);

		const checkbox = screen.getByRole('checkbox');
		expect(checkbox).not.toBeChecked();
	});

	test('checkbox is checked if task is completed', () => {
		render(<ItemTodo task={completedTask} toggleTask={mockToggleTask} />);

		const checkbox = screen.getByRole('checkbox');
		expect(checkbox).toBeChecked();
	});

	test('toggleTask is called with correct id on checkbox click', () => {
		render(<ItemTodo task={mockTask} toggleTask={mockToggleTask} />);

		const checkbox = screen.getByRole('checkbox');
		fireEvent.click(checkbox);

		expect(mockToggleTask).toHaveBeenCalledTimes(1);
		expect(mockToggleTask).toHaveBeenCalledWith(mockTask.id);
	});

	test('toggleTask works correctly when task is toggled twice', () => {
		render(<ItemTodo task={mockTask} toggleTask={mockToggleTask} />);

		const checkbox = screen.getByRole('checkbox');
		fireEvent.click(checkbox);
		fireEvent.click(checkbox);

		expect(mockToggleTask).toHaveBeenCalledTimes(2);
		expect(mockToggleTask).toHaveBeenCalledWith(mockTask.id);
	});
});
