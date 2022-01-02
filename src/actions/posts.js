import {
  FETCH_POST,
  FETCH_ALL,
  FETCH_BY_SEARCH,
  CREATE,
  UPDATE,
  DELETE,
  START_LOADING,
  COMMENT,
  END_LOADING,
} from '../constants/actionTypes';
import * as api from '../api';

//Action creators
//Get single post by providing post ID. We use redux-thunk, to use dispatch in our actions.
export const getPost = (id) => async (dispatch) => {
  try {
    //set isLoading state to true
    dispatch({ type: START_LOADING });

    //get post data from server, through api. id as input
    const { data } = await api.fetchPost(id);

    //set post data to post state
    dispatch({ type: FETCH_POST, payload: data });

    //set isLoading to false
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};
//Get posts by providing pagination page number
export const getPosts = (page) => async (dispatch) => {
  try {
    //set isLoading state to true
    dispatch({ type: START_LOADING });

    //get posts from server, through api. page number as input
    const { data } = await api.fetchPosts(page);

    //we receive three things from server: posts, currentPage and numberofPages. We set these values to state
    dispatch({ type: FETCH_ALL, payload: data });

    //set isLoading state to false
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

//get posts by search, providing searchQuery. query includes two parameters{searchTerm, tags}
export const getPostsBySearch = (searchQuery) => async (dispatch) => {
  try {
    //set isLoading state to true
    dispatch({ type: START_LOADING });

    //get result from server, using searchQuery
    const {
      data: { data },
    } = await api.fetchPostsBySearch(searchQuery);

    //set result to posts state
    dispatch({ type: FETCH_BY_SEARCH, payload: data });

    //set isLoading state to false
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

//Create post. Input is post {postData:{title, message, tags, selectedFile}, userName} and navigate function, which redirects user to created post.
export const createPost = (post, navigate) => async (dispatch) => {
  try {
    //set isLoading state to true
    dispatch({ type: START_LOADING });

    //create post in server
    const { data } = await api.createPost(post);

    //send user to new post page
    navigate(`/posts/${data._id}`);

    //add created post to posts state array
    dispatch({ type: CREATE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

//update post, by providing current post ID and new post data {postData:{title, message, tags, selectedFile}, userName}
export const updatePost = (id, post) => async (dispatch) => {
  try {
    //send updated info to server
    const { data } = await api.updatePost(id, post);

    //send data to reducer, where we find updated post by post ID and then update data in state
    dispatch({ type: UPDATE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

//delete post by providing post ID
export const deletePost = (id) => async (dispatch) => {
  try {
    //send ID to server
    await api.deletePost(id);

    //filter post with given ID from posts state
    dispatch({ type: DELETE, payload: id });
  } catch (error) {
    console.log(error);
  }
};

//comment post, by providing comment and ID
export const commentPost = (value, id) => async (dispatch) => {
  try {
    //send data to server
    const { data } = await api.commentPost(value, id);

    //send comment data to reducer, where we refresh commented post
    dispatch({ type: COMMENT, payload: data });

    //to instantly update our UI, we return comments to CommentSection
    return data.comments;
  } catch (error) {
    console.log(error);
  }
};

//like post by providing ID. We send post ID to back-end, where we extract it and also user ID, who liked the post. Then user ID will be added to likes array.
export const likePost = (id) => async (dispatch) => {
  try {
    //send post ID to server and get back updated Post
    const { data } = await api.likePost(id);

    //send data to reducer, where we find updated post by post ID and then update data in state
    dispatch({ type: UPDATE, payload: data });
  } catch (error) {
    console.log(error);
  }
};
