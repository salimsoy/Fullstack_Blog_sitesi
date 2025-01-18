import Post from '../Post/Post'
import React, { useState, useEffect } from "react";
import PostForm from '../Post/PostForm';

function Home  ()  {

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [postList, setPostList] = useState([]);
    const [refresh,setRefresh]=useState(false)

    const setRefreshPost = () => {
        setRefresh(true)
    }

    const refreshPots = () =>{
        fetch("http://localhost:8081/posts")
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                setIsLoaded(true);
                setPostList(data);
            })
            .catch(error => {
                console.error("Fetch error: ", error);
                setIsLoaded(true);
                setError(error);
            })
            setRefresh(false)

    }

    useEffect(() => {
        refreshPots();
        
    }, [refresh]);
    
    

    if (error) {
        return <div>Error</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        return (
          <div className='contanier'>
            {localStorage.getItem("currentUser") != null ? <PostForm userId={localStorage.getItem("currentUser")} userName={localStorage.getItem("userName")} refreshPots={setRefreshPost} ></PostForm>:""
            }
           
               {postList.map(post => (
                <Post likes={post.postLikes} postId={post.id} userId={post.userId} userName={post.userName} title={post.title} text={post.text}></Post>
                   
                ))}
            </div>
            
        );
    }
  
}

export default Home
