import React from 'react';
import { useNavigate } from 'react-router-dom';

interface UserAvatarProps {
  username: string;
  avatarUrl: string;
}

const UserAvatar: React.FC<UserAvatarProps> = ({ username, avatarUrl }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/profile/${username}`);
  };

  return (
    <button
      onClick={handleClick}
      className="group relative"
    >
      <img
        src={avatarUrl}
        alt={`${username}'s avatar`}
        className="w-10 h-10 rounded-full object-cover transition-transform group-hover:ring-2 group-hover:ring-blue-500"
      />
      <span className="sr-only">View {username}'s profile</span>
    </button>
  );
};

export default UserAvatar;