import React, { useState } from "react";
import {Grid, Paper, Avatar, TextField, Button } from "@material-ui/core";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

const Login = () => {
    const [values,setValues] = useState({});

    const onChange = (event)=>{
        setValues({
            ...values,
            [event.target.name]:event.target.value
        });

    }

    const onSubmit = (event)=>{
        event.preventDefault();
    }

    const paperstyle = {height:"74.05vh", width:"62.5vw" , borderRadius: "5%"}
    const photo = {height:"60vh", width:"30vw"}
    const gridstyle1 = {padding:"5% 0%"}
    const gridstyle2 = {backgroundColor:"#92E3A9", borderRadius: "0% 0% 5% 0%"}
    const gridstyle3 = {padding:"5% 20%", height:"60vh", width:"19vw"}
    const avatarstyle = {margin:"8% 3%", backgroundcolor: "#203237"}
    const user = {margin:"5% 5%"}
    const buttonstyle = {backgroundColor:"#203237", margin:"5% 2%"}
    const checkbox = { margin: "3% 1%" }
    

    return (
        <Grid>

            <Paper style={paperstyle}>

                <Grid container spacing={0}>
                    <Grid style={gridstyle1} xs={6} ><img style={photo} src="./images/Login.jpg" alt="login"></img></Grid>
                    <Grid style={gridstyle2} xs={6} >
                        <Grid style={gridstyle3} align="center">
                            <Avatar style={avatarstyle}><LockOutlinedIcon></LockOutlinedIcon></Avatar>
                            <h2>SIGN IN</h2>
                            <TextField error={(values.username==="")} style={user} name="username" label="Username" placeholder="Enter Username" fullwidth required onChange={onChange}></TextField><br />
                            <TextField error={(values.password==="")} style={user} name="password" label="Password" placeholder="Enter Password" type="password" fullwidth required onChange={onChange}></TextField><br />
                            <FormControlLabel style={checkbox}
                                control={
                                    <Checkbox
                                        name="checkedB"
                                        color="primary"
                                    />
                                }
                                label="Remember Me"
                            /><br />

                            <Button type="submit" onSubmit={onSubmit} disabled={!(values.username && values.password)} color="primary" variant="contained" style={{backgroundColor: !(values.username && values.password)? "":"#203237"}}>Sign In</Button>
                        </Grid>
                    </Grid>
                </Grid>

            </Paper>
        </Grid>
    )
}

export default Login