import { render, screen } from '@testing-library/react';
import App from './App';
import TaskInput from './components/TaskInput';
import Loading from './components/Loading';
import ScheduleDisplay from './components/ScheduleDisplay';

// Mock the API utility
jest.mock('./utils/api', () => ({
  generatePlan: jest.fn()
}));

describe('App Component', () => {
  test('renders the app title', () => {
    render(<App />);
    const titleElement = screen.getByText(/Mudita Daily Planner/i);
    expect(titleElement).toBeInTheDocument();
  });
});

describe('TaskInput Component', () => {
  test('renders task input form', () => {
    const mockSubmit = jest.fn();
    render(<TaskInput onSubmit={mockSubmit} />);
    
    const inputLabel = screen.getByText(/What would you like to accomplish today/i);
    const addButton = screen.getByText(/Add/i);
    const planButton = screen.getByText(/Plan My Day/i);
    
    expect(inputLabel).toBeInTheDocument();
    expect(addButton).toBeInTheDocument();
    expect(planButton).toBeInTheDocument();
    expect(planButton).toBeDisabled(); // Should be disabled initially with no tasks
  });
});

describe('Loading Component', () => {
  test('renders loading indicator with message', () => {
    render(<Loading />);
    
    const progressIndicator = screen.getByRole('progressbar');
    expect(progressIndicator).toBeInTheDocument();
    
    // Check that one of the loading messages exists (using queryAllBy to handle multiple matches)
    const loadingMessageElements = screen.queryAllByText(/analyzing|optimizing|grouping|balancing|finding|creating/i);
    expect(loadingMessageElements.length).toBeGreaterThan(0);
  });
});

describe('ScheduleDisplay Component', () => {
  test('renders schedule and explanation', () => {
    const mockSchedule = [
      { time: '9:00 AM', task: 'Task 1' },
      { time: '11:00 AM', task: 'Task 2' }
    ];
    const mockExplanation = 'This is an optimized schedule';
    const mockReset = jest.fn();
    
    render(
      <ScheduleDisplay 
        schedule={mockSchedule} 
        explanation={mockExplanation} 
        onReset={mockReset} 
      />
    );
    
    // Check if times and tasks are displayed
    expect(screen.getByText('9:00 AM')).toBeInTheDocument();
    expect(screen.getByText('Task 1')).toBeInTheDocument();
    expect(screen.getByText('11:00 AM')).toBeInTheDocument();
    expect(screen.getByText('Task 2')).toBeInTheDocument();
    
    // Check for explanation
    expect(screen.getByText('This is an optimized schedule')).toBeInTheDocument();
    
    // Check for reset button
    const resetButton = screen.getByText(/Plan Another Day/i);
    expect(resetButton).toBeInTheDocument();
  });
}); 