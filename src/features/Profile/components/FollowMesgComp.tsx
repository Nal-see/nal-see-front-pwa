import { Button } from '@/components/ui/button';
import { followUser, unFollowUser } from '../services/profileApi';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '@/store/useAuthStore';
import { useMutation } from '@tanstack/react-query';
// import { useState } from 'react';

const FollowMesgComp = ({
  userId,
  isFollowed,
  onSuccess,
}: {
  userId: string;
  isFollowed: boolean;
  onSuccess: () => void;
}) => {
  // const [followed, setfollowed] = useState(second);
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const myId = user?.userId;

  const handleFollow = () => {
    if (isFollowed) {
      unFollowMutation.mutate();
    } else {
      followMutation.mutate();
    }
  };

  const followMutation = useMutation({
    mutationFn: () => followUser(userId),
    onMutate: async () => {
      followUser(userId);
    },
    onSuccess: () => {
      console.log('followed success');
      onSuccess();
    },
    onError: () => {
      console.log('followed failed');
    },
  });

  const unFollowMutation = useMutation({
    mutationFn: () => unFollowUser(userId),
    onMutate: async () => {
      unFollowUser(userId);
    },
    onSuccess: () => {
      console.log('unfollowed success');
      onSuccess();
    },
    onError: () => {
      console.log('unfollowed failed');
    },
  });

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
        className={`"mx-1 my-2 w-[50dvh] ${isFollowed ? 'text-secondary-foregroundß bg-secondary-foreground' : 'bg-accent text-secondary-foreground'} font-bold `}
        onClick={() => handleFollow()}
      >
        {isFollowed ? '팔로잉' : '팔로우'}
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
