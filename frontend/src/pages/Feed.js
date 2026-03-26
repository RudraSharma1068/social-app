import { useState, useEffect } from 'react';
import { Container, Typography, Box, CircularProgress } from '@mui/material';
import axios from 'axios';
import PostCard from '../components/PostCard';

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    try {
      const res = await axios.get('https://social-app-sage-one.vercel.app/api/posts');
      setPosts(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleUpdate = (postId, updatedFields) => {
  if (updatedFields.deleted) {
    setPosts(posts.filter(p => p._id !== postId));
  } else {
    setPosts(posts.map(p => p._id === postId ? { ...p, ...updatedFields } : p));
  }
};

  if (loading) return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
      <CircularProgress />
    </Box>
  );

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h5" fontWeight="bold" mb={3}>
        🌐 Social Feed
      </Typography>
      {posts.length === 0 ? (
        <Typography textAlign="center" color="text.secondary">
          No posts yet. Be the first to post!
        </Typography>
      ) : (
        posts.map(post => (
          <PostCard key={post._id} post={post} onUpdate={handleUpdate} />
        ))
      )}
    </Container>
  );
};

export default Feed;