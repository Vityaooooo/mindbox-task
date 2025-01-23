import { render, screen, fireEvent } from '@testing-library/react';
import FormTodo from './FormTodo';
import '@testing-library/jest-dom';

const mockSetTasks = jest.fn();

describe('FormTodo Component', () => {
	beforeEach(() => {
		mockSetTasks.mockClear();
		jest.clearAllMocks();
	});

	beforeAll(() => {
		jest.spyOn(global.Date, 'now').mockImplementation(() => 1234567890);
	});

	afterAll(() => {
		jest.restoreAllMocks();
	});

	test('renders the component correctly', () => {
		render(<FormTodo setTasks={mockSetTasks} />);

		expect(screen.getByPlaceholderText(/What need to do/i)).toBeInTheDocument();
		expect(screen.getByRole('button', { name: /add/i })).toBeInTheDocument();
	});

	test('input updates when its value when typed', () => {
		render(<FormTodo setTasks={mockSetTasks} />);

		const input = screen.getByPlaceholderText(/What need to do/i);
		fireEvent.change(input, { target: { value: 'New Task' } });

		expect(input).toHaveValue('New Task');
	});

	test('button is disabled when input is empty and enabled when input has text', () => {
		render(<FormTodo setTasks={mockSetTasks} />);

		const button = screen.getByRole('button', { name: /add/i });
		expect(button).toBeDisabled();

		const input = screen.getByPlaceholderText(/What need to do/i);
		fireEvent.change(input, { target: { value: 'Task' } });

		expect(button).not.toBeDisabled();
	});

	test('submitting the form adds a task and clears the input', () => {
		render(<FormTodo setTasks={mockSetTasks} />);
		const input = screen.getByPlaceholderText('What need to do');
		const button = screen.getByText('Add');

		fireEvent.change(input, { target: { value: 'Task 1' } });
		fireEvent.click(button);

		expect(mockSetTasks).toHaveBeenCalledTimes(1);

		const updateFunction = mockSetTasks.mock.calls[0][0];
		const result = updateFunction([]);
		expect(result).toEqual([
			{
				id: 1234567890,
				taskName: 'Task 1',
				completed: false,
			},
		]);

		expect(input).toHaveValue('');
	});

	test('pressing Enter key adds a task and clears the input', () => {
		const mockSetTasks = jest.fn();

		const { getByPlaceholderText } = render(
			<FormTodo setTasks={mockSetTasks} />
		);
		const input = getByPlaceholderText('What need to do');

		fireEvent.change(input, { target: { value: 'Task 2' } });
		fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

		expect(mockSetTasks).toHaveBeenCalledTimes(1);

		const updateFunction = mockSetTasks.mock.calls[0][0];
		const result = updateFunction([]);

		expect(result).toEqual([
			{
				id: 1234567890,
				taskName: 'Task 2',
				completed: false,
			},
		]);

		expect(input).toHaveValue('');
	});
});
