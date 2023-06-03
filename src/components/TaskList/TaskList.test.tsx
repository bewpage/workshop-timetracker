import { render, screen } from '@testing-library/react';
import TaskList from './TaskList';
import { TaskContext } from '../../states/TasksContext';
import { mockData, taskMockData } from '../../states/mocks/taskMockData';

describe('TaskList', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const dispatch = jest.fn();

  test('renders TaskList component with data', () => {
    const { container } = render(
      <TaskContext.Provider value={{ data: mockData, dispatch }}>
        <TaskList />
      </TaskContext.Provider>
    );
    const taskListTitle = screen.getByText('Task Title Test');
    const taskListDescription = screen.getByText('Task Description Test');
    const finishButton = screen.getByRole('button', { name: 'Finish' });

    expect(taskListTitle).toBeInTheDocument();
    expect(taskListDescription).toBeInTheDocument();
    expect(finishButton).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  test('renders TaskList component for close task', () => {
    const dataTaskCloseMock = {
      ...mockData,
      tasks: [{ ...taskMockData, status: 'close' }],
    };

    const { container } = render(
      <TaskContext.Provider value={{ data: dataTaskCloseMock, dispatch }}>
        <TaskList />
      </TaskContext.Provider>
    );
    const taskListTitle = screen.getByText('Task Title Test');
    const taskListDescription = screen.getByText('Task Description Test');
    const finishButton = screen.queryAllByRole('button', { name: 'Finish' });
    const deleteButton = screen.getByRole('button', { name: 'Delete' });

    const addButton = screen.queryAllByRole('button', { name: 'Add' });
    const inputAdd = screen.queryAllByPlaceholderText('Operation description');

    expect(taskListTitle).toBeInTheDocument();
    expect(taskListDescription).toBeInTheDocument();
    expect(finishButton.length).toBe(0);
    expect(deleteButton).toBeInTheDocument();
    // assertion that task adds operation form is not visible for close task
    expect(addButton).toHaveLength(0);
    expect(inputAdd).toHaveLength(0);

    expect(container).toMatchSnapshot();
  });
});
