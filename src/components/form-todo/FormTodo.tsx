import React, { ReactNode, SyntheticEvent, useEffect } from 'react';
import useForm from '../../hooks/useForm';
import Input from '../ui/input/Input';
import Button from '../ui/button/Button';
import { Tasks } from '../app/App';

type FormTodo = {
  task: string;
}

type FormTodoProps = {
  setTasks: React.Dispatch<React.SetStateAction<Tasks>>;
}

const FormTodo: React.FC<FormTodoProps> = ({setTasks}): ReactNode => {
  const { values, handleChange, setValues } = useForm<FormTodo>({
    task: ''
  });

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    setTasks((prevState) => [...prevState, {
      id: Date.now(),
      taskName: values.task,
      completed: false
    }]);
    setValues({
      task: '',
    })
  };

  const handleEnter = (event: KeyboardEvent) => {
    if (event.key === 'enter') {
        setTasks((prevState) => [...prevState, {
          id: Date.now(),
          taskName: values.task,
          completed: false
        }]);
        setValues({
        task: '',
      })
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', handleEnter);

    return document.removeEventListener('keydown', handleEnter);
  }, []);

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <Input 
        className="todo-form__input"
        placeholder="What need to do" 
        name='task'
        type="text"
        value={values.task}
        onChange={handleChange}
      />
      
      <Button id="add" className='button todo-form__button' type='submit' disabled={values.task.length === 0}>
        Add
      </Button>
    </form>
  )
}

export default FormTodo;