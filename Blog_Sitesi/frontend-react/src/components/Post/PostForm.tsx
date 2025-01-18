import React, { useState, useEffect } from "react";
import './post.css';
import UserAvatar from "./UserAvatar";
import { Link } from "react-router-dom";


function PostForm(props) {
    const {userName,userId,refreshPots} = props;
    const[Text,setText]=useState("");
    const[Title,setTitle]=useState("");
    const [iSent,setIsSent]=useState(false);
    

    const savePost = () =>{
        fetch("http://localhost:8081/posts",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("tokenKey"),
            },
            body:JSON.stringify({
                title: Title,
                userId: userId,
                text: Text,
            }),
        })
        .then((res)=> res.json())
        .catch((err)=> console.log(err))
        refreshPots();

    }

    const handleSubmit = () => {
          savePost();
          setText("");
          setTitle("");
          refreshPots();
        
        
      };
      
    
    const handleTitle = (value) =>{
        setTitle(value)
       

    }
    const handleText = (value) =>{
        setText(value);
       
    }
    
        

    return (
    
    <div style={{ display: 'flex', justifyContent: 'center' }}>
    <div className="card bg-white rounded-lg shadow-md overflow-hidden mb-5 mt-2" style={{ width: '50rem'}}>
    <div className="flex items-center space-x-4 mb-2 p-3">
       
     <div className="card-body">
    <div style={{ display: 'flex' }}>
     <Link className="nav-link" to={`/users/${userId}`}>
        <UserAvatar username={userName} userId={userId} avatarUrl=""></UserAvatar>
     </Link>
        
      <h5 className="card-title" style={{ marginLeft: '10px' }}>
      <div className="input-group mb-3">
      
       <div className="form-floating">
      <input type="title" className="form-control" id="titleInput" placeholder="Title" onChange={(i)=> handleTitle(i.target.value)} value={Title}/>
      <label form="floatingInputGroup1">Title</label>
      </div>
      </div>
      </h5>
      </div>
      <p className="card-text" style={{ marginTop: '10px' }}>
      <div className="input-group mb-3">
      
      <div className="form-floating">
      <input type="text" className="form-control" id="textInput" placeholder="Text" onChange={(i) => handleText(i.target.value)} value={Text}/>
      <label form="floatingInputGroup1">Text</label>
      </div>
      </div>
      </p>
     </div>

     <button type="button" className="btn btn-secondary" onClick={handleSubmit}>Post</button>
     </div>
     </div>
     
    </div>
    
      
    );
}


export default PostForm;
