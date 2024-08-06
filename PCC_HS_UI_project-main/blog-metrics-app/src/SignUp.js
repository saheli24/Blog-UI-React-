import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Snackbar, Alert, Box, Card, CardContent, CardActions } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  
  const navigate = useNavigate(); // Hook for navigation

  const handleSubmit = async () => {
    try {
      await axios.post('https://jsonplaceholder.typicode.com/posts', {
        email,
        password
      });
      setSnackbarMessage('Sign up successful!');
      setOpenSnackbar(true);
      setEmail('');
      setPassword('');
    } catch (error) {
      console.error('Error signing up:', error);
      setSnackbarMessage('Sign up failed.');
      setOpenSnackbar(true);
    }
  };

  const handleCancel = () => {
    navigate('/'); // Navigate to the home or dashboard route
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Container>
      <Box sx={{ minWidth: 275, paddding: '0px', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '90vh' }}>
        <Card elevation={5} sx={{ border: '3px solid #080A0C', borderRadius: 5, width: '100%', maxWidth: 400 }}>
          <CardContent>
            <Typography variant="h5" component="div" sx={{ mb: 2, textAlign: 'center', fontSize: '40px'}}  style={{ fontFamily: 'NewsflashBB' }}
            >
              <hr style={{ border: '3px solid #080A0C' }} />
              Sign Up
              <hr style={{ border: '3px solid #080A0C' }} />
            </Typography>
            <TextField
              label="Email"
              fullWidth
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{ mb: 2 }}
            />
            <TextField
              label="Password"
              type="password"
              fullWidth
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </CardContent>
          <CardActions sx={{
              display: 'flex',
              justifyContent: 'center',
              gap: 2, // Adds space between buttons
              paddingBottom:'30px'
            }}>
            <Button
              variant="outlined"
              color="primary"
              onClick={handleSubmit}
              sx={{
                borderColor: '#080A0C',
                color: '#080A0C',
                fontSize: '20px',
                '&:hover': {
                  backgroundColor: '#080A0C',
                  color: '#ffffff',
                  borderColor: '#080A0C',
                  fontSize: '20px'

                },
              }}
              style={{ fontFamily: 'NewsflashBB' }}

            >
              Sign Up
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={handleCancel}
              sx={{
                borderColor: '#080A0C',
                color: '#080A0C',
                fontSize: '20px',
                '&:hover': {
                  backgroundColor: '#080A0C',
                  color: '#ffffff',
                  borderColor: '#080A0C',
                  fontSize: '20px'
                },
              }}
              style={{ fontFamily: 'NewsflashBB' }}

            >
              Cancel
            </Button>
          </CardActions>
        </Card>
      </Box>

      {/* Snackbar for notifications */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        action={
          <Button color="inherit" onClick={handleCloseSnackbar}>
            Close
          </Button>
        }
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarMessage.includes('failed') ? 'error' : 'success'}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default SignUp;
