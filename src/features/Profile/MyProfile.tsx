import BackBtnHeader from '@/components/BackBtnHeader';
import React from 'react';
import ProfileHeader from './components/ProfileHeader';
import FollowMesgComp from './components/FollowMesgComp';

const MyProfilePage = () => {
  return (
    <div>
      <BackBtnHeader title="My Profile" />
      <ProfileHeader
        userImage="https://via.placeholder.com/150"
        feedCount={'100'}
        followingCount={'200'}
        followerCount={'300'}
      />
      <FollowMesgComp />
    </div>
  );
};

export default MyProfilePage;
