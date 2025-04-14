import axios from 'axios';

// Configure axios for debugging
axios.interceptors.request.use(request => {
  console.log('API Request:', {
    url: request.url,
    method: request.method,
    data: request.data,
    headers: request.headers
  });
  return request;
});

axios.interceptors.response.use(
  response => {
    console.log('API Response:', {
      status: response.status,
      data: response.data,
      headers: response.headers
    });
    return response;
  },
  error => {
    console.error('API Error:', {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message,
      config: {
        url: error.config?.url,
        method: error.config?.method,
        data: error.config?.data
      }
    });
    return Promise.reject(error);
  }
);

// Determine if we're running in production (Heroku)
const isProduction = process.env.NODE_ENV === 'production' || 
                     window.location.hostname.includes('herokuapp.com');

// Get base API URL based on environment
const getBaseUrl = () => {
  if (isProduction) {
    // In production, use relative URL or direct Heroku URL
    return window.location.hostname.includes('herokuapp.com') 
      ? `https://${window.location.hostname}/api/plan`
      : '/api/plan';
  } else {
    // In development, use explicit localhost URL
    return 'http://localhost:5001/api/plan';
  }
};

export const generatePlan = async (tasks) => {
  try {
    console.log('Generating plan for tasks:', tasks);
    
    const baseUrl = getBaseUrl();
    console.log('Using API URL:', baseUrl);
    
    const response = await axios.post(baseUrl, { tasks });
    console.log('Plan generated successfully:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error generating plan:', error);
    throw error;
  }
}; 