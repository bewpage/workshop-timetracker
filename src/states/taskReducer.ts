import { TaskType } from '../components/App/App';
import { DataState } from './TasksContext';
import { fetchTaskData } from '../api/fetchApi';

export enum ReducerEnumActions {
  getTasks = 'GET_TASKS',
  getOperations = 'GET_OPERATIONS',
  addTask = 'ADD_TASK',
  isLoading = 'IS_LOADING',
}

export const taskReducer = (
  state: DataState,
  action: { type: ReducerEnumActions; payload: any }
): DataState => {
  switch (action.type) {
    case ReducerEnumActions.getTasks:
      return { ...state, tasks: action.payload.data };
    case ReducerEnumActions.getOperations:
      const updatedTasks = state.tasks.map((task: TaskType) => {
        if (task.id === action.payload.id) {
          return { ...task, operations: action.payload.operations };
        }
        return task;
      });
      return { ...state, tasks: updatedTasks };
    case ReducerEnumActions.addTask:
      return { ...state, tasks: [...state.tasks, action.payload] };
    case ReducerEnumActions.isLoading:
      return { ...state, isLoading: action.payload };
    default:
      return state;
  }
};
