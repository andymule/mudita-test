import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';

const TaskInput = ({ onSubmit }) => {
  const [currentTask, setCurrentTask] = useState('');
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState('');

  const handleAddTask = () => {
    if (!currentTask.trim()) {
      setError('Task cannot be empty');
      return;
    }

    setTasks([...tasks, currentTask.trim()]);
    setCurrentTask('');
    setError('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTask();
    }
  };

  const handleRemoveTask = (taskToRemove) => {
    setTasks(tasks.filter(task => task !== taskToRemove));
  };

  const handleSubmit = () => {
    if (tasks.length === 0) {
      setError('Please add at least one task');
      return;
    }
    onSubmit(tasks);
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          What would you like to accomplish today?
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
          <TextField
            fullWidth
            label="Enter a task"
            variant="outlined"
            value={currentTask}
            onChange={(e) => setCurrentTask(e.target.value)}
            onKeyPress={handleKeyPress}
            error={!!error}
            helperText={error}
            placeholder="e.g., Go for a 20 minute run"
            sx={{ mr: 1 }}
          />
          <Button 
            variant="contained" 
            onClick={handleAddTask}
            sx={{ height: '56px' }}
          >
            Add
          </Button>
        </Box>

        {tasks.length > 0 && (
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle1" gutterBottom>
              Your tasks:
            </Typography>
            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
              {tasks.map((task, index) => (
                <Chip
                  key={index}
                  label={task}
                  onDelete={() => handleRemoveTask(task)}
                  sx={{ mb: 1 }}
                />
              ))}
            </Stack>
          </Box>
        )}

        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={handleSubmit}
          disabled={tasks.length === 0}
          fullWidth
          sx={{ mt: 2 }}
        >
          Plan My Day
        </Button>
      </Paper>
    </Box>
  );
};

export default TaskInput; 