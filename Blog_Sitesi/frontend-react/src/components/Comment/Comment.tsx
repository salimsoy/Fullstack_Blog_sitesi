import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import UserAvatar from '../Post/UserAvatar';

function Comment(props) {
  const { userId,text, userName,likes,commentId } = props;
  let disabled = localStorage.getItem("currentUser") == null ? true : false ;
  const [isLiked,setIsLiked]=useState(false);
  const [likeCount,setLikeCount]=useState(likes.length);
  const [likeId,setLikeId]=useState(null);
  const isInitialMount= useRef(true);

  useEffect(()=>{checkLikes()},[])

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


  const saveLike = () => {
        
    fetch("http://localhost:8081/clikes", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": localStorage.getItem("tokenKey"),
        },
        body: JSON.stringify({
            commentId: commentId, // postId kontrolü yapılır
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
            console.log("Like saved successfully:", data); // Başarılı kaydı logluyoruz
        })
        .catch((err) => {
            // Hataları düzgün bir şekilde logluyoruz
            console.error("Error saving like:", err);
        });
  };
  const deleteLike = () =>{
    fetch("http://localhost:8081/clikes/"+likeId,{
        method: "DELETE",
        headers:{
            "Authorization": localStorage.getItem("tokenKey"),
        },
  })
  .catch((err) => console.log("error"))
   }
const checkLikes = () => {
  var likeControl = likes.find(like => ""+like.userId == localStorage.getItem("currentUser"));
  
  if (likeControl != null) {
    setLikeId(likeControl.id);
    setIsLiked(true);
  } 
  
}


  return (
    <div
      className="card bg-white rounded-lg shadow-md overflow-hidden mb-5"
      style={{ width: '48rem' }}
    >
      <div className="flex items-center space-x-2 mb-2 p-1">
        <div className="card-body">
          <div className="container mt-3">
            <div className="row">
              <div className="col-1">
                <span>
                  <Link className="nav-link" to={`/users/${userId}`}>
                    <UserAvatar
                      username={userName}
                      userId={userId}
                      avatarUrl=""
                    ></UserAvatar>
                  </Link>
                </span>
              </div>
              <div className="col-9">
                <input
                  type="title"
                  className="form-control"
                  id="titleInput"
                  value={text}
                  disabled
                />
              </div>
              <div className="col-2 d-flex align-items-center justify-content-center">
                {disabled ? (
                  <div>
                    <i
                      className="bi bi-heart"
                      style={{ fontSize: 20, color: '#000000' }}
                    ></i>
                  </div>
                ) : (
                  <button
                    className="btn btn-outline-Secondary"
                    style={{ borderRadius: '50%' }}
                    onClick={handleLiked}
                  >
                    {isLiked ? (
                      <i
                        className="bi bi-heart-fill"
                        style={{ fontSize: 20, color: '#cd5555' }}
                      ></i>
                    ) : (
                      <i
                        className="bi bi-heart"
                        style={{ fontSize: 20, color: '#000000' }}
                      ></i>
                    )}{' '}
                    {likeCount}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Comment;