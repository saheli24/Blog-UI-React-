import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React from 'react';
import BlogDashboard from './BlogDashboard';
import NotFoundPage from './NotFoundPage';  // Import the NotFoundPage component
import SignUp from './SignUp'; // Import the SignUp component
import PostDetail from './PostDetail'; // Component to show detailed post content

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BlogDashboard />} />
        <Route path="/sign-up" element={<SignUp />} /> {/* Add the route for the Sign-Up page */}
        <Route path="/post/:id" element={<PostDetail />} />
        <Route path="*" element={<NotFoundPage />} />  {/* Catch-all route for 404 errors */}
      </Routes>
    </BrowserRouter>
  );
};

export default App;

