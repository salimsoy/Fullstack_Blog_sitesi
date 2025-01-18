import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import UserAvatar from '../Post/UserAvatar';

function User() {
  const { userId } = useParams();
  const [isLoaded, setIsLoaded] = useState(false);
  const [user, setUser] = useState();

  const refreshUser = () => {
    fetch("http://localhost:8081/users/"+userId,{

      method:"GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem("tokenKey"),
    },
    })
      .then(res => res.json())
      .then(
        (result) =>{
          console.log(result);
          setUser(result);
          setIsLoaded(true);
          
        },
        (error) => {
          console.log(error);
          
        }
      )
  }

  useEffect(() => {
    refreshUser();
    console.log(user);
  }, []);

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>User not found.</div>;
  }

  return (
    <div className="container d-flex justify-content-center align-items-center mt-5" style={{ minHeight: '80vh' }}>
      <div className="card shadow-lg" style={{ width: '24rem', borderRadius: '15px' }}>
        <div className="card-body text-center">
          <UserAvatar username={user.userName} userId={Number(userId)} avatarUrl="" />
          <h5 className="card-title mb-3" style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{user.userName}</h5>
          <p className="card-text text-muted" style={{ fontSize: '1rem' }}>Profilime Hoşgeldin</p>
          <button className="btn btn-primary mt-3" onClick={refreshUser}>
            Refresh User
          </button>
        </div>
      </div>
    </div>
  );
}

export default User;
