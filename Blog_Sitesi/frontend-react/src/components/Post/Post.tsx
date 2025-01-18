import React, { useState, useEffect, useRef } from "react";
import './post.css';
import UserAvatar from "./UserAvatar";
import { Link, useNavigate } from "react-router-dom";
import Comment from "../Comment/Comment";
import CommentForm from "../Comment/CommentForm";

function Post(props) {
    const { title, text,userName,userId,postId,likes } = props;
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [commentList, setCommentList] = useState([]);
    const [showComments, setShowComments] = useState(false);
    const isInitialMount= useRef(true);
    const [isLiked,setIsLiked]=useState(false);
    const [likeCount,setLikeCount]=useState(likes.length);
    const [sLike,setSLike]=useState(likes);
    const [likeId,setLikeId]=useState(null); 
    const [refresh,setRefresh]=useState(false)
    let disabled = localStorage.getItem("currentUser") == null ? true : false ;

    const setRefreshComment = () => {
        setRefresh(true)
    }


    const handleLiked = () => {
        setIsLiked(!isLiked);
        
        if(!isLiked){
            saveLike();
            setLikeCount(likeCount + 1);
        }else {
            deleteLike();
            setLikeCount(likeCount -1);;

        }
    
    }
    const toggleComments = () => {
            setShowComments(!showComments); 
            refreshComment();
           

    };
    const refreshComment = () =>{
        fetch("http://localhost:8081/comments?postId="+postId)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                setIsLoaded(true);
                setCommentList(data);
            })
            .catch(error => {
                console.error("Fetch error: ", error);
                setIsLoaded(true);
                setError(error);
            })
            
            setRefresh(false)

    }
    const deleteLike = () =>{
        var dlikeId = sLike.find((like => like.postId === postId)).id; 

        fetch("http://localhost:8081/likes/"+dlikeId,{
            method: "DELETE",
            headers:{
                "Authorization": localStorage.getItem("tokenKey"),
            },
    })
    .catch((err) => console.log("error"))
    }

    const saveLike = () => {
        
        fetch("http://localhost:8081/likes", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("tokenKey"),
            },
            body: JSON.stringify({
                postId: postId, // postId kontrolü yapılır
                userId: localStorage.getItem("currentUser"), // localStorage'den alınan kullanıcı ID'si
            }),
        })
            .then((res) => {
                // Sunucudan gelen HTTP durum kodunu kontrol ediyoruz
                if (!res.ok) {
                    throw new Error(`HTTP error! Status: ${res.status}`);
                }
                return res.json(); // Eğer sunucu bir JSON döndürüyorsa işlenir
            })
            .then((data) => {
                setSLike(...sLike,data);
                console.log("Like saved successfully:", data); // Başarılı kaydı logluyoruz
            })
            .catch((err) => {
                // Hataları düzgün bir şekilde logluyoruz
                console.error("Error saving like:", err);
            });
    

    };
    


    const checkLikes = () => {
        
        var likeControl = likes.find(like => ""+like.userId == localStorage.getItem("currentUser"));
        
        if (likeControl != null) {
          setLikeId(likeControl.id);
          setIsLiked(true);
        } 
        
      }
      
    useEffect(() => {
        if(isInitialMount.current){
            isInitialMount.current=false;}
        else {
          refreshComment();}
        
    }, [refresh]);


    useEffect(()=>{checkLikes()},[])

    return (
    
    <div style={{ display: 'flex', justifyContent: 'center' }}>
    <div className="card bg-white rounded-lg shadow-md overflow-hidden mb-3" style={{ width: '50rem'}}>
    <div className="flex items-center space-x-4 mb-4 p-4">
       
     <div className="card-body">
    <div style={{ display: 'flex' }}>
     <Link className="nav-link" to={`/users/${userId}`}>
        <UserAvatar username={userName} userId={userId} avatarUrl=""></UserAvatar>
     </Link>
        
      <h5 className="card-title" style={{ marginLeft: '10px' }}>{title}</h5>
      </div>
      <p className="card-text" style={{ marginTop: '10px' }}>{text}</p>
      

      
     </div>

     {disabled ? (
        <div>
            <i className="bi bi-heart" style={{ fontSize: 20, color: '#000000' }}></i>
        </div>
     ):(
     

     <button className="btn btn-outline-Secondary" style={{borderRadius: '%50'}} 
      onClick={handleLiked}>
        {isLiked ? (
                            <i className="bi bi-heart-fill" style={{ fontSize: 20, color: '#cd5555' }}></i>
                        ) : (
                            <i className="bi bi-heart" style={{ fontSize: 20, color: '#000000' }}></i>
                        )} {likeCount}     
     </button>)}
    
      

     <button className="btn btn-outline-Secondary" style={{borderRadius: '%50', position: 'absolute', right: '10px'}} 
      onClick={toggleComments} >
        {showComments ? (
            <i className="bi bi-chat-fill" style={{ fontSize: 20}}></i>


        ) : (

            <i className="bi bi-chat" style={{ fontSize: 20}}></i>
        )}
        
     </button>
     
     </div>
      {showComments &&(
        <div className="bg-gray-100 rounded d-flex justify-content-center">
        <div className="flex-column">
            <div className="" style={{marginBottom: "5px"}}>
            {disabled ? "":
            <CommentForm userName={localStorage.getItem("userName")} userId={localStorage.getItem("currentUser")} postId={postId} setRefreshComment={setRefreshComment}></CommentForm>
            }
              
            </div>
            
            <div >
            {error?  "error": 
            isLoaded? commentList.map(comment => (
                <Comment userId={comment.userId} userName={comment.userName} text={comment.text} commentId={comment.id} likes={comment.commentLike} ></Comment>

            )): "Loading..."

            }
        </div>
        </div>
        </div>
        )}

     </div>
     
    </div>
    
      
    );
}


export default Post;
