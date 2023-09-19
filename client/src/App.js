import React from "react";
import {Container} from "@mui/material"
import Navbar from "./components/Navbar/Navbar"
import Home from "./components/Home/Home"
import Auth from "./components/Auth/Auth"
import {Routes,Route} from "react-router-dom"
import { GoogleOAuthProvider } from "@react-oauth/google";


const App = ()=>{
    return (
        <GoogleOAuthProvider clientId="451085950606-baqih1mllj0bmf0qcp7kbmmsu4admcd2.apps.googleusercontent.com">
        <Container maxWidth="lg">
            <Navbar />
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/auth" element={<Auth/>}/>
            </Routes>
        </Container>
        </GoogleOAuthProvider>
    );
}

export default App;