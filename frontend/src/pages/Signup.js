import { useState } from 'react';
import { Container, TextField, Button, Typography, Box, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const Signup = () => {
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    try {
      const res = await axios.post('https://social-app-sage-one.vercel.app/api/auth/signup', form);
      login(res.data.token, res.data.username);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
        <Typography variant="h5" fontWeight="bold" mb={3} textAlign="center">
          Create Account
        </Typography>
        {error && <Typography color="error" mb={2}>{error}</Typography>}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField label="Username" name="username" onChange={handleChange} fullWidth />
          <TextField label="Email" name="email" onChange={handleChange} fullWidth />
          <TextField label="Password" name="password" type="password" onChange={handleChange} fullWidth />
          <Button variant="contained" onClick={handleSubmit} sx={{ backgroundColor: '#1a1a2e' }}>
            Sign Up
          </Button>
          <Typography textAlign="center">
            Already have an account?{' '}
            <span style={{ cursor: 'pointer', color: '#1a1a2e', fontWeight: 'bold' }} onClick={() => navigate('/login')}>
              Login
            </span>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default Signup;