import BackBtnHeader from '@/components/BackBtnHeader';
import ProfileHeader from './components/ProfileHeader';
import FollowMesgComp from './components/FollowMesgComp';
import ProfileFeedList from './components/ProfileFeedList';

const MyProfilePage = () => {
  return (
    <div className="h-[100dvh-183px] overflow-y-scroll">
      <BackBtnHeader title="My Profile" />
      <ProfileHeader
        userImage="https://via.placeholder.com/150"
        feedCount={'100'}
        followingCount={'200'}
        followerCount={'300'}
      />
      <FollowMesgComp />
      <ProfileFeedList />
    </div>
  );
};

export default MyProfilePage;
