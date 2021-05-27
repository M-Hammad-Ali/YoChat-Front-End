import React from "react";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import {useState} from "react";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Login from '../components/login'
import Register from "../components/register"
import Grid from "@material-ui/core/Grid"

const SignInOutContainer=() =>{
const [value,setValue]=useState(0)
const handleChange = (event, newValue) => {
    setValue(newValue);
}

const gridStyle = {padding:"4.5% 20%"}
const paperStyle = {width:"62.5vw", borderRadius:"5%"}
const tabstyle = {backgroundColor: "#d9d9d9", borderRadius:"25px 25px 0px 0px"}

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`full-width-tabpanel-${index}`}
        aria-labelledby={`full-width-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={0}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  

    return(
        <Grid style={gridStyle}>
        <Paper elevation={20} style={paperStyle}>
  <Tabs style={tabstyle}
    value={value}
          onChange={handleChange}
          indicatorColor="#a9aaa9"
          textColor="#a9aaa9"
          variant="fullWidth"
          aria-label="full width tabs example"
  >
    <Tab  label="SIGN IN" />
    <Tab  label="SIGN UP" />
  </Tabs>

  <TabPanel  value={value} index={0}>
      <Login/>
      </TabPanel>

      <TabPanel value={value} index={1}>
      <Register/>
      </TabPanel>
</Paper>
</Grid>
    )

}

export default SignInOutContainer;
