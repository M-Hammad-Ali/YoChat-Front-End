import React from "react";
import {Grid, Paper, Avatar, Button } from "@material-ui/core";
import ChatIcon from '@material-ui/icons/Chat';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MenuIcon from '@material-ui/icons/Menu';
import Fab from '@material-ui/core/Fab';
import SendIcon from '@material-ui/icons/Send';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';

function Main() {

    const grid1 = {padding:"4.7% 10%"} 
    const paperstyle = {height:"80vh", width:"80vw"}
    const left_grid = {height:"80vh", width: "20vw", align: "left"}
    const right_grid = {height:"80vh", width: "60vw", align: "right"}
    const title = {height: "8vh", width: "20vw", backgroundColor:"#92E3A9"}
    const avatarstyle = {margin:"20% 25%", backroundColor:"#203237"}
    const title_name = {color: "#203237",marginLeft:"20px"}
    const buttonstyle = {margin:"20%"}
    const buttonstyle1 = {margin:"15%"}
    const buttonstyle3 = {margin:"15%"}
    const srh = {height: "7.5vh", width:"20vw", backgroundColor: "#92E3A9", padding:"3% 0"}
    const search = {height: "6.5vh", width: "18vw", margin:"0 5%",  backgroundColor:"#d5f8e7", borderRadius: "30px"}
    const chatBox = { padding:"1.5% 1%"}
    const chatBox1 = { height:"5.5vh", backgroundColor:"#ffffff", borderRadius: "3%/50%", align:"left"}
    const searchInput = {position: 'relative' }
    const chatTitle = {height: "8vh", width: "60vw", backgroundColor: "#dadada"}
    const chat = {height: "64vh", width: "60vw", backgroundColor:"#f9f9f9"}
    const chatType = {height: "8vh", width: "60vw", backgroundColor: "#dadada"}

        const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return(
        <div style={grid1}>
        <Paper style={paperstyle}>
            <Grid container spacing = {0}>
            <Grid xs={3} style={left_grid}>
            <div style={title}>
                <Grid container spacing = {0}>
                    <Grid xs={2}>
                    <Avatar style={avatarstyle}><ChatIcon></ChatIcon></Avatar>
                    </Grid>
                    <Grid xs={3}>
                        <h3 style={title_name}>YoCHAT</h3>
                    </Grid>
                    <Grid xs={4}></Grid>
                    <Grid xs={3}>
                        <Button Buttontype="submit" endIcon={<PowerSettingsNewIcon/>} color="primary" style={buttonstyle}></Button>
                    </Grid>
                </Grid>
                
            </div>

            <Divider/>

            <div style={srh}>
                <Grid style={search} container spacing={1} alignItems="flex-end">
                    <Grid item style={{display:"flex",alignItems:"center"}}>
                        <SearchIcon />
                        <InputBase id="input-withs-icon-grid" placeholder="Search....."/>
                    </Grid>
                </Grid>
            </div>
            <Divider/>

            <div overflow="scroll">
            <List component="nav"> 
            <ListItem button>
                <ListItemText primary="Friend 1" />
            </ListItem>
            <Divider />
            <ListItem button divider>
                <ListItemText primary="Friend 2" />
            </ListItem>
            <ListItem button>
                <ListItemText primary="Friend 3" />
            </ListItem>
            <Divider light />
            <ListItem button>
                <ListItemText primary="Friend 4" />
            </ListItem>
            </List>
            </div>


                </Grid>
            
            <Divider orientaion="vertical"/>

            <Grid xs={9} style={right_grid}>

                <div style={chatTitle}>
                    <Grid container spacing = {0}>
                        <Grid xs={3}>
                            <h3>BABAR HUSSAIN</h3>
                        </Grid>
                        <Grid xs={8}></Grid>
                        <Grid xs={1} > 
                            <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick} style={buttonstyle1}>
                                <MenuIcon/>
                            </Button>
                            <Menu
                                id="simple-menu"
                                anchorEl={anchorEl}
                                keepMounted
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                            >
                            <MenuItem onClick={handleClose}><strong>Profile</strong></MenuItem>
                            <MenuItem onClick={handleClose}><strong>Delete</strong></MenuItem>
                            <MenuItem onClick={handleClose}><strong>Media</strong></MenuItem>
                            </Menu>
                        </Grid>
                    </Grid>
                </div>
                <div style={chat}></div>
                <div style={chatType}>
                    <Grid container spacing={0}>
                        <Grid xs={1} align="right">
                        <Fab size="small" aria-label="add" style={buttonstyle3}>
                            <InsertEmoticonIcon/>
                        </Fab>
                        </Grid>
                        <Grid xs={1} align="left">
                        <Fab size="small" aria-label="add" style={buttonstyle3}>
                            <AttachFileIcon/>
                        </Fab>
                        </Grid>
                        <Grid xs={8} style={chatBox}>
                            <Grid style={chatBox1} container spacing={1} alignItems="flex-end">
                                <Grid item>
                                    <InputBase placeholder="Enter your message" style={searchInput}/>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid xs={1}>
                        <Fab size="small" variant="extended" aria-label="add" style={buttonstyle3}>
                            <h3> SEND </h3>
                            <SendIcon/>
                        </Fab>
                        </Grid>
                    </Grid>
                </div>



            </Grid>
            </Grid>
        </Paper>
        </div>

    )


} 

export default Main