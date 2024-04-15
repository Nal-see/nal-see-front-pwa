import { convertImgSrcToHTTPS } from '@/lib/helpers';
import FeedCount, { FeedCountSkeleton } from './FeedCount';
import { Skeleton } from '@/components/ui/skeleton';

type ProfileHeaderProps = {
  userProfileData: {
    userImage: string | null;
    feedCount: string | number;
    followingCount: string | number;
    followerCount: string | number;
    username: string;
    isFollowed: boolean;
  };
};

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ userProfileData }) => {
  return (
    <div className="mb-2">
      <div className="flex items-center justify-between px-6 py-2">
        <img
          className="size-20 rounded-full"
          src={
            userProfileData.userImage
              ? convertImgSrcToHTTPS(userProfileData.userImage)
              : 'https://placeholder.co/50x50'
          }
          alt="user"
        />
        <div className="inline-flex w-[65%] justify-center gap-9">
          <FeedCount count={userProfileData.feedCount} counterName="게시물" />
          <FeedCount
            count={userProfileData.followerCount}
            counterName="팔로워"
          />
          <FeedCount
            count={userProfileData.followingCount}
            counterName="팔로잉"
          />
        </div>
      </div>
      <h1 className="px-6 pt-2 text-lg font-semibold">
        {userProfileData.username}
      </h1>
    </div>
  );
};

export default ProfileHeader;

export const ProfileHeaderSkeleton = () => {
  return (
    <div className="mb-2">
      <div className="flex items-center justify-around pb-2">
        <Skeleton className="mx-5 size-20 rounded-full" />
        <div className="flex flex-auto justify-around">
          <FeedCountSkeleton />
          <FeedCountSkeleton />
          <FeedCountSkeleton />
        </div>
      </div>
    </div>
  );
};
