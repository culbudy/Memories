import * as api from "../api"
import { ACTION_TYPES } from "../constants/actionType";

export const getPosts = () => async (dispatch) =>{
    try {
        const { data } = await api.fetchPosts();
        // console.log(data);
        dispatch({
            type: ACTION_TYPES.FETCH_ALL,
            payload: data
        });
    } catch (error) {
        console.log(error);
    }
}

export const createPost = (post) => async (dispatch) =>{
    try {
        const {data} = await api.createPost(post);
        // console.log(data.creator);
        dispatch({
            type:ACTION_TYPES.CREATE,
            payload: data
        })
    } catch (error) {
        console.log(error);
    }
}

export const updatePost = (currentId,newPost) => async (dispatch) =>{
    try {
        const { data } = await api.updatePost(currentId,newPost);
        dispatch({
            type: ACTION_TYPES.UPDATE,
            payload: data
        })
    } catch (error) {
        console.log(error);
    }
}

export const deletePost = (currentId) =>async(dispatch) =>{
    try {
        await api.deletePost(currentId);
        dispatch({
            type: ACTION_TYPES.DELETE,
            payload: currentId
        })
    } catch (error) {
        console.log(error);
    }
}

export const likePost = (currentId) => async(dispatch) =>{
    try {
        const { data } = await api.likePost(currentId);
        dispatch({
            type: ACTION_TYPES.LIKE,
            payload: data
        })
    } catch (error) {
        console.log(error);
    }
}


// by default actions should return an object
// but if we have to use a function inside
// then we use thunk, which uses a middleware between actions and reducers
// this middleware takes a function and returns a function
// therefore this getPosts returns a function