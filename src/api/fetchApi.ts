import { OperationTaskType, TaskType } from '../components/App/App';

export const options: RequestInit = {
  method: 'GET',
  headers: new Headers({
    Authorization: `${process.env.REACT_APP_API_KEY}`,
    'Content-Type': 'application/json',
  }),
};

const baseAPI = async (url: string, options: RequestInit): Promise<any> => {
  const response = await fetch(process.env.REACT_APP_API_HOST + url, options);
  return await response.json();
};

export const getTasksAPI = async (
  options: RequestInit,
  url: string = '/api/tasks'
): Promise<any> => {
  return await baseAPI(url, options);
};

const getOperationAPI = async (
  options: RequestInit,
  id: string,
  url: string = `/api/tasks/${id}/operations`
): Promise<any> => {
  return await baseAPI(url, options);
};

const createTaskAPI = async (payload: TaskType): Promise<any> => {
  const option: RequestInit = {
    ...options,
    method: 'POST',
    body: JSON.stringify(payload),
  };
  return await getTasksAPI(option);
};

const updateTaskAPI = async (id: string, payload: TaskType): Promise<any> => {
  const option: RequestInit = {
    ...options,
    method: 'PUT',
    body: JSON.stringify(payload),
  };
  return await getTasksAPI(option, `/api/tasks/${id}`);
};

const deleteTaskAPI = async (id: string): Promise<any> => {
  const option: RequestInit = {
    ...options,
    method: 'DELETE',
  };
  return await getTasksAPI(option, `/api/tasks/${id}`);
};

const createOperationAPI = async (id: string, payload: any): Promise<any> => {
  const option: RequestInit = {
    ...options,
    method: 'POST',
    body: JSON.stringify(payload),
  };
  return await getOperationAPI(option, id);
};

const deleteOperationAPI = async (id: string): Promise<any> => {
  const option: RequestInit = {
    ...options,
    method: 'DELETE',
  };
  return await getOperationAPI(option, id, `/api/operations/${id}`);
};

const updateOperationAPI = async (
  id: string,
  payload: OperationTaskType
): Promise<any> => {
  const option: RequestInit = {
    ...options,
    method: 'PUT',
    body: JSON.stringify(payload),
  };
  return await getOperationAPI(option, id, `/api/operations/${id}`);
};

export const api = {
  getTasks: () => getTasksAPI(options),
  createTask: (payload: TaskType) => createTaskAPI(payload),
  updateTask: (id: string, payload: TaskType) => updateTaskAPI(id, payload),
  deleteTask: (id: string) => deleteTaskAPI(id),
  getOperations: (id: string) => getOperationAPI(options, id),
  createOperation: (id: string, payload: OperationTaskType) =>
    createOperationAPI(id, payload),
  updateOperation: (id: string, payload: OperationTaskType) =>
    updateOperationAPI(id, payload),
  deleteOperation: (id: string) => deleteOperationAPI(id),
};
