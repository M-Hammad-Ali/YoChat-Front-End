import React from "react";
import {Grid,Paper,Avatar,TextField,Button} from "@material-ui/core";
import PersonAddOutlinedIcon from '@material-ui/icons/PersonAddOutlined';

const Register=() =>{

    const paperstyle = {height:"74.05vh", width:"62.5vw" , borderRadius: "5%"}
    const photo = {height:"60vh", width:"30vw"}
    const gridstyle1 = {padding:"5% 0%"}
    const gridstyle2 = {backgroundColor:"#92E3A9", borderRadius: "0% 0% 5% 0%"}
    const gridstyle3 = {padding:"5% 20%", height:"60vh", width:"19vw"}
    const avatarstyle = {margin:"8% 3%", backgroundcolor: "#203237"}
    const user = {margin:"1% 1%"}
    const buttonstyle = {backgroundColor:"#203237", margin:"7% 2%"}
    
    return( 
        <Grid>
            <Paper  style={paperstyle}>

                <Grid  container spacing = {0}>
                <Grid style={gridstyle1} xs={6} ><img style={photo} src="./images/Register.png"></img></Grid>
                <Grid style={gridstyle2} xs={6} >
                        <Grid style = {gridstyle3} align="center">
                    <Avatar style={avatarstyle}><PersonAddOutlinedIcon></PersonAddOutlinedIcon></Avatar>
                    <h2>SIGN UP</h2>
                    <TextField style={user} label="First Name" placeholder="Enter First Name" fullwidth required></TextField><br/>
                    <TextField style={user} label="Last Name" placeholder="Enter Last Name" fullwidth required></TextField><br/>
                    <TextField style={user} label="Email" placeholder="Email" fullwidth required></TextField><br/>
                    <TextField style={user} label="Username" placeholder="Enter Username" fullwidth required></TextField><br/>
                <TextField style={user} label="Password" placeholder="Enter Password" type="password" fullwidth required></TextField><br/>

                <Button type="submit" color="primary" variant= "contained" style={buttonstyle}>Sign Up</Button>
                </Grid>
                </Grid>
                </Grid>
                
            </Paper>
            </Grid>
    )
}

export default Register