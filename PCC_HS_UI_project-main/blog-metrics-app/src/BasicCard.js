import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import { useNavigate } from 'react-router-dom';

const BasicCard = ({ id, title, content, author }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/post/${id}`);
  };

  // Function to truncate content to a maximum of 200 characters
  const truncateContent = (text, maxLength) => {
    if (!text) return ''; // Handle undefined text
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    }
    return text;
  };

  return (
    <Card 
      sx={{ 
        boxShadow: 20,
        borderRadius: 5,
        width: 350,
        height: 350,
        display: 'flex',
        flexDirection: 'column',
        border: '2px solid #1E2022',
        marginBottom: '16px',
      }}
      onClick={handleClick}
    >
      <CardContent sx={{ 
        overflow: 'hidden',
        flex: 1
      }}>
        <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }} style={{ fontFamily: 'Brawler', letterSpacing: '.1rem' }}>
          {title || 'No Title'}
        </Typography>
        <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', fontSize:'15px' }} style={{ fontFamily: 'Brawler', letterSpacing: '.1rem' }} >
          {author || 'Unknown Author'}
        </Typography>
        <hr style={{ border: 'none', height: '2px', backgroundColor: '#1E2022' }} />
        <Typography variant="body2" sx={{ overflow: 'auto', height: 'calc(100% - 70px)' }} style={{ fontFamily: 'Brawler', letterSpacing: '.1rem' }}>
          {truncateContent(content, 200)}
          <Typography component="span" style={{ fontFamily: 'Burkhan', letterSpacing: '.1rem' }} sx={{ fontWeight: 'bold' }}>
            ..Read More
          </Typography>
        </Typography>
      </CardContent>
      <CardActions>
        <IconButton color="#1E2022" aria-label="edit">
          <EditTwoToneIcon />
        </IconButton>
        <IconButton color="#1E2022" aria-label="delete">
          <DeleteTwoToneIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default BasicCard;
