import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { followUser, unfollowUser } from '../services/profileApi';

const FollowMesgComp = ({ followed, userId }: { followed: boolean }) => {
  const [followedState, setFollowedState] = useState(followed);

  const handleFollow = () => {
    if (followedState) {
      unfollowUser(userId);
    } else {
      followUser(userId);
    }
    setFollowedState(!followedState);
  };
  return (
    <div className="mx-2 flex justify-around">
      <Button
        className={`"mx-1 my-2 w-[50dvh] ${followedState ? 'text-secondary-foregroundß bg-secondary-foreground' : 'bg-accent text-secondary-foreground'} font-bold `}
        onClick={() => handleFollow()}
      >
        {followedState ? '팔로잉' : '팔로우'}
      </Button>
      <Button className="text-secondary-foregroundß mx-1 my-2 w-[50dvh] bg-secondary-foreground font-bold">
        메시지
      </Button>
    </div>
  );
};

export default FollowMesgComp;
