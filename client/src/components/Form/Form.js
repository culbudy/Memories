import React, {useState,useEffect} from "react"
import { TextField, Button,Typography, Paper } from "@mui/material";
import FileBase64 from "react-file-base64"

import useStyles from "./styles"
import { useDispatch, useSelector} from "react-redux"
import { createPost,updatePost } from "../../actions/posts";

const Form = ({currentId,setCurrentId})=>{
    const [postData, setPostData] = useState({
        creator: "",
        title: "",
        message: "",
        tags:"",
        selectedFile: ""
    })
    const {classes} = useStyles();
    const post = useSelector((state) => currentId? state.posts.find((p)=>p._id===currentId): null);
    useEffect(()=>{
        if(post) setPostData(post);
    },[post])

    const dispatch = useDispatch();

    const handleSubmit = (e) =>{
        e.preventDefault();
        if(currentId){
            dispatch(updatePost(currentId,postData));
        }
        else{
            dispatch(createPost(postData));
        }
        clear();
    }

    const clear = () =>{
        setPostData({
            creator: "",
            title: "",
            message: "",
            tags:"",
            selectedFile: ""
        });
        setCurrentId(null);
    }

    return (
            <Paper className={classes.paper}>
                <form className={`${classes.form} ${classes.root}`} autoComplete="off" noValidate onSubmit={handleSubmit}>
                    <Typography variant="h6">{currentId? "Editing": "Creating"} a memory</Typography>
                    <TextField name="creator" variant="outlined" label="Creator" fullWidth value={postData.creator} onChange={(e) => setPostData({...postData, creator: e.target.value})} />
                    <TextField name="title" variant="outlined" label="title" fullWidth value={postData.title} onChange={(e) => setPostData({...postData,title: e.target.value})} />
                    <TextField name="message" variant="outlined" label="message" fullWidth value={postData.message} onChange={(e) => setPostData({...postData, message: e.target.value})} />
                    <TextField name="tags" variant="outlined" label="tags" fullWidth value={postData.tags} onChange={(e) => setPostData({...postData, tags: e.target.value.split(',')})} />
                    <div className={classes.fileInput} ><FileBase64 type="file" multiple={false} onDone={({base64}) => setPostData({ ...postData, selectedFile: base64 })}/></div>
                    <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
                    <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
                </form>
            </Paper>
    )
}

export default Form