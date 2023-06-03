import { render, screen } from '@testing-library/react';
import TaskListItem from './TaskListItem';
import { operationMockData } from '../../states/mocks/taskMockData';

describe('TaskListItem', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders TaskListItem component', () => {
    const { container } = render(
      <TaskListItem operation={operationMockData} />
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
});
