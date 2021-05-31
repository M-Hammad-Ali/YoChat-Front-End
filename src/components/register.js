import React, { useState } from "react";
import {Grid,Paper,Avatar,TextField,Button, Snackbar} from "@material-ui/core";
import PersonAddOutlinedIcon from '@material-ui/icons/PersonAddOutlined';
import axios from "axios";
import MuiAlert from '@material-ui/lab/Alert';
import {useHistory} from 'react-router-dom';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Register=() =>{
    const [values,setValues]= useState({});
    const [openSnak,setSnak] = useState(false);
    const [snakMessage,setSnakMessage]= useState("");
    const history = useHistory();

    const onChange = (event)=>{
        console.log(event.target.name);
        setValues({
            ...values,
            [event.target.name]:event.target.value
        });
        console.log(values);
    }

    const onSubmit = async (event)=>{
        event.preventDefault();
        const res = await axios.post("http://localhost:5000/api/users/register",values);
        console.log("sign up response:",res);
        if(res.data.username){
            setSnak(true);
            setSnakMessage("Sucessfully SignUp!");
            setTimeout(()=>{
                history.push('/');
            },2000);
        }
        if(res.data.success === false) {
            setSnak(true);
            setSnakMessage("User Already Exists");
        }
    }

    const paperstyle = {height:"74.05vh", width:"62.5vw" , borderRadius: "5%"}
    const photo = {height:"60vh", width:"30vw"}
    const gridstyle1 = {padding:"5% 0%"}
    const gridstyle2 = {backgroundColor:"#92E3A9", borderRadius: "0% 0% 5% 0%"}
    const gridstyle3 = {padding:"5% 20%", height:"60vh", width:"30vw"}
    const avatarstyle = {margin:"8% 3%", backgroundcolor: "#203237"}
    const user = {margin:"1% 1%"}
    const buttonstyle = {backgroundColor:"#203237", margin:"7% 2%"}
    
    return( 
        <Grid>
            <Paper  style={paperstyle}>

                <Grid  container spacing = {0}>
                <Grid style={gridstyle1} xs={6} ><img style={photo} src="./images/Register.png" alt="register"></img></Grid>
                <Grid style={gridstyle2} xs={6} >
                        <Grid style = {gridstyle3} align="center">
                    <Avatar style={avatarstyle}><PersonAddOutlinedIcon></PersonAddOutlinedIcon></Avatar>
                    <h2>SIGN UP</h2>
                    <TextField error={(values.firstName === "")} style={user} name="firstName" label="First Name" placeholder="Enter First Name" fullwidth required onChange={onChange}></TextField><br/>
                    <TextField error={(values.lastName==="")} style={user} name="lastName" label="Last Name" placeholder="Enter Last Name" fullwidth required onChange={onChange}></TextField><br/>
                    <TextField error={(values.email==="")} style={user} name="email" label="Email" placeholder="Email" fullwidth required onChange={onChange}></TextField><br/>
                    <TextField error={(values.username==="")} style={user} name="username" label="Username" placeholder="Enter Username" fullwidth required onChange={onChange}></TextField><br/>
                <TextField error={(values.password==="")} style={user} name="password" label="Password" placeholder="Enter Password" type="password" fullwidth required onChange={onChange}></TextField><br/>

                <Button type="submit" color="primary" variant= "contained" disabled={!(values.username && values.password && values.firstName && values.lastName && values.email)} 
                    style={{backgroundColor: !(values.username && values.password && values.firstName && values.lastName && values.email)? "":"#203237",margin:"7% 2%"}}
                    onClick={onSubmit}
                >Sign Up</Button>
                </Grid>
                </Grid>
                </Grid>
                
            </Paper>
            <Snackbar open={openSnak} autoHideDuration={6000} onClose={()=>setSnak(false)}>
                <Alert onClose={()=>setSnak(false)} severity={snakMessage==="Sucessfully SignUp!"? "success":"error"}>
                    {snakMessage}
                </Alert>
            </Snackbar>
            </Grid>
    )
}

export default Register