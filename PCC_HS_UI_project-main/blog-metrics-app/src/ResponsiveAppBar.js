import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import AddCircleIcon from '@mui/icons-material/AddCircle'; // Import the plus icon
import bloggingIcon from './blog.png'; // Import your image
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import axios from 'axios';
import SensorOccupiedIcon from '@mui/icons-material/SensorOccupied';

const settings = ['Profile', 'Account', 'Logout'];

function ResponsiveAppBar() {
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [openNewPost, setOpenNewPost] = useState(false); // State for New Post dialog
  const [postTitle, setPostTitle] = useState('');
  const [postContent, setPostContent] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate for navigation

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleOpenNewPost = () => {
    setOpenNewPost(true);
  };

  const handleCloseNewPost = () => {
    setOpenNewPost(false);
  };

  const handleOpenSignUp = () => {
    navigate('/sign-up'); // Navigate to the sign-up page
  };

  const handleNewPost = async () => {
    try {
      await axios.post('https://jsonplaceholder.typicode.com/posts', {
        title: postTitle,
        body: postContent
      });

      setSnackbarMessage('Post created successfully!');
      setOpenSnackbar(true);
      setPostTitle('');
      setPostContent('');
      handleCloseNewPost();
    } catch (error) {
      console.error('Error creating post:', error);
      setSnackbarMessage('Failed to create post.');
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: '#ffffff', // White background color
        borderBottom: '2px solid #080A0C', // Light gray border at the bottom
      
        padding:'10px',
        mb: 2, // Margin-bottom to create space between AppBar and content below
        boxShadow: 'none', // Remove default shadow to use custom border
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Logo and Icon Section */}
          <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
            <img src={bloggingIcon} alt="Logo" style={{ width: 50, height: 50, marginRight: 10 }} /> 
            <Typography
              variant="h4"
              noWrap
              component="a"
              href=""
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'NewsflashBB',  
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: '#080A0C',
                textDecoration: 'none',
              }}
            >
              MyBlog
            </Typography>
          </Box>

          {/* New Post Button */}
          <Button
            variant="outlined" // Initial variant
            startIcon={<AddCircleIcon />} // Add the plus icon
            sx={{
                mr: 2, // Margin to the left
                border: '2px solid #080A0C', // Border thickness and color
                color: '#080A0C', // Text color
                backgroundColor: 'transparent', // Transparent background
                fontSize: '20px', // Font size of the button text
                fontFamily: 'NewsflashBB',
                '&:hover': {
                  border: '2px solid #080A0C', // Maintain border color on hover
                  color: '#ffffff', // Text color on hover
                  backgroundColor: '#080A0C', // Darker background color on hover
                  fontFamily: 'NewsflashBB'
                },
                transition: 'all 0.3s ease', // Smooth transition for hover effect
              }}
            onClick={handleOpenNewPost} // Handle button click
            >
            New Post
            </Button>

        <Button
            variant="outlined" // Initial variant
            color="secondary" // Text color for the outlined button
            startIcon={<SensorOccupiedIcon />} // Add the plus icon

            onClick={handleOpenSignUp} // Handle button click
            sx={{
            mr: 2, // Margin to the left
            border: '2px solid #080A0C', // Border thickness and color
            color: '#080A0C', // Text color
            fontSize: '20px', // Font size of the button text
            backgroundColor: 'transparent', // Transparent background for the outlined variant
            fontFamily: 'NewsflashBB',
            '&:hover': {
                border: '2px solid #080A0C', // Border color on hover
                color: '#ffffff', // Text color on hover
                backgroundColor: '#080A0C', // Background color on hover (contained style)
                variant: 'contained', // Switch to contained style on hover
                fontFamily: 'NewsflashBB'            
              },
            transition: 'all 0.3s ease', // Smooth transition for hover effect
            }}
        >
            Sign Up
        </Button>

          {/* User Settings Menu */}
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
            <IconButton
                onClick={handleOpenUserMenu}
                sx={{
                    p: 0, // Padding: 0 to remove default padding
                    border: '2px solid #080A0C', // Add border with color
                    borderRadius: '50%', // Optional: Ensure the border is rounded to fit the circular avatar
                }}
                >
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
            </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
      <Dialog
      open={openNewPost}
      onClose={handleCloseNewPost}
      PaperProps={{
        sx: {
          border: '5px solid #080A0C', // Outline border color
          borderRadius: 5, // Rounded corners if desired
          boxShadow: 5, // Slight shadow for depth
        }
      }}
    >
      <DialogTitle textAlign="center" style={{ fontFamily: 'NewsflashBB' }} fontSize={30}>
      <hr style={{ border: '3px solid #080A0C' }} />
        Create New Post
      <hr style={{ border: '3px solid #080A0C' }} />
      </DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Title"
          fullWidth
          variant="outlined"
          value={postTitle}
          onChange={(e) => setPostTitle(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Content"
          fullWidth
          multiline
          rows={4}
          variant="outlined"
          value={postContent}
          onChange={(e) => setPostContent(e.target.value)}
        />
      </DialogContent>
      <DialogActions 
      sx={{
        display: 'flex',
        justifyContent: 'center',
        gap: 2, // Adds space between buttons
        paddingBottom:'30px'
      }}
      >
        
        <Button onClick={handleNewPost} 
              variant="outlined"
              color="secondary"
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
              >Create Post</Button>
        <Button onClick={handleCloseNewPost} 
              variant="outlined"
              color="secondary"
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
              }} style={{ fontFamily: 'NewsflashBB' }}

              >Cancel</Button>
      </DialogActions>
    </Dialog>

      {/* Snackbar for notifications */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarMessage.includes('Failed') ? 'error' : 'success'}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </AppBar>
  );
}

export default ResponsiveAppBar;
