import { useState } from 'react';
import {
  Card, CardContent, CardMedia, Typography, Box,
  IconButton, TextField, Button, Divider, Avatar
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DeleteIcon from '@mui/icons-material/Delete';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const PostCard = ({ post, onUpdate }) => {
  const { user } = useAuth();
  const [comment, setComment] = useState('');
  const [showComments, setShowComments] = useState(false);

  const isLiked = user && post.likes.includes(user.username);


const handleDelete = async () => {
  try {
    await axios.delete(
      `http://localhost:5000/api/posts/${post._id}`,
      { headers: { Authorization: `Bearer ${user.token}` } }
    );
    onUpdate(post._id, { deleted: true });
  } catch (err) {
    console.log('Delete error:', err.response?.data || err.message);
    alert(err.response?.data?.message || 'Delete failed');
  }
};

  const handleLike = async () => {
    try {
      const res = await axios.post(
        `http://localhost:5000/api/posts/${post._id}/like`,
        {},
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      onUpdate(post._id, { likes: res.data.likes });
    } catch (err) {
      console.log(err);
    }
  };

  const handleComment = async () => {
    if (!comment.trim()) return;
    try {
      const res = await axios.post(
        `http://localhost:5000/api/posts/${post._id}/comment`,
        { text: comment },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      onUpdate(post._id, { comments: res.data.comments });
      setComment('');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Card elevation={2} sx={{ borderRadius: 3, mb: 2 }}>
      <CardContent>
        {/* Author */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
          <Avatar sx={{ backgroundColor: '#1a1a2e', width: 36, height: 36 }}>
            {post.author[0].toUpperCase()}
          </Avatar>
          <Typography fontWeight="bold">{post.author}</Typography>
        </Box>

        {/* Post Text */}
        {post.text && (
          <Typography variant="body1" mb={1}>{post.text}</Typography>
        )}

        {/* Post Image */}
        {post.imageUrl && (
          <CardMedia
            component="img"
            image={post.imageUrl}
            alt="post"
            sx={{ borderRadius: 2, maxHeight: 400, objectFit: 'cover', mb: 1 }}
          />
        )}

        <Divider sx={{ my: 1 }} />

        {/* Like and Comment buttons */}
         <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
  <IconButton onClick={handleLike} color={isLiked ? 'error' : 'default'}>
    {isLiked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
  </IconButton>
  <Typography>{post.likes.length}</Typography>

  <IconButton onClick={() => setShowComments(!showComments)}>
    <ChatBubbleOutlineIcon />
  </IconButton>
  <Typography>{post.comments.length}</Typography>

  {user && user.username === post.author && (
    <IconButton onClick={handleDelete} color="error" sx={{ marginLeft: 'auto' }}>
      <DeleteIcon />
    </IconButton>
  )}
</Box>

        {/* Comments Section */}
        {showComments && (
          <Box sx={{ mt: 1 }}>
            {post.comments.map((c, i) => (
              <Box key={i} sx={{ mb: 0.5 }}>
                <Typography variant="body2">
                  <strong>{c.username}:</strong> {c.text}
                </Typography>
              </Box>
            ))}
            {user && (
              <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                <TextField
                  size="small"
                  fullWidth
                  placeholder="Write a comment..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
                <Button variant="contained" onClick={handleComment} sx={{ backgroundColor: '#1a1a2e' }}>
                  Post
                </Button>
              </Box>
            )}
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default PostCard;