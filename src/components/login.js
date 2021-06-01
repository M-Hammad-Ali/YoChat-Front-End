import React, { useState } from "react";
import {Grid, Paper, Avatar, TextField, Button, Snackbar } from "@material-ui/core";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import axios from "axios";
import MuiAlert from '@material-ui/lab/Alert';
import {useHistory} from 'react-router-dom';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Login = () => {
    const [values,setValues] = useState({});
    const [openSnak,setSnak] = useState(false);
    const [snakMessage,setSnakMessage]= useState("");
    const history = useHistory();

    const onChange = (event)=>{
        setValues({
            ...values,
            [event.target.name]:event.target.value
        });

    }

    const onSubmit =async (event)=>{
        event.preventDefault();
        const res = await axios.post('http://localhost:5000/api/users/login',values);
        console.log("login response",res);
        if(res.data.success){
            localStorage.setItem('token',res.data.token);
            localStorage.setItem('username',values.username);
            setSnak(true);
            setSnakMessage("Sucessfully Logged In!");
            setTimeout(()=>{
                history.push('/home');
                
            },2000);
        }
        if(res.data.success === false) {
            setSnak(true);
            setSnakMessage("Please Provide Correct Credentials!");
        }

    }

    const paperstyle = {height:"74.05vh", width:"62.5vw" , borderRadius: "5%"}
    const photo = {height:"60vh", width:"30vw"}
    const gridstyle1 = {padding:"5% 0%"}
    const gridstyle2 = {backgroundColor:"#92E3A9", borderRadius: "0% 0% 5% 0%"}
    const gridstyle3 = {padding:"5% 20%", height:"60vh", width:"30vw"}
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
                             { localStorage.getItem('token') === null || localStorage.getItem('token') === ""  ? <> <h2>SIGN IN</h2>
                                <TextField error={(values.username==="")} style={user} name="username" label="Username" placeholder="Enter Username" fullwidth required onChange={onChange}></TextField><br />
                                <TextField error={(values.password==="")} style={user} name="password" label="Password" placeholder="Enter Password" type="password" fullwidth required onChange={onChange}></TextField><br />
                                <Button type="submit" onClick={onSubmit} disabled={!(values.username && values.password)} color="primary" variant="contained" style={{backgroundColor: !(values.username && values.password)? "":"#203237"}}>Sign In</Button>
                                </>
                            :  
                                <>
                                    <h2>You are already Logged In</h2>
                                    <Button  color="primary" variant="contained" style={{backgroundColor: "#203237"}} onClick={()=>history.push('/home')}>Open Chat Dashboard</Button>
                                    <Button  color="primary" variant="contained" style={{backgroundColor: "#203237",marginTop:10}} onClick={()=>{localStorage.removeItem('token');localStorage.removeItem('username');history.push('/')}}>Logout</Button>
                                </>
                            }
                        </Grid>
                    </Grid>
                </Grid>

            </Paper>
            <Snackbar open={openSnak} autoHideDuration={6000} onClose={()=>setSnak(false)}>
                <Alert onClose={()=>setSnak(false)} severity={snakMessage==="Sucessfully Logged In!"? "success":"error"}>
                    {snakMessage}
                </Alert>
            </Snackbar>
        </Grid>
    )
}

export default Login