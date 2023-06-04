import React, { JSX, useContext } from 'react';
import { TaskContext } from '../../states/TasksContext';
import { TaskType } from '../App/App';
import TaskListItem from '../TaskListItem/TaskListItem';
import { api } from '../../api/fetchApi';
import { ReducerEnumActions } from '../../states/taskReducer';

const TaskList = (): JSX.Element => {
  const { data, dispatch } = useContext(TaskContext);

  const deleteTaskHandler = (id: string): void => {
    // fetch api with delete method
    api.deleteTask(id).then(data => {
      if (!data.error) {
        dispatch({ type: ReducerEnumActions.deleteTask, payload: id });
      }
    });
  };

  const closeTaskHandler = (id: string): void => {
    // fetch api with update method
    const updateTask = data.tasks.find(task => task.id === id);

    if (updateTask) {
      const payload = {
        title: updateTask.title,
        description: updateTask.description,
        status: 'close',
      } as TaskType;

      // update the state API call
      api
        .updateTask(id, payload)
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
        })
        .catch(error => {
          console.log(error);
        });
    }
  };

  // add new operation to task
  const addOperationFormSubmit = (
    e: React.FormEvent<HTMLFormElement>,
    id: string
  ): void => {
    e.preventDefault();

    // get data from form
    const operationForm = e.target as HTMLFormElement;
    const formData = new FormData(operationForm);
    const payload: any = {
      timeSpent: 0, // default value
    };
    formData.forEach((value, key) => {
      payload[key] = value;
    });

    // fetch api with update method
    api
      .createOperation(id, payload)
      .then(data => {
        if (!data.error) {
          return data;
        }
      })
      .then(response => {
        // response from server with new operation
        dispatch({
          type: ReducerEnumActions.addOperation,
          payload: response.data,
        });
      })
      .catch(error => {
        // TODO handle error
        console.log(error);
      });
    // clear form
    formData.forEach((value, key) => {
      operationForm[key].value = '';
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
              onClick={() => closeTaskHandler(value.id)}>
              Finish
            </button>
          ) : null}
          <button
            className="btn btn-outline-danger btn-sm ml-2"
            onClick={() => deleteTaskHandler(value.id)}>
            Delete
          </button>
        </div>
      </div>
      <ul className="list-group list-group-flush">
        {value.operations?.length > 0
          ? value.operations.map(operation => {
              return (
                <TaskListItem
                  key={operation.id}
                  operation={operation}
                  status={value.status}
                />
              );
            })
          : null}
      </ul>
      {/* TODO check if possible to create new component */}
      {value.status === 'open' ? (
        <div className="card-body">
          <form onSubmit={e => addOperationFormSubmit(e, value.id)}>
            <div className="input-group">
              <label htmlFor="operationDescription" className="sr-only"></label>
              <input
                id="operationDescription"
                type="text"
                placeholder="Operation description"
                className="form-control"
                name="description"
                minLength={5}
                required
              />
              <div className="input-group-append">
                <button className="btn btn-info" type="submit">
                  Add
                </button>
              </div>
            </div>
          </form>
        </div>
      ) : null}
    </section>
  );

  return (
    <>
      {data.tasks.length > 0
        ? data.tasks.map(task => {
            return taskCardRender(task);
          })
        : []}
    </>
  );
};

export default TaskList;
