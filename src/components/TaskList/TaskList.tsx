import React, { JSX, useContext } from 'react';
import { TaskContext } from '../../states/TasksContext';
import { TaskType } from '../App/App';
import TaskListItem from '../TaskListItem/TaskListItem';
import { fetchTaskData, options } from '../../api/fetchApi';
import { ReducerEnumActions } from '../../states/taskReducer';

const TaskList = (): JSX.Element => {
  const { data, dispatch } = useContext(TaskContext);

  const deleteTask = (id: string): void => {
    // fetch api with delete method
    const deleteOptions = {
      ...options,
      method: 'DELETE',
    };
    fetchTaskData(`/api/tasks/${id}`, deleteOptions).then(data => {
      if (!data.error) {
        dispatch({ type: ReducerEnumActions.deleteTask, payload: id });
      }
    });
  };

  const closeTask = (id: string): void => {
    console.log('close task', id);
    // fetch api with update method
    const updateTask = data.tasks.find(task => task.id === id);
    const updateOptions = {
      ...options,
      headers: {
        ...options.headers,
        'Content-Type': 'application/json',
      },
      method: 'PUT',
      body: JSON.stringify({
        title: updateTask?.title,
        description: updateTask?.description,
        status: 'close',
      }),
    };
    // update the state API call
    fetchTaskData(`/api/tasks/${id}`, updateOptions)
      .then(data => {
        if (!data.error) {
          return data;
        }
      })
      .then(response => {
        // response from server with updated task
        dispatch({
          type: ReducerEnumActions.updateTask,
          payload: response.data,
        });
      });
  };

  const taskCardRender = (value: TaskType): JSX.Element => (
    <section className="card mt-5 shadow-sm" key={value.id}>
      <div className="card-header d-flex justify-content-between align-items-center">
        <div>
          <h5>{value.title}</h5>
          <h6 className="card-subtitle text-muted">{value.description}</h6>
        </div>
        <div>
          {value.status === 'open' ? (
            <button
              className="btn btn-dark btn-sm"
              onClick={() => closeTask(value.id)}>
              Finish
            </button>
          ) : null}
          <button
            className="btn btn-outline-danger btn-sm ml-2"
            onClick={() => deleteTask(value.id)}>
            Delete
          </button>
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
              disabled={value.status === 'close'}
            />
            <div className="input-group-append">
              <button
                className="btn btn-info"
                disabled={value.status === 'close'}>
                Add
              </button>
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
