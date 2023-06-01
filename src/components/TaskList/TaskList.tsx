import React, { JSX, useContext } from 'react';
import { TaskContext } from '../../states/TasksContext';
import { TaskType } from '../App/App';
import TaskListItem from '../TaskListItem/TaskListItem';

const TaskList = (): JSX.Element => {
  const { data } = useContext(TaskContext);

  const taskCardRender = (value: TaskType): JSX.Element => (
    <section className="card mt-5 shadow-sm" key={value.id}>
      <div className="card-header d-flex justify-content-between align-items-center">
        <div>
          <h5>{value.title}</h5>
          <h6 className="card-subtitle text-muted">{value.description}</h6>
        </div>
        <div>
          <button className="btn btn-dark btn-sm">Finish</button>
          <button className="btn btn-outline-danger btn-sm ml-2">Delete</button>
        </div>
      </div>
      <ul className="list-group list-group-flush">
        {value.operations?.length > 0
          ? value.operations.map(operation => {
              return <TaskListItem key={operation.id} operation={operation} />;
            })
          : null}
      </ul>
      <div className="card-body">
        <form>
          <div className="input-group">
            <label htmlFor="operationDescription" className="sr-only"></label>
            <input
              id="operationDescription"
              type="text"
              placeholder="Operation description"
              className="form-control"
              minLength={5}
            />
            <div className="input-group-append">
              <button className="btn btn-info">Add</button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );

  return (
    <>
      {data.tasks.map(task => {
        return taskCardRender(task);
      })}
    </>
  );
};

export default TaskList;
