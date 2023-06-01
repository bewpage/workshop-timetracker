import React, {
  createContext,
  PropsWithChildren,
  ReactNode,
  useEffect,
  useReducer,
} from 'react';
import { TaskType } from '../components/App/App';
import { ReducerEnumActions, taskReducer } from './taskReducer';
import { ClientRequestArgs } from 'http';
import { fetchTaskData } from '../api/fetchApi';

type Props = {
  children: ReactNode;
};

export type DataState = {
  isLoading: boolean;
  tasks: TaskType[];
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

  const options: ClientRequestArgs = {
    method: 'GET',
    headers: {
      Authorization: process.env.REACT_APP_API_KEY,
    },
  };

  const fetchOperationData = async (options: any, id: string): Promise<any> => {
    const url = `/api/tasks/${id}/operations`;
    const response = await fetch(process.env.REACT_APP_API_HOST + url, options);
    return await response.json();
  };

  useEffect(() => {
    dispatch({ type: ReducerEnumActions.isLoading, payload: true });
    fetchTaskData('/api/tasks', options)
      .then(data => {
        if (!data.error) {
          dispatch({ type: ReducerEnumActions.getTasks, payload: data });
          return data.data;
        }
      })
      .then(data => {
        data.forEach((task: TaskType) => {
          fetchOperationData(options, task.id).then(response => {
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
        console.log(error);
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
