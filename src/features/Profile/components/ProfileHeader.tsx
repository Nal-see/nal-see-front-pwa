import FeedCount from './FeedCount';

type ProfileHeaderProps = {
  userProfileData: {
    userImage: string;
    feedCount: string | number;
    followingCount: string | number;
    followerCount: string | number;
    username: string;
  };
};

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ userProfileData }) => {
  return (
    <div>
      <div className="flex items-center justify-around pb-2">
        <img
          className="ml-3 size-20 rounded-full"
          src={userProfileData.userImage}
          alt="user"
        />
        <div className="flex">
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
      <h1 className="ml-3 text-left text-xl font-bold ">
        {userProfileData.username}
      </h1>
    </div>
  );
};

export default ProfileHeader;
