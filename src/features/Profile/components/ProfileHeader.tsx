import FeedCount from './FeedCount';

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
      <div className="flex items-center justify-around pb-2">
        <img
          className="mx-5 size-20 rounded-full"
          src={
            userProfileData.userImage
              ? `${userProfileData.userImage}`
              : 'https://placeholder.co/50x50'
          }
          alt="user"
        />
        <div className="flex flex-auto justify-around">
          <FeedCount count={userProfileData.feedCount} counterName="Posts" />
          <FeedCount
            count={userProfileData.followerCount}
            counterName="Followers"
          />
          <FeedCount
            count={userProfileData.followingCount}
            counterName="Following"
          />
        </div>
      </div>
      <h1 className="ml-7 text-lg font-bold">{userProfileData.username}</h1>
    </div>
  );
};

export default ProfileHeader;
