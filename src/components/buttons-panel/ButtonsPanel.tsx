import React, { ReactNode } from 'react';
import Button from '../ui/button/Button';

type ButtonsPanelProps = {
	handleClearComplitedTasks(): void;
	filter: string;
	remainingTasks: number;
	setFilter: React.Dispatch<
		React.SetStateAction<'all' | 'active' | 'completed'>
	>;
};

const ButtonsPanel: React.FC<ButtonsPanelProps> = ({
	handleClearComplitedTasks,
	setFilter,
	filter,
	remainingTasks,
}): ReactNode => {
	return (
		<div className='buttons-container'>
			<p className='todo-container__info'>{remainingTasks} left</p>
			<Button
				testid={'all'}
				className={`button buttons-container__button ${
					filter === 'all' ? 'buttons-container__button_active' : ''
				}`}
				id='all'
				type='button'
				onClick={() => setFilter('all')}>
				All
			</Button>
			<Button
				className={`button buttons-container__button ${
					filter === 'active' ? 'buttons-container__button_active' : ''
				}`}
				id='active'
				type='button'
				testid={'active'}
				onClick={() => setFilter('active')}>
				Active
			</Button>
			<Button
				className={`button buttons-container__button ${
					filter === 'completed' ? 'buttons-container__button_active' : ''
				}`}
				id='completed'
				type='button'
				testid={'completed'}
				onClick={() => setFilter('completed')}>
				Completed
			</Button>
			<Button
				id='clear'
				testid={'clear'}
				type='button'
				className='buttons-container__button button'
				onClick={handleClearComplitedTasks}>
				Clear completed
			</Button>
		</div>
	);
};

export default ButtonsPanel;
