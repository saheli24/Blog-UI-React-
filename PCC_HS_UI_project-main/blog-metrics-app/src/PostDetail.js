import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/blogs/${id}`); // Fetch the specific post by ID
        setPost(response.data);
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    };

    fetchPost();
  }, [id]);

  if (!post) {
    return <div>Loading...</div>; // Show loading state while fetching data
  }

  return (
    <div>
      <h1>{post.title}</h1>
      <h2>By {post.author}</h2>
      <p>{post.content}</p>
    </div>
  );
};

export default PostDetail;
