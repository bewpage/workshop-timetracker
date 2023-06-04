import { DataState } from '../TasksContext';
import { OperationTaskType, TaskType } from '../../components/App/App';

export const taskMockData: TaskType = {
  id: '12',
  title: 'Task Title Test',
  description: 'Task Description Test',
  status: 'open',
  addedDate: '2021-01-01',
  operations: [],
};

export const operationMockData: OperationTaskType = {
  id: '1',
  description: 'Description Operation Task Test',
  timeSpent: 20,
  addedDate: '2021-01-01',
  task: taskMockData,
};

export const mockData: DataState = {
  isLoading: false,
  tasks: [taskMockData],
};

export const mockAPIData = {
  apiKey: { id: 'API_KEY_AUTH' },
  id: '12',
  title: 'Task Title Test',
  description: 'Task Description Test',
  status: 'open',
  addedDate: '2021-01-01',
};

export const mockAPIDataTest = {
  id: '12',
  title: 'Task Title Test',
  description: 'Task Description Test',
  status: 'open',
  addedDate: '2021-01-01',
};
