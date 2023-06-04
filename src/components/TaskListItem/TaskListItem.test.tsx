import { render, screen } from '@testing-library/react';
import TaskListItem from './TaskListItem';
import { operationMockData } from '../../states/mocks/taskMockData';

describe('TaskListItem', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders TaskListItem component', () => {
    const { container } = render(
      <TaskListItem operation={operationMockData} status={'open'} />
    );

    const descriptionText = screen.getByText(
      /Description Operation Task Test/i
    );
    const deleteButton = screen.getByRole('button', { name: 'Delete' });
    const add15mButton = screen.getByRole('button', { name: '+15m' });

    expect(deleteButton).toBeInTheDocument();
    expect(add15mButton).toBeInTheDocument();
    expect(descriptionText).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  test('renders TaskListItem component for close task', () => {
    const { container } = render(
      <TaskListItem operation={operationMockData} status={'close'} />
    );

    const deleteOperationButton = screen.queryAllByRole('button', {
      name: 'Delete',
    });
    const add15mButton = screen.queryAllByRole('button', { name: '+15m' });

    // assertion that add time and delete operations button is not visible for close task
    expect(deleteOperationButton).toHaveLength(0);
    expect(add15mButton).toHaveLength(0);
    expect(
      screen.getByText(/Description Operation Task Test/i)
    ).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });
});
