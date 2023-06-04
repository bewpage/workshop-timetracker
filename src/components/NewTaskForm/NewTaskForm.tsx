import React, { JSX, FormEvent, useContext } from 'react';
import { TaskContext } from '../../states/TasksContext';
import { ReducerEnumActions } from '../../states/taskReducer';
import { api } from '../../api/fetchApi';

const NewTaskForm = (): JSX.Element => {
  const { dispatch } = useContext(TaskContext);

  const formSubmitHandler = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    let payload: any = {
      // new task with correct status
      status: 'open',
    };

    // get data from form
    formData.forEach((value, key) => {
      payload[key] = value;
    });

    // update the state
    api.createTask(payload).then(data => {
      if (!data.error) {
        dispatch({
          type: ReducerEnumActions.addTask,
          payload: data.data,
        });
      }
    });

    // clear form
    formData.forEach((value, key) => {
      // delete fields input
      form[key].value = '';
    });
  };

  return (
    <>
      <div className="card shadow">
        <div className="card-body">
          <h1 className="card-title">New task</h1>
          <form className="js-task-adding-form" onSubmit={formSubmitHandler}>
            <div className="form-group">
              <label htmlFor="title" className="sr-only"></label>
              <input
                id="title"
                type="text"
                className="form-control"
                name="title"
                placeholder="Title"
                minLength={5}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="description" className="sr-only"></label>
              <input
                id="description"
                type="text"
                className="form-control"
                name="description"
                placeholder="Description"
                minLength={5}
                required
              />
            </div>
            <button className="btn btn-info" type="submit">
              Add task
              <i className="fas fa-plus-circle ml-1"></i>
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
export default NewTaskForm;
