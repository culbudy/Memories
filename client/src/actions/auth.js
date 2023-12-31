import { ACTION_TYPES } from "../constants/actionType";
import * as api from "../api"

export const signin = (formData,navigate) => async (dispatch) =>{
    try {
        const {data} = await api.signIn(formData);
        // console.log(data);

        dispatch({type: ACTION_TYPES.AUTH, data});

        navigate("/")
    } catch (error) {
        console.log(error);
    }
}

export const signup = (formData,navigate) => async (dispatch) =>{
    try {
        const {data} = await api.signUp(formData);

        dispatch({type: ACTION_TYPES.AUTH, data});
        
        navigate("/")
    } catch (error) {
        console.log(error);
    }
}