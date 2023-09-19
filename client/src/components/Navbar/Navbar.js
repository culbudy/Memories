import React,{useEffect,useState} from "react"
import {AppBar, Avatar, Toolbar, Typography, Button} from "@mui/material"
import {Link, useNavigate, useLocation} from "react-router-dom"
import { useDispatch } from 'react-redux';
import decode from "jwt-decode";

import memories from '../../images/memories.png'
import  useStyles from "./styles"
import { ACTION_TYPES } from "../../constants/actionType";

const Navbar = () =>{
    const {classes} = useStyles();
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

    const logout = () => {
        dispatch({ type: ACTION_TYPES.LOGOUT });
        setUser(null);
        window.location.reload();
        // navigate("/");
      }

      useEffect(() => {
        const token = user?.token;
        // console.log(user);
        // console.log(token);
        if (token) {
            // console.log(token);
          const expiryTime = 1695050343;
          if (expiryTime * 1000 < new Date().getTime()) logout();
        }
    
        setUser(JSON.parse(localStorage.getItem('profile')));
      }, [location]);

    return (
        <AppBar className={classes.appBar} position="static" color="inherit">
            <div className={classes.brandContainer}>
                <Typography component={Link} to="/" className={classes.heading} variant="h3" align="center">Memories</Typography>
                <img className={classes.image} src={memories} alt="memories" height="40" />
            </div>
            <Toolbar className={classes.toolbar}>
                {user ? (   
                    <div className={classes.profile}>
                        <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>{user.result.name.charAt(0)}</Avatar>
                        <Typography className={classes.userName} variant="h6">{user.result.name}</Typography>
                        <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>Log out</Button>
                    </div>
                ) : (
                    <Button variant="contained" component={Link} to="/auth" color="primary">Sign in</Button>
                )}
            </Toolbar>
        </AppBar>
    )
}

export default Navbar;