import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { alpha } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import LightbulbIcon from '@mui/icons-material/Lightbulb';

// Function to get a color based on the time of day
const getTimeColor = (timeStr) => {
  if (!timeStr) return '#5c6bc0'; // Default color
  
  // Extract hour from time string (assuming HH:MM AM/PM format)
  const hour = parseInt(timeStr.split(':')[0]);
  const isPM = timeStr.toLowerCase().includes('pm');
  
  // Convert to 24-hour format
  const hour24 = isPM && hour !== 12 ? hour + 12 : (!isPM && hour === 12 ? 0 : hour);
  
  // Morning: blues/purples
  if (hour24 >= 5 && hour24 < 12) {
    return '#5c6bc0'; // Blue-ish
  }
  // Afternoon: greens/teals
  else if (hour24 >= 12 && hour24 < 17) {
    return '#26a69a'; // Teal-ish
  }
  // Evening: oranges/reds
  else if (hour24 >= 17 && hour24 < 22) {
    return '#ff7043'; // Orange-ish
  }
  // Night: dark purples/blues
  else {
    return '#5e35b1'; // Purple-ish
  }
};

const ScheduleDisplay = ({ schedule, explanation, onReset }) => {
  return (
    <Box sx={{ mt: 4 }}>
      <Paper 
        elevation={3} 
        sx={{ 
          p: 4, 
          mb: 4, 
          borderRadius: 2,
          background: 'linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)'
        }}
      >
        <Typography 
          variant="h4" 
          gutterBottom 
          color="primary"
          sx={{ 
            fontWeight: 600,
            textAlign: 'center',
            mb: 3
          }}
        >
          Your Day, Optimized
        </Typography>
        
        <Grid container spacing={2} sx={{ mb: 4 }}>
          {schedule.map((item, index) => {
            const timeColor = getTimeColor(item.time);
            return (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card 
                  elevation={2} 
                  sx={{ 
                    height: '100%',
                    transition: 'transform 0.2s',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: 6
                    },
                    position: 'relative',
                    overflow: 'visible',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      height: '4px',
                      backgroundColor: timeColor,
                      borderTopLeftRadius: '4px',
                      borderTopRightRadius: '4px'
                    }
                  }}
                >
                  <CardContent>
                    <Box 
                      sx={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        mb: 1.5 
                      }}
                    >
                      <Box 
                        sx={{ 
                          display: 'flex', 
                          alignItems: 'center', 
                          justifyContent: 'center',
                          width: 40, 
                          height: 40, 
                          borderRadius: '50%',
                          bgcolor: alpha(timeColor, 0.1),
                          color: timeColor,
                          mr: 1.5
                        }}
                      >
                        <AccessTimeIcon />
                      </Box>
                      <Typography 
                        variant="h5" 
                        component="div"
                        sx={{ 
                          fontWeight: 500,
                          color: timeColor
                        }}
                      >
                        {item.time}
                      </Typography>
                    </Box>
                    <Typography variant="body1" sx={{ pl: 1 }}>
                      {item.task}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>

        <Box 
          sx={{ 
            p: 3, 
            bgcolor: alpha('#26a69a', 0.08), 
            borderRadius: 2,
            display: 'flex',
            mb: 3
          }}
        >
          <LightbulbIcon sx={{ fontSize: 28, color: 'secondary.main', mr: 2, mt: 0.5 }} />
          <Typography variant="body1" color="text.secondary" sx={{ fontStyle: 'italic' }}>
            {explanation}
          </Typography>
        </Box>
        
        <Button 
          variant="contained" 
          onClick={onReset} 
          sx={{ 
            mt: 2,
            py: 1.2,
            fontWeight: 500,
            boxShadow: 2,
            '&:hover': {
              boxShadow: 4
            }
          }}
          fullWidth
        >
          Plan Another Day
        </Button>
      </Paper>
    </Box>
  );
};

export default ScheduleDisplay; 