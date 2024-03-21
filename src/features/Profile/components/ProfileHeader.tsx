import FeedCount from './FeedCount';

type ProfileHeaderProps = {
  userImage: string;
  feedCount: string | number;
  followingCount: string | number;
  followerCount: string | number;
};

const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  userImage,
  feedCount,
  followingCount,
  followerCount,
}) => {
  return (
    <div className="flex items-center justify-around">
      <img className="ml-3 size-20 rounded-full" src={userImage} alt="user" />
      <div className="flex">
        <FeedCount count={feedCount} counterName="Posts" />
        <FeedCount count={followerCount} counterName="Followers" />
        <FeedCount count={followingCount} counterName="Following" />
      </div>
    </div>
  );
};

export default ProfileHeader;
