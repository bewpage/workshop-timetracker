import { render, screen } from '@testing-library/react';
import App from './App';
import { api } from '../../api/fetchApi';
import {
  mockAPIDataTest,
  operationMockData,
} from '../../states/mocks/taskMockData';
import TasksContext from '../../states/TasksContext';

describe('App', () => {
  beforeEach(() => {
    jest.spyOn(api, 'getTasks').mockResolvedValue({ data: [mockAPIDataTest] });
    jest
      .spyOn(api, 'getOperations')
      .mockResolvedValue({ data: [operationMockData] });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders App component', async () => {
    const { container } = render(
      <TasksContext>
        <App />
      </TasksContext>
    );

    await screen.findByText('Task Title Test');

    expect(screen.getByText(/New task/i)).toBeInTheDocument();
    expect(screen.getByText(/Task Title Test/i)).toBeInTheDocument();
    expect(screen.getByText(/Task Description Test/i)).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });
});
