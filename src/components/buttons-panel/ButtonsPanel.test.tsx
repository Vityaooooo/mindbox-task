import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ButtonsPanel from './ButtonsPanel';

const mockHandleClearCompletedTasks = jest.fn();
const mockSetFilter = jest.fn();

describe('ButtonsPanel Component', () => {
	const setup = (
		filter: 'all' | 'active' | 'completed',
		remainingTasks = 2
	) => {
		render(
			<ButtonsPanel
				handleClearComplitedTasks={mockHandleClearCompletedTasks}
				setFilter={mockSetFilter}
				filter={filter}
				remainingTasks={remainingTasks}
			/>
		);
	};

	afterEach(() => {
		jest.clearAllMocks();
	});

	test('renders the correct number of remaining tasks', () => {
		setup('all', 3);
		const remainingTasksText = screen.getByText(/3 left/i);
		expect(remainingTasksText).toBeInTheDocument();
	});

	test('renders all buttons', () => {
		setup('all');
		expect(screen.getByTestId('all')).toBeInTheDocument();
		expect(screen.getByTestId('active')).toBeInTheDocument();
		expect(screen.getByTestId('completed')).toBeInTheDocument();
		expect(screen.getByTestId('clear')).toBeInTheDocument();
	});

	test('sets the active class correctly based on the filter', () => {
		setup('active');
		const activeButton = screen.getByTestId('active');
		expect(activeButton).toHaveClass('buttons-container__button_active');

		const allButton = screen.getByTestId('all');
		const completedButton = screen.getByTestId('completed');
		expect(completedButton).not.toHaveClass('buttons-container__button_active');
		expect(allButton).not.toHaveClass('buttons-container__button_active');
	});

	test('calls setFilter with "all" when the All button is clicked', () => {
		setup('all');
		const allButton = screen.getByTestId('all');
		fireEvent.click(allButton);
		expect(mockSetFilter).toHaveBeenCalledWith('all');
	});

	test('calls setFilter with "active" when the Active button is clicked', () => {
		setup('all');
		const activeButton = screen.getByTestId('active');
		fireEvent.click(activeButton);
		expect(mockSetFilter).toHaveBeenCalledWith('active');
	});

	test('calls setFilter with "completed" when the Completed button is clicked', () => {
		setup('all');
		const completedButton = screen.getByTestId('completed');
		fireEvent.click(completedButton);
		expect(mockSetFilter).toHaveBeenCalledWith('completed');
	});

	test('calls handleClearComplitedTasks when the Clear completed button is clicked', () => {
		setup('all');
		const clearButton = screen.getByTestId('clear');
		fireEvent.click(clearButton);
		expect(mockHandleClearCompletedTasks).toHaveBeenCalledTimes(1);
	});
});
