import { TaskType } from '../components/App/App';
import { DataState } from './TasksContext';

export enum ReducerEnumActions {
  getTasks = 'GET_TASKS',
  getOperations = 'GET_OPERATIONS',
  addTask = 'ADD_TASK',
  updateTask = 'UPDATE_TASK',
  deleteTask = 'DELETE_TASK',
  addOperation = 'ADD_OPERATION',
  updateOperation = 'UPDATE_OPERATION',
  deleteOperation = 'DELETE_OPERATION',
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
    case ReducerEnumActions.updateTask:
      const updatedTask = state.tasks.map((task: TaskType) => {
        if (task.id === action.payload.id) {
          return { ...task, ...action.payload };
        }
        return task;
      });
      return { ...state, tasks: updatedTask };
    case ReducerEnumActions.deleteTask:
      const task = state.tasks.filter(
        (task: TaskType) => task.id !== action.payload
      );
      return { ...state, tasks: task };
    case ReducerEnumActions.addOperation:
      const createTasksOperations = state.tasks.map((task: TaskType) => {
        if (task.id === action.payload.task.id) {
          return {
            ...task,
            operations: task?.operations
              ? [...task.operations, action.payload]
              : [action.payload],
          };
        }
        return task;
      });
      return { ...state, tasks: createTasksOperations };
    case ReducerEnumActions.updateOperation:
      const updatedTasksOperations = state.tasks.map((task: TaskType) => {
        const { taskId, payload } = action.payload;
        if (task.id === taskId) {
          const updatedOperations = task.operations.map(operation => {
            if (operation.id === payload.id) {
              return { ...operation, ...payload };
            }
            return operation;
          });
          return { ...task, operations: updatedOperations };
        }
        return task;
      });

      return { ...state, tasks: updatedTasksOperations };
    case ReducerEnumActions.deleteOperation:
      const { idOperation, idTask } = action.payload;
      const deleteTasksOperations = state.tasks.map((task: TaskType) => {
        if (task.id === idTask) {
          const operations = task.operations.filter(
            operation => operation.id !== idOperation
          );
          return { ...task, operations: operations };
        }
        return task;
      });
      return { ...state, tasks: deleteTasksOperations };
    case ReducerEnumActions.isLoading:
      return { ...state, isLoading: action.payload };
    default:
      return state;
  }
};
