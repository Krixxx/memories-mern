import React, { useEffect, useState } from 'react';

import { TextField, Button, Typography, Paper } from '@material-ui/core';

import FileBase from 'react-file-base64';

import { useDispatch, useSelector } from 'react-redux';

import { useNavigate } from 'react-router-dom';

import useStyles from './styles';

import { createPost, updatePost } from '../../actions/posts';

const Form = ({ currentId, setCurrentId }) => {
  //default postData empty state
  const [postData, setPostData] = useState({
    title: '',
    message: '',
    tags: '',
    selectedFile: '',
  });

  //get post from redux post state, in case there is currentId for current user
  const post = useSelector((state) =>
    currentId
      ? state.posts.posts.find((message) => message._id === currentId)
      : null
  );

  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //get user from localStorage
  const user = JSON.parse(localStorage.getItem('profile'));

  //useEffect for pre-loading form data if we need to edit post
  useEffect(() => {
    //if there is no post title, then clear all
    if (!post?.title) clear();

    //if there is a post, then setPostData state
    if (post) setPostData(post);
  }, [post]);

  //clear function. Set currentId to zero and clear post data
  const clear = () => {
    setCurrentId(0);
    setPostData({
      title: '',
      message: '',
      tags: '',
      selectedFile: '',
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    //if currentId is 0, then it means we create post, but if there is Id, then it means we want to edit post
    if (currentId === 0) {
      //dispatch createPost action to redux.
      dispatch(createPost({ ...postData, name: user?.result?.name }, navigate));
      //clear all
      clear();
    } else {
      //dispatch updatePost action to redux.
      dispatch(
        updatePost(currentId, { ...postData, name: user?.result?.name })
      );
      //clear data
      clear();
    }
  };

  //If there is no user name in localStorage, we display "Please sign in" form
  if (!user?.result?.name) {
    return (
      <Paper className={classes.paper} elevation={6}>
        <Typography variant='h6' align='center'>
          Please Sign In to create your own memories and like other's memories.
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper className={classes.paper} elevation={6}>
      <form
        autoComplete='off'
        noValidate
        className={`${classes.root} ${classes.form}`}
        onSubmit={handleSubmit}
      >
        <Typography variant='h6'>
          {currentId ? 'Editing' : 'Creating'} a Memory
        </Typography>
        <TextField
          name='title'
          variant='outlined'
          label='Title'
          fullWidth
          value={postData.title}
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
        />
        <TextField
          name='message'
          variant='outlined'
          label='Message'
          multiline
          rows={4}
          fullWidth
          value={postData.message}
          onChange={(e) =>
            setPostData({ ...postData, message: e.target.value })
          }
        />
        <TextField
          name='tags'
          variant='outlined'
          label='Tags'
          fullWidth
          value={postData.tags}
          onChange={(e) =>
            setPostData({ ...postData, tags: e.target.value.split(',') })
          }
        />
        <div className={classes.fileInput}>
          <FileBase
            type='file'
            multiple={false}
            onDone={({ base64 }) =>
              setPostData({ ...postData, selectedFile: base64 })
            }
          />
        </div>
        <Button
          className={classes.buttonSubmit}
          variant='contained'
          color='primary'
          size='large'
          type='submit'
          fullWidth
        >
          Submit
        </Button>
        <Button
          variant='contained'
          color='secondary'
          size='small'
          onClick={clear}
          fullWidth
        >
          Clear
        </Button>
      </form>
    </Paper>
  );
};

export default Form;
