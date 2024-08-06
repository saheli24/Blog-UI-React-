import React, { useEffect, useState } from 'react';
import { Typography, Paper, Grid, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import BasicCard from './BasicCard'; // Import the BasicCard component
import axios from 'axios';
import ResponsiveAppBar from './ResponsiveAppBar'; // Import the ResponsiveAppBar component
import './App.css';

const BlogDashboard = () => {  
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false); // For dialog
  const [title, setTitle] = useState(''); // For new post title
  const [content, setContent] = useState(''); // For new post content
  
  useEffect(() => {  
    fetchData();  
  }, []);  
  
  const fetchData = async () => {  
    try {  
      const response = await axios.get('http://localhost:3001/blogs'); // Use Axios to fetch data
      setData(response.data);  
    } catch (error) {  
      console.error('Error fetching data:', error);  
    }  
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddPost = async () => {
    try {
      await axios.post('http://localhost:3001/blogs', {
        title,
        content
      });
      setTitle('');
      setContent('');
      handleClose();
      fetchData(); // Refresh the list after adding a new post
    } catch (error) {
      console.error('Error adding post:', error);
    }
  };

  return (  
    <div>  
      <ResponsiveAppBar onNewPostClick={handleClickOpen} /> {/* Pass handler to AppBar */}
      
      <Grid container spacing={2} style={{ padding: '0 45px', paddingBottom:'30px', paddingTop:'20px' }}> {/* Adjust spacing to reduce gap between items */}
        <Grid item xs={12}>  
          <Paper elevation={20} sx={{ padding: '2rem', backgroundColor: '#ffffff', border: '2px solid #080A0C', borderRadius: 5}}>  
            <Typography variant="h4" gutterBottom sx={{ textAlign: 'center' }} style={{ fontFamily: 'NewsflashBB' }} fontSize={70}>
              <hr style={{ border: '3px solid #080A0C' }} />
              Blog Posts  
              <hr style={{ border: '3px solid #080A0C' }} />

            </Typography>  
            
            <Grid container spacing={2}> {/* Adjust spacing to reduce gap between items */}
              {data.map((blog) => (  
                <Grid item xs={12} sm={6} md={4} key={blog.id}>
                  <BasicCard 
                    title={blog.title}
                    author={blog.author}
                    content={blog.blog}
                  />
                </Grid>
              ))}
            </Grid>
          </Paper>  
        </Grid>  
      </Grid>  

    </div>  
  );  
};  
  
export default BlogDashboard;
