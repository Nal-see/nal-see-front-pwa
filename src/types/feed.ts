import { Comment } from 'mocks/data/commentData';

export interface PostResponseDto {
  id: string;
  userId: number;
  username: string;
  userImage: string;
  address: string;
  createDate: string;
  content: string;
  liked: boolean;
  likeCnt: number;
  weather: string;
  temperature: number;
  pictureList: string[];
}

export interface Feed {
  postResponseDto: PostResponseDto;

  // id": 2,
  //   "pictureList": [
  //     "https://nalsee-post-photos.s3.ap-northeast-2.amazonaws.com/post-photos/cc7eba47-915b-49be-a914-c1e98b1367ce"
  //   ],
  //   "content": "hello",
  //   "likeCnt": 0,
  //   "createDate": null,
  //   "address": "서울시 강남구",
  //   "weather": "Clouds",
  //   "temperature": 26.2,
  //   "userId": 1,
  //   "username": "지연",
  //   "userImage": null,
  //   "liked": false
}

export interface FeedDetail extends Feed {
  comments: Comment[];
  userInfo: {
    height: number;
    weight: number;
    constitution: string;
    bodyShape: string;
    style: string[];
    gender: string;
  };
}

export interface EditFeedProps {
  userInfo: {
    height: number;
    weight: number;
    bodyShape: string;
    constitution: string;
    style: string[];
    gender: string;
  };
  content: string;
  postId: number;
}
