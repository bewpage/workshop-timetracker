import React, { JSX, useContext } from 'react';
import { OperationTaskType } from '../App/App';
import { TaskContext } from '../../states/TasksContext';
import { ReducerEnumActions } from '../../states/taskReducer';
import { api } from '../../api/fetchApi';
import { formatTime } from '../../utils/utils';

const TaskListItem = ({
  operation,
  status,
}: {
  operation: OperationTaskType;
  status: string;
}): JSX.Element => {
  const { dispatch } = useContext(TaskContext);

  const deleteOperation = (data: OperationTaskType): void => {
    const { id } = data;
    api
      .deleteOperation(id)
      .then(data => {
        if (!data.error) {
          return data;
        }
      })
      .then(response => {
        dispatch({
          type: ReducerEnumActions.deleteOperation,
          payload: { idOperation: id, idTask: response.data.task.id },
        });
      });
  };

  const addTimeToOperation = (
    e: React.MouseEvent<HTMLButtonElement>,
    data: OperationTaskType
  ): void => {
    e.preventDefault();
    const { id, description, timeSpent } = data;
    const taskId = data.task.id;

    let time: number;
    let timeString = e.currentTarget.textContent;
    timeString === '+15m' ? (time = 15) : (time = 60);
    let payload = {
      id,
      description,
      timeSpent: timeSpent + time,
    } as OperationTaskType;

    api
      .updateOperation(id, payload)
      .then(data => {
        if (!data.error) {
          return data;
        }
      })
      .then(response => {
        dispatch({
          type: ReducerEnumActions.updateOperation,
          payload: { taskId, payload: response.data },
        });
      });
  };

  const listItem = (data: OperationTaskType): JSX.Element => (
    <li className="list-group-item d-flex justify-content-between align-items-center">
      <div id="task-operation-item-description">
        {data.description}
        <span className="badge badge-success badge-pill ml-2">
          {formatTime(data.timeSpent)}
        </span>
      </div>

      {status === 'open' && (
        <div>
          <button
            className="btn btn-outline-success btn-sm mr-2"
            onClick={e => addTimeToOperation(e, data)}>
            +15m
          </button>
          <button
            className="btn btn-outline-success btn-sm mr-2"
            onClick={e => addTimeToOperation(e, data)}>
            +1h
          </button>
          <button
            className="btn btn-outline-danger btn-sm"
            onClick={() => deleteOperation(data)}>
            Delete
          </button>
        </div>
      )}
    </li>
  );

  return <>{listItem(operation)}</>;
};

export default TaskListItem;
