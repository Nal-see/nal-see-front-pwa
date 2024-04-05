import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { followUser, unFollowUser } from '../services/profileApi';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '@/store/useAuthStore';

const FollowMesgComp = ({
  userId,
  isFollowed,
}: {
  userId: string;
  isFollowed: boolean;
}) => {
  const [followedState, setFollowedState] = useState(isFollowed);
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const myId = user?.userId;

  const handleFollow = () => {
    if (followedState) {
      unFollowUser(userId);
    } else {
      followUser(userId);
    }
    setFollowedState(!followedState);
  };

  const handleSendMessage = () => {
    if (!myId) return;
    if (Number(myId) < Number(userId)) {
      navigate(`/chat/${myId}-${userId}`);
    } else {
      navigate(`/chat/${userId}-${myId}`);
    }
  };

  return (
    <div className="mx-2 flex justify-around">
      <Button
        className={`"mx-1 my-2 w-[50dvh] ${followedState ? 'text-secondary-foregroundß bg-secondary-foreground' : 'bg-accent text-secondary-foreground'} font-bold `}
        onClick={() => handleFollow()}
      >
        {followedState ? '팔로잉' : '팔로우'}
      </Button>
      <Button
        className="text-secondary-foregroundß mx-1 my-2 w-[50dvh] bg-secondary-foreground font-bold"
        onClick={handleSendMessage}
      >
        메시지
      </Button>
    </div>
  );
};

export default FollowMesgComp;
