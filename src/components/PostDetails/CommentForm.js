import React from 'react';
import { Typography, TextField, Button } from '@material-ui/core';

const CommentForm = ({ comment, setComment, handleClick }) => {
  let isSubmitting = false;

  if (comment.length > 0) {
    isSubmitting = true;
  } else {
    isSubmitting = false;
  }

  return (
    <div style={{ width: '70%' }}>
      <Typography gutterBottom variant='h6'>
        Write a comment
      </Typography>
      <TextField
        fullWidth
        rows={4}
        variant='outlined'
        label='Comment'
        multiline
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <Button
        style={{ marginTop: '10px' }}
        fullWidth
        data-testid='comment-button'
        disabled={!isSubmitting}
        variant='contained'
        color='primary'
        onClick={handleClick}
      >
        Comment Post
      </Button>
    </div>
  );
};

export default CommentForm;
