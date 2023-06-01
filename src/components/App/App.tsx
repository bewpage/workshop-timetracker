import React, { useContext } from 'react';
import './App.css';
import NewTaskForm from '../NewTaskForm/NewTaskForm';
import TaskList from '../TaskList/TaskList';
import TasksContext, { TaskContext } from '../../states/TasksContext';

export type OperationTaskType = {
  id: string;
  description: string;
  addedDate: string;
  timeSpent: number;
  task: TaskType;
};

export type TaskType = {
  id: string;
  title: string;
  description: string;
  status: string;
  addedDate: string;
  operations: OperationTaskType[] | [];
};

function App(): React.JSX.Element {
  const { data, dispatch } = useContext(TaskContext);

  return (
    <main id="app" className="js-tasks-list container mb-5">
      <TasksContext>
        <NewTaskForm />
        <TaskList />
      </TasksContext>
    </main>
  );
}

export default App;
