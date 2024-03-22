export interface ProfileFeedData {
  results: {
    postId: number;
    postPicture: string;
    many: boolean;
  }[];
}

export interface ProfileData {
  results: {
    feedCount: 10;
    followingCount: 100;
    followerCount: 200;
    userId: 1;
    username: '다은';
    userImage: 'https://placeholder.co/50x50';
    followed: false;
  };
}
