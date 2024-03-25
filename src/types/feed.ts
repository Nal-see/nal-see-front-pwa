export interface Feed {
  id: string;
  userId: number;
  username: string;
  userImage: string;
  address: string;
  createDate: string;
  content: string;
  pictureList: string[];
  liked: boolean;
  likeCnt: number;
  weather: string;
  temperature: number;

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
