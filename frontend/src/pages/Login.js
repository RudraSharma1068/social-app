import { useState } from 'react';
import { Container, TextField, Button, Typography, Box, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    try {
     const res = await axios.post('https://social-app-sage-one.vercel.app/api/auth/login', form);
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
          Welcome Back 👋
        </Typography>
        {error && <Typography color="error" mb={2}>{error}</Typography>}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField label="Email" name="email" onChange={handleChange} fullWidth />
          <TextField label="Password" name="password" type="password" onChange={handleChange} fullWidth />
          <Button variant="contained" onClick={handleSubmit} sx={{ backgroundColor: '#1a1a2e' }}>
            Login
          </Button>
          <Typography textAlign="center">
            Don't have an account?{' '}
            <span style={{ cursor: 'pointer', color: '#1a1a2e', fontWeight: 'bold' }} onClick={() => navigate('/signup')}>
              Sign Up
            </span>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default Login;