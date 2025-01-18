import React from 'react';
import { useNavigate } from 'react-router-dom';
import './post.css';

interface UserAvatarProps {
  username: string;
  avatarUrl: string | null | undefined;
  userId: number;

}
const UserAvatar: React.FC<UserAvatarProps> = ({ username, avatarUrl,userId }) => {
  const isAvatarUrlValid = (url: string | null | undefined) => {
    return url !== null && url !== undefined && url !== '';
  };


 

  return (
    <div>
      {isAvatarUrlValid(avatarUrl) ?(
         <img
         src={avatarUrl|| "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=150"}
         alt={`${username} Profili`}
         className="rounded-circle me-3"
         style={{ width: "50px", height: "50px", objectFit: "cover" }}
       />
    ):(
        <div
        className="d-flex justify-content-center align-items-center rounded-circle text-white fw-bold"
        style={{
          width: "50px",
          height: "50px",
          backgroundColor: "red",
          fontSize: "36px",
        }}
      >
        {username.charAt(0).toUpperCase()}
      </div>

      )}
 
</div>

  );
};

export default UserAvatar;