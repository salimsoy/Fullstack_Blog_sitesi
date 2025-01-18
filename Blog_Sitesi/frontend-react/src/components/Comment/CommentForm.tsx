import React, { useState, useEffect } from "react";
import './Comment.css';
import UserAvatar from "../Post/UserAvatar";
import { Link } from "react-router-dom";

 function CommentForm(props) {
    const {userName,userId,setRefreshComment,postId} = props;
        const[Text,setText]=useState("");
        const [iSent,setIsSent]=useState(false);

    const saveComment = () =>{
        fetch("http://localhost:8081/comments",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("tokenKey"),
            },
            body:JSON.stringify({
                postId:postId,
                userId: userId,
                text: Text,
            }),
        })
        .then((res)=> res.json())
        .catch((err)=> console.log("error"))
        setRefreshComment();
        }
        const handleSubmit = () => {
            saveComment();
            setIsSent(true);
            setText("");
            setRefreshComment();
            console.log("refres");
            
    
        }
        const handleText = (value) =>{
            setText(value);
            setIsSent(false);
        }


  return (
    <div>
        <div className="card bg-white rounded-lg shadow-md overflow-hidden mb-5" style={{ width: '48rem'}}>
        <div className="flex items-center space-x-2 mb-2 p-1">
        <div className="card-body">
        <div className='container mt-3' >
        <div className='row'>
        
        <div className='col-1'>
        <span > <Link className="nav-link" to={`/users/${userId}`}>
        <UserAvatar username={userName} userId={userId} avatarUrl=""></UserAvatar>
        </Link></span>
        </div>
        <div className='col-10'>
        
        <input type="text" className="form-control" id="textInput" placeholder="Text" onChange={(i) => handleText(i.target.value)} value={Text}/>
        
         </div>
         <div className="col-1">
         <button type="button" className="btn btn-secondary" onClick={handleSubmit}>İlet</button>
         </div>

        </div>
        </div>
        </div>
        </div>
    </div>

      
    </div>
  )
}
export default CommentForm;
