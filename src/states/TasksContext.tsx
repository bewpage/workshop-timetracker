import React, {
  createContext,
  PropsWithChildren,
  ReactNode,
  useEffect,
  useReducer,
} from 'react';
import { TaskType } from '../components/App/App';
import { ReducerEnumActions, taskReducer } from './taskReducer';
import { api } from '../api/fetchApi';

type Props = {
  children: ReactNode;
};

export type DataState = {
  isLoading: boolean;
  tasks: TaskType[] | [];
};

type TaskContextType = {
  data: DataState;
  dispatch: React.Dispatch<any>;
};

const INITIAL_STATE: DataState = {
  isLoading: false,
  tasks: [],
};

export const TaskContext = createContext<TaskContextType>({
  data: {
    isLoading: false,
    tasks: [],
  },
  dispatch: () => null,
});

const TasksContext: React.FC<PropsWithChildren<Props>> = ({ children }) => {
  const [data, dispatch] = useReducer(taskReducer, INITIAL_STATE);

  useEffect(() => {
    dispatch({ type: ReducerEnumActions.isLoading, payload: true });
    api
      .getTasks()
      .then(data => {
        if (!data.error) {
          dispatch({ type: ReducerEnumActions.getTasks, payload: data });
          return data.data;
        }
      })
      .then(data => {
        data.forEach((task: TaskType) => {
          api.getOperations(task.id).then(response => {
            if (!response.error) {
              dispatch({
                type: ReducerEnumActions.getOperations,
                payload: {
                  ...task,
                  operations: response.data,
                },
              });
            }
          });
        });
      })
      .catch(error => {
        // TODO handle error
        throw new Error(error);
      })
      .finally(() => {
        dispatch({ type: ReducerEnumActions.isLoading, payload: false });
      });
  }, []);

  return (
    <TaskContext.Provider value={{ data, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
};

export default TasksContext;
