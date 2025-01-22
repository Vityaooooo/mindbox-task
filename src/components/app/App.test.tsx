import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

describe('App Component', () => {
	test('should render components correctly', () => {
		render(<App />);

		expect(screen.getByText('ToDo')).toBeInTheDocument();
		expect(screen.getByPlaceholderText('What need to do')).toBeInTheDocument();
		expect(screen.getByRole('button', { name: /add/i })).toBeInTheDocument();
		expect(screen.getByTestId('clear')).toBeInTheDocument();
	});

	test('should add a task when the form is submitted', () => {
		render(<App />);

		const input = screen.getByPlaceholderText('What need to do');
		const button = screen.getByRole('button', { name: /add/i });

		fireEvent.change(input, { target: { value: 'New Task' } });
		fireEvent.click(button);

		expect(screen.getByText('New Task')).toBeInTheDocument();
	});

	test('should filter tasks by active and completed status', () => {
		render(<App />);

		const input = screen.getByPlaceholderText('What need to do');
		const addButton = screen.getByRole('button', { name: /add/i });

		fireEvent.change(input, { target: { value: 'Task 1' } });
		fireEvent.click(addButton);

		fireEvent.change(input, { target: { value: 'Task 2' } });
		fireEvent.click(addButton);

		fireEvent.click(screen.getAllByRole('checkbox')[0]);

		const activeFilterButton = screen.getByTestId('active');
		fireEvent.click(activeFilterButton);

		expect(screen.getByText('Task 2')).toBeInTheDocument();
		expect(screen.queryByText('Task 1')).toBeNull();

		const completedFilterButton = screen.getByTestId('completed');
		fireEvent.click(completedFilterButton);

		expect(screen.getByText('Task 1')).toBeInTheDocument();
		expect(screen.queryByText('Task 2')).toBeNull();

		const allFilterButton = screen.getByTestId('all');
		fireEvent.click(allFilterButton);

		expect(screen.getByText('Task 1')).toBeInTheDocument();
		expect(screen.getByText('Task 2')).toBeInTheDocument();
	});

	test('should clear completed tasks', () => {
		render(<App />);

		const input = screen.getByPlaceholderText('What need to do');
		const addButton = screen.getByRole('button', { name: /add/i });

		fireEvent.change(input, { target: { value: 'Task 1' } });
		fireEvent.click(addButton);

		fireEvent.change(input, { target: { value: 'Task 2' } });
		fireEvent.click(addButton);

		fireEvent.click(screen.getAllByRole('checkbox')[0]);

		expect(screen.getByText('Task 1')).toBeInTheDocument();
		expect(screen.getByText('Task 2')).toBeInTheDocument();

		const clearButton = screen.getByTestId('clear');
		fireEvent.click(clearButton);

		expect(screen.queryByText('Task 1')).toBeNull();
		expect(screen.getByText('Task 2')).toBeInTheDocument();
	});
});
