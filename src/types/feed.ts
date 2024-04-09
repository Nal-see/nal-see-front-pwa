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

export interface IPostEditFormData {
  content: string;
  userInfo: {
    height: number | null;
    weight: number | null;
    constitution: string | null;
    style: string[];
    gender: string | null;
  };
}

export interface IProfileEditForm {
  userInfo: {
    username: string;
    height: number | null;
    weight: number | null;
    constitution: string | null;
    style: string[];
    gender: string | null;
  };
}
