import React , { useEffect, useRef, useState } from 'react';
import { Avatar, Backdrop, Badge, CircularProgress, IconButton, LinearProgress, makeStyles, TextField, Tooltip } from '@material-ui/core';
import {  SearchOutlined, PersonAdd, Save, ExitToAppSharp} from '@material-ui/icons';
import axios from 'axios';
import Autocomplete from '@material-ui/lab/Autocomplete';
import moment from 'moment';
import { useHistory } from 'react-router';

import './home.css';
import BackgroundPic from '../assets/Register.png';


const useStyles = makeStyles((theme) => ({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
  }));


function Home() {

    const [input,setInput] = useState("");
    const [user,setUser] = useState({});
    const [selectedUser,setSelectedUser] = useState(null);
    const [allUsers,setAllUsers] = useState([]);
    const [allFriends,setFriends] = useState([]);
    const [chat,setChat] = useState([]);
    const divRef = useRef(null);
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [chatLoading,setChatLoading] = useState(false);

    const history = useHistory();

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(async ()=>{
        const username = localStorage.getItem('username');
        console.log(username);
        setOpen(true);
        const res = await axios.post('http://localhost:5000/api/users/userdata',{
            username:username
        });
        const allUsers = await axios.get('http://localhost:5000/api/friends/allusers')
        console.log(res,"ressssssssss");
        setAllUsers(allUsers.data);
        setUser(res.data);
        setFriends(res.data.friends);
        console.log(res.data);
        setOpen(false);
    },[]);

    


    const sendMessage = async e => {
        e.preventDefault();

        console.log("sendMessage",input);
        console.log("user",selectedUser);
        let m = moment().format("MM ddd, YYYY HH:mm:ss a");

        console.log("chat",selectedUser);
        const messageSaveRes = await axios.post('http://localhost:5000/api/chats/send',{
            curUser:localStorage.getItem("username"),
            handle:selectedUser.userHandle1=== localStorage.getItem('username') ? selectedUser.userHandle2 : selectedUser.userHandle1,
            from: localStorage.getItem('username'),
            msgText:input,
            timestamp:m,
            seenByFrom:true,
            seenByTo:false,
            to:selectedUser.userHandle1=== localStorage.getItem('username') ? selectedUser.userHandle2 : selectedUser.userHandle1,
        });
        setChat(messageSaveRes.data.msgs); 
        console.log("MEssage Saved Response",messageSaveRes);
        divRef.current.scrollIntoView({ behavior: 'smooth' });
        setInput('');
    }

    const onChange = (event,values)=>{
        console.log(values);
    }
 

    const checkUser = (username) =>{
        if(user && user.friends ){
            const foundUser = user.friends.filter(usr=>usr === username);
            console.log(foundUser);
            if(foundUser[0] === username){
                return true;
            }
            if(foundUser[0] !== username){
                return false;
            }
        }
    }

    const addFriendHandle = async (username)=>{
        console.log(username);
        const res = await axios.post('http://localhost:5000/api/friends/add',{
            username:localStorage.getItem('username'),
            friendHandle:username,
        });
        console.log(res);
        const getUserData = await axios.post('http://localhost:5000/api/users/userdata',{
            username: localStorage.getItem('username')
        });
        setFriends(getUserData.data.friends);
    }
  
    const handleSelectUser = async (username)=>{
        console.log("username",username);
        setChatLoading(true);
        const res = await axios.post('http://localhost:5000/api/chats/getChat',{
            curUser:localStorage.getItem('username'),
            handle:username,
        });
        console.log(res);
        setSelectedUser(res.data);
        if(res.data.msgs){
            setChat(res.data.msgs);
        }
        if(res.data !== null && res.data.success !==false){
            divRef.current.scrollIntoView({ behavior: 'smooth' });
        }
        setChatLoading(false);
        let messagesID = [];
        for(let msg in res.data.msgs){
            if(res.data.msgs[msg].to === localStorage.getItem('username')){
                messagesID.push(res.data.msgs[msg]._id);
            }
        }
        console.log(messagesID);
        let delMessagesID = [];
        for(let msg in res.data.msgs){
            if(res.data.msgs[msg].to === localStorage.getItem('username') && res.data.msgs[msg].seenByFrom && res.data.msgs[msg].seenByTo && !(res.data.msgs[msg].saved)){
                delMessagesID.push(res.data.msgs[msg]._id);
            }
        }
        console.log(delMessagesID);
        if(res.data.msgs && delMessagesID.length>0){
            const deleteMessagesRes = await axios.post('http://localhost:5000/api/chats/deleteMsg',{
                handle:username,
                curUser:localStorage.getItem('username'),
                ids:messagesID
            });
            console.log("messages delete",deleteMessagesRes);
        }
        const seenMessageRes = await axios.post('http://localhost:5000/api/chats/seenMsg',{
                handle:username,
                curUser:localStorage.getItem('username'),
                msgIDs:messagesID
        })

        console.log("seenMessageres",seenMessageRes);
    }


    const saveMessageHandle = async (chatSave)=>{
        console.log("save message call for",chatSave);

        let messageID=[];
        messageID.push(chatSave._id);
        const saveMessageRes = await axios.post('http://localhost:5000/api/chats/saveMsg',{
                handle:selectedUser.userHandle1=== localStorage.getItem('username') ? selectedUser.userHandle2 : selectedUser.userHandle1,
                curUser:localStorage.getItem('username'),
                msgIDs:messageID
        })
        let chatFilter = chat.filter(cht=>cht._id !== chatSave._id);
        chatSave.saved = true;
        console.log("chat filter",chatFilter);
        chatFilter.push(chatSave);
        setChat([
            ...chatFilter
        ])
        console.log("seenMessageres",saveMessageRes);
    }

    return (
    <div className="app">
        <Backdrop className={classes.backdrop} open={open} onClick={handleClose}>
            <CircularProgress color="inherit" />
        </Backdrop>
      <div className="app_body">
        {user ? 
            <>
                <div className="sidebar">
                    <div className="sidebar_header"> 
                        <Avatar src="https://media-exp1.licdn.com/dms/image/C4D03AQETJkHu9f2njg/profile-displayphoto-shrink_800_800/0/1610014589603?e=1619654400&v=beta&t=5_hmMnIxU2bDi8i1P0rWiLvSPLIh6VssRw7vP0dXoeg" />
                        <div className="sidebar_headerRight">
                            <Tooltip title="Logout">
                                <IconButton onClick={()=>{
                                    localStorage.removeItem('username');
                                    localStorage.removeItem('token');
                                    history.push('/')
                                }}>
                                    <ExitToAppSharp/>
                                </IconButton>
                            </Tooltip>
                        </div>
                    </div>
                        <Autocomplete
                            id="combo-box-demo"
                            options={allUsers? allUsers:null}
                            getOptionLabel={(option) => option.username}
                            style={{ width: "100%"}}
                            onChange={onChange}
                            renderOption ={params=>{
                                console.log(params);
                                return(
                                <div className="row">
                                    <div className="col-6">
                                        {
                                            (!checkUser(params.username)) && params.username !== localStorage.getItem('username') ?
                                                <button className="btn addFriend" onClick={()=>addFriendHandle(params.username)}>
                                                    <PersonAdd/>
                                                </button>: null
                                        }   
                                    </div>
                                    <div className="col-6 mt-2">
                                        <p>{params.username}</p>
                                    </div>
                                </div>
                                )
                            }}
                            renderInput={(params) => (
                                <div className="sidebar_search p-4">
                                    <div className="sidebar_searchContainer" ref={params.InputProps.ref}>
                                            <SearchOutlined/>
                                            <input placeholder="Search or start new chat" type="text" {...params.inputProps}/>
                                    </div>
                                </div>
                            )}
                        />  
                    
                    <div className="sidebar_chats">
                        {
                            allFriends && allFriends.length >0 ?
                                <>
                                    {
                                        allFriends.map(friend=>(
                                                <div className="sidebarChat" key={friend} onClick={()=>handleSelectUser(friend)}
                                                    style={{backgroundColor:selectedUser!== null && (selectedUser.userHandle1===friend ? "#ebebeb":null||selectedUser.userHandle2===friend ? "#ebebeb":null)}}
                                                >
                                                        <Avatar/>
                                                        <div className="sidebarChat_info">
                                                            <h2>{friend}</h2>
                                                        </div>
                                                        <Badge badgeContent={4} color="primary"></Badge>
                                                </div>
                                        ))
                                    }
                                </>
                                : 
                                <div className="sidebarChat">
                                    <div className="sidebarChat_info">
                                        <span><PersonAdd/> Currently You have no friends. Search with username and add friends</span>
                                    </div>
                                </div>
                        }
                    </div>
                </div>
                <div className="chat">
                    <div className="chat_header">
                        <Avatar/>
                        <div className="chat_headerInfo">
                            <h3>{`${user.firstName} ${user.lastName}`}</h3>
                        </div>
                        <div className="chat_headerRight">
                        </div>
                    </div>
                    {selectedUser !== null? 
                        <>
                        <div className="chat_body" style={{
                                backgroundImage: 'url("https://theabbie.github.io/blog/assets/official-whatsapp-background-image.jpg")'
                        }}>  
                            {chat && chat.map(cht=>(
                                <>
                                <p className={`chat_message ${cht.from === localStorage.getItem('username') ? "chat_reciever" : "chat_sender"}`}>
                                <span className="chat_name">{cht.from}</span>
                                    {cht.msgText}
                                <span className="chat_timestamp">
                                    {moment().fromNow(cht.timestamp)}
                                </span>
                                {cht.saved ? null: <i onClick={()=>saveMessageHandle(cht)} className="home_savemessage"> <Save/></i>}
                                </p>
                                </>
                            ))}
                            <div ref={divRef} />
                        </div>
                        {chatLoading && <LinearProgress color="secondary" />}
                        {!chatLoading && <div className="chat_footer">
                            <form>
                                <input 
                                    value={input}
                                    onChange={e=>setInput(e.target.value)}
                                    placeholder="Type a message" type="text"/>
                                <button onClick={sendMessage} type="submit">Send a message</button>
                            </form>
                        </div>
                        }
                        </> 
                    : <img src={BackgroundPic}  style={{width:"85%",height:"500px"}} />  }
                </div>
            </>
        : <p>Fetching Data.....</p>    
    }
    </div>
    </div>
    )
}

export default Home;
