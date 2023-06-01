import { ClientRequestArgs } from 'http';

export const options: ClientRequestArgs = {
  method: 'GET',
  headers: {
    Authorization: process.env.REACT_APP_API_KEY,
  },
};

export const fetchTaskData = async (
  url: string,
  options: any
): Promise<any> => {
  const response = await fetch(process.env.REACT_APP_API_HOST + url, options);
  return await response.json();
};
