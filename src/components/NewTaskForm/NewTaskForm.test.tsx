import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NewTaskForm from './NewTaskForm';
import { TaskContext } from '../../states/TasksContext';
import { mockData } from '../../states/mocks/taskMockData';
import { api } from '../../api/fetchApi';

describe('NewTaskForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  const dispatch = jest.fn();
  test('renders NewTaskForm component', () => {
    render(
      <TaskContext.Provider value={{ data: mockData, dispatch }}>
        <NewTaskForm />
      </TaskContext.Provider>
    );

    expect(screen.getByPlaceholderText(/Title/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Description/i)).toBeInTheDocument();
    expect(screen.getByText(/Add task/i)).toBeInTheDocument();
  });

  test('not call API if form is not valid', () => {
    const spyOnCreateTask = jest.spyOn(api, 'createTask');
    render(
      <TaskContext.Provider value={{ data: mockData, dispatch }}>
        <NewTaskForm />
      </TaskContext.Provider>
    );

    screen.findByPlaceholderText(/Title/i);

    const titleInput = screen.getByPlaceholderText(/Title/i);
    const descriptionInput = screen.getByPlaceholderText(/Description/i);
    const addButton = screen.getByText(/Add task/i);

    userEvent.click(addButton);

    expect(titleInput).not.toBeValid();
    expect(descriptionInput).not.toBeValid();
    expect(spyOnCreateTask).not.toHaveBeenCalled();
    expect(screen.getByPlaceholderText(/Title/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Description/i)).toBeInTheDocument();
  });

  test('call API if form has data and is valid', async () => {
    const spyOnCreateTask = jest
      .spyOn(api, 'createTask')
      .mockResolvedValue({ data: { id: 1 } });
    render(
      <TaskContext.Provider value={{ data: mockData, dispatch }}>
        <NewTaskForm />
      </TaskContext.Provider>
    );

    await screen.findByPlaceholderText(/Title/i);

    const titleInput = screen.getByPlaceholderText(/Title/i);
    const descriptionInput = screen.getByPlaceholderText(/Description/i);
    const addButton = screen.getByText(/Add task/i);

    // add some text to form
    await userEvent.type(titleInput, 'Title Test');
    await userEvent.type(descriptionInput, 'Description Test');

    expect(titleInput).toHaveValue('Title Test');
    expect(descriptionInput).toHaveValue('Description Test');

    expect(titleInput).toBeValid();
    expect(descriptionInput).toBeValid();

    await userEvent.click(addButton);

    expect(spyOnCreateTask).toHaveBeenCalled();
    // form should be empty after submit
    expect(screen.getByPlaceholderText(/Title/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Description/i)).toBeInTheDocument();
  });
});
