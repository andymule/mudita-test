import React, { useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import TaskInput from './components/TaskInput';
import ScheduleDisplay from './components/ScheduleDisplay';
import Loading from './components/Loading';
import { generatePlan } from './utils/api';

const theme = createTheme({
  palette: {
    primary: {
      main: '#5c6bc0',
    },
    secondary: {
      main: '#26a69a',
    },
    background: {
      default: '#f8f9fa',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h3: {
      fontWeight: 500,
    },
  },
});

function App() {
  const [tasks, setTasks] = useState([]);
  const [schedule, setSchedule] = useState(null);
  const [explanation, setExplanation] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleTaskSubmit = async (taskList) => {
    setTasks(taskList);
    setLoading(true);
    setError('');
    
    try {
      console.log('Submitting tasks:', taskList);
      const data = await generatePlan(taskList);
      
      if (data && data.schedule && data.explanation) {
        console.log('Successfully received schedule:', data);
        setSchedule(data.schedule);
        setExplanation(data.explanation);
      } else {
        console.error('Invalid response format from API:', data);
        throw new Error('Invalid response format from API');
      }
    } catch (err) {
      console.error('Error in handleTaskSubmit:', err);
      setError('Failed to generate your schedule. Please try again.');
      setSnackbarOpen(true);
    } finally {
      setLoading(false);
    }
  };

  const resetApp = () => {
    setTasks([]);
    setSchedule(null);
    setExplanation('');
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="md">
        <Box sx={{ my: 4, textAlign: 'center' }}>
          <Typography variant="h3" component="h1" gutterBottom>
            Mudita Daily Planner
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Plan your day optimally with AI assistance
          </Typography>

          {!loading && !schedule && (
            <TaskInput onSubmit={handleTaskSubmit} />
          )}

          {loading && <Loading />}

          {error && (
            <Typography color="error" sx={{ mt: 2 }}>
              {error}
            </Typography>
          )}

          {!loading && schedule && (
            <ScheduleDisplay 
              schedule={schedule} 
              explanation={explanation}
              onReset={resetApp}
            />
          )}
          
          <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
            <Alert onClose={handleSnackbarClose} severity="error" sx={{ width: '100%' }}>
              {error}
            </Alert>
          </Snackbar>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default App; 