import { useState } from 'react';
import { Container, TextField, Button, Typography, Box, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const CreatePost = () => {
  const [text, setText] = useState('');
  const [image, setImage] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const formData = new FormData();
      if (text) formData.append('text', text);
      if (image) formData.append('image', image);

      await axios.post('http://localhost:5000/api/posts', formData, {
        headers: {
          Authorization: `Bearer ${user.token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
        <Typography variant="h5" fontWeight="bold" mb={3}>
          Create Post
        </Typography>
        {error && <Typography color="error" mb={2}>{error}</Typography>}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label="What's on your mind?"
            multiline
            rows={4}
            value={text}
            onChange={(e) => setText(e.target.value)}
            fullWidth
          />
          <Button variant="outlined" component="label">
            Upload Image
            <input type="file" hidden accept="image/*" onChange={(e) => setImage(e.target.files[0])} />
          </Button>
          {image && (
            <Typography variant="body2" color="text.secondary">
              Selected: {image.name}
            </Typography>
          )}
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={loading}
            sx={{ backgroundColor: '#1a1a2e' }}
          >
            {loading ? 'Posting...' : 'Post'}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default CreatePost;