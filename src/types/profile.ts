export interface ProfileFeedData {
  results: {
    postId: number;
    postPicture: string;
    isMany: boolean;
  }[];
}

export interface ProfileData {
  results: {
    feedCount: number;
    followingCount: number;
    followerCount: number;
    userId: number;
    username: string;
    userImage: string | null;
    followed: false;
  };
}

export interface UserProfilePageProps {
  userId: string;
  feedCount: number;
  followerCount: number;
  followingCount: number;
  isFollowed: boolean;
  username: string;
  userImage: string | null;
}
