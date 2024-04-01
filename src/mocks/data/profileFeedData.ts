import { ProfileData, ProfileFeedData } from '@/types/profile';

const profileFeedData: ProfileFeedData = {
  results: [],
};

for (let i = 0; i < 100; i++) {
  profileFeedData.results.push({
    postId: i,
    postPicture: 'https://placeholder.co/200x200',
    isMany: i % 2 === 0,
  });
}

const profileUserData: ProfileData = {
  results: {
    feedCount: 10,
    followingCount: 100,
    followerCount: 200,
    userId: 1,
    username: '김철수',
    userImage: 'https://placeholder.co/50x50',
    followed: false,
  },
};

export { profileFeedData, profileUserData };
