import React, { JSX } from 'react';
import { OperationTaskType, TaskType } from '../App/App';

const TaskListItem = ({
  operation,
}: {
  operation: OperationTaskType;
}): JSX.Element => {
  const listItem = (data: OperationTaskType): JSX.Element => (
    <li className="list-group-item d-flex justify-content-between align-items-center">
      <div id="task-operation-item-description">
        {operation.description}
        <span className="badge badge-success badge-pill ml-2"></span>
      </div>
      <div>
        <button className="btn btn-outline-success btn-sm mr-2">+15m</button>
        <button className="btn btn-outline-success btn-sm mr-2">+1h</button>
        <button className="btn btn-outline-danger btn-sm">Delete</button>
      </div>
    </li>
  );

  return <>{listItem(operation)}</>;
};

export default TaskListItem;
