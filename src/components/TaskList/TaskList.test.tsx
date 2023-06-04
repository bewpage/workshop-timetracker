import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TaskList from './TaskList';
import TaskContext from '../../states/TasksContext';
import {
  mockAPIData,
  operationMockData,
  mockAPIDataTest,
} from '../../states/mocks/taskMockData';
import { api } from '../../api/fetchApi';

describe('TaskList', () => {
  beforeEach(() => {
    jest.spyOn(api, 'getTasks').mockResolvedValue({ data: [mockAPIDataTest] });
    jest
      .spyOn(api, 'getOperations')
      .mockResolvedValue({ data: [operationMockData] });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders TaskList component with data', async () => {
    const { container } = render(
      <TaskContext>
        <TaskList />
      </TaskContext>
    );

    await screen.findByText('Task Title Test');

    const taskListTitle = screen.getByText('Task Title Test');
    const taskListDescription = screen.getByText('Task Description Test');
    const finishButton = screen.getByRole('button', { name: 'Finish' });

    expect(taskListTitle).toBeInTheDocument();
    expect(taskListDescription).toBeInTheDocument();
    expect(finishButton).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  test('renders TaskList component for close task', async () => {
    jest
      .spyOn(api, 'getTasks')
      .mockResolvedValue({ data: [{ ...mockAPIDataTest, status: 'close' }] });
    const { container } = render(
      <TaskContext>
        <TaskList />
      </TaskContext>
    );

    await screen.findByText('Task Title Test');

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

  test('click finish task and close task', async () => {
    const closeTaskAPISpy = jest
      .spyOn(api, 'updateTask')
      .mockResolvedValue({ data: { ...mockAPIData, status: 'close' } });

    const { container } = render(
      <TaskContext>
        <TaskList />
      </TaskContext>
    );

    await screen.findByText('Task Title Test');

    expect(
      screen.getByText('Description Operation Task Test')
    ).toBeInTheDocument();

    const finishButton = screen.getByRole('button', { name: 'Finish' });
    const deleteButton = screen.getAllByRole('button', { name: 'Delete' });
    const add15mButton = screen.getByRole('button', { name: '+15m' });

    expect(deleteButton).toHaveLength(2);
    expect(add15mButton).toBeInTheDocument();
    expect(finishButton).toBeInTheDocument();

    // click on finish button
    await act(async () => {
      userEvent.click(finishButton);
    });

    // check if page is updated
    expect(closeTaskAPISpy).toHaveBeenCalledTimes(1);

    await screen.findByText('Task Title Test');

    expect(screen.queryAllByRole('button', { name: '+15m' })).toHaveLength(0);
    expect(screen.queryAllByRole('button', { name: 'Delete' })).toHaveLength(1);
    expect(container).toMatchSnapshot();
  });
});
