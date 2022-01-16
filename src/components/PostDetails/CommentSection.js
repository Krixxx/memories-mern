import React, { useState, useRef } from 'react';

import { Typography, TextField, Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';

import useStyles from './styles';

import CommentForm from './CommentForm';

import { commentPost } from '../../actions/posts';

const CommentSection = ({ post }) => {
  //get user data from
  const user = JSON.parse(localStorage.getItem('profile'));

  const dispatch = useDispatch();
  const classes = useStyles();
  const commentsRef = useRef();

  //all comments state
  const [comments, setComments] = useState(post?.comments);

  //current comment state
  const [comment, setComment] = useState('');

  //function to handle COMMENT button click
  const handleClick = async () => {
    //set finalComment in following format 'UserName: Comment'
    const finalComment = `${user.result.name}: ${comment}`;

    //get new comments array from redux state. This is why we returned new comments array from posts actions.
    const newComments = await dispatch(commentPost(finalComment, post._id));

    //set new comments array to comments state
    setComments(newComments);
    //clear current comment
    setComment('');

    //since new comments go to the bottom of comments div, we use useRef hooks to scroll to current div after submitting comment
    commentsRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div>
      <div className={classes.commentsOuterContainer}>
        <div className={classes.commentsInnerContainer}>
          <Typography gutterBottom variant='h6'>
            Comments
          </Typography>
          {comments.map((c, i) => (
            <Typography key={i} gutterBottom variant='subtitle1'>
              <strong>{c.split(': ')[0]}</strong>
              {c.split(':')[1]}
            </Typography>
          ))}
          <div ref={commentsRef} />
        </div>
        {user?.result?.name && (
          <CommentForm
            comment={comment}
            setComment={setComment}
            handleClick={handleClick}
          />
          // <div style={{ width: '70%' }}>
          //   <Typography gutterBottom variant='h6'>
          //     Write a comment
          //   </Typography>
          //   <TextField
          //     fullWidth
          //     rows={4}
          //     variant='outlined'
          //     label='Comment'
          //     multiline
          //     value={comment}
          //     onChange={(e) => setComment(e.target.value)}
          //   />
          //   <Button
          //     style={{ marginTop: '10px' }}
          //     fullWidth
          //     disabled={!comment}
          //     variant='contained'
          //     color='primary'
          //     onClick={handleClick}
          //   >
          //     Comment
          //   </Button>
          // </div>
        )}
      </div>
    </div>
  );
};

export default CommentSection;
