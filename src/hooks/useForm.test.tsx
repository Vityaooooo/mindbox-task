import { render, fireEvent } from '@testing-library/react';
import { FC } from 'react';
import useForm from './useForm';

describe('useForm Hook', () => {
	const TestComponent: FC<{ initialValues: { [key: string]: string } }> = ({
		initialValues,
	}) => {
		const { values, handleChange } = useForm(initialValues);

		return (
			<div>
				<input
					name='name'
					value={values.name || ''}
					onChange={handleChange}
					data-testid='name-input'
				/>
				<input
					name='email'
					value={values.email || ''}
					onChange={handleChange}
					data-testid='email-input'
				/>
				<div data-testid='values'>{JSON.stringify(values)}</div>
			</div>
		);
	};

	test('should initialize form with default values', () => {
		const { getByTestId } = render(
			<TestComponent
				initialValues={{ name: 'John', email: 'john@example.com' }}
			/>
		);

		expect(getByTestId('name-input')).toHaveValue('John');
		expect(getByTestId('email-input')).toHaveValue('john@example.com');
		expect(getByTestId('values')).toHaveTextContent(
			JSON.stringify({ name: 'John', email: 'john@example.com' })
		);
	});

	test('should update values on input change', () => {
		const { getByTestId } = render(
			<TestComponent initialValues={{ name: '', email: '' }} />
		);

		const nameInput = getByTestId('name-input');
		const emailInput = getByTestId('email-input');

		fireEvent.change(nameInput, { target: { name: 'name', value: 'Jane' } });
		fireEvent.change(emailInput, {
			target: { name: 'email', value: 'jane@example.com' },
		});

		expect(nameInput).toHaveValue('Jane');
		expect(emailInput).toHaveValue('jane@example.com');
		expect(getByTestId('values')).toHaveTextContent(
			JSON.stringify({ name: 'Jane', email: 'jane@example.com' })
		);
	});
});
