import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { alpha } from '@mui/material/styles';

const loadingMessages = [
  "Analyzing task dependencies...",
  "Optimizing your schedule...",
  "Grouping similar activities...",
  "Balancing your energy levels...",
  "Finding optimal time slots...",
  "Creating your personalized plan..."
];

const Loading = () => {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    // Update loading message every 2.5 seconds
    const interval = setInterval(() => {
      setMessageIndex((prevIndex) => (prevIndex + 1) % loadingMessages.length);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <Box sx={{ mt: 4, mb: 4 }}>
      <Paper 
        elevation={3} 
        sx={{ 
          p: 5, 
          textAlign: 'center',
          borderRadius: 2,
          background: 'linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <Box 
          sx={{ 
            position: 'absolute', 
            top: 0, 
            left: 0, 
            right: 0, 
            height: '4px', 
            background: 'linear-gradient(90deg, #5c6bc0, #26a69a, #5c6bc0)',
            backgroundSize: '200% 100%',
            animation: 'loadingBar 2s infinite'
          }} 
        />
        
        <Box 
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            minHeight: '180px'
          }}
        >
          <CircularProgress 
            size={70} 
            thickness={4}
            sx={{ 
              mb: 3,
              color: (theme) => theme.palette.primary.main,
              '& .MuiCircularProgress-circle': {
                strokeLinecap: 'round',
              }
            }} 
          />
          
          <Typography 
            variant="h5" 
            gutterBottom
            sx={{ 
              fontWeight: 500,
              color: 'primary.main',
              mb: 1
            }}
          >
            {loadingMessages[messageIndex]}
          </Typography>
          
          <Typography 
            variant="body1" 
            color="text.secondary"
            sx={{
              maxWidth: '450px',
              mx: 'auto',
              pb: 1,
              opacity: 0.85
            }}
          >
            Our AI is carefully analyzing your tasks to create the most efficient schedule for your day.
          </Typography>
        </Box>
      </Paper>

      {/* Add keyframes for the loading bar animation */}
      <Box
        sx={{
          '@keyframes loadingBar': {
            '0%': {
              backgroundPosition: '0% 0%',
            },
            '100%': {
              backgroundPosition: '200% 0%',
            },
          }
        }}
      />
    </Box>
  );
};

export default Loading; 