export interface Feed {
  id: string;
  userId: number;
  username: string;
  userImage: string;
  place: string;
  createDate: string;
  content: string;
  pictureList: string[];
  isLiked: boolean;
  likeCnt: number;
  weather: string;
  temperature: number;
}
