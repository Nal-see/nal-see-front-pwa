export interface ImainMapPostData {
  postResponseDto: {
    id: number;
    pictureList: string[];
    content: string;
    likeCnt: number;
    isLiked: boolean;
    createDate: string;
    address: string;
    weather: string;
    temperature: number;
    userId: number;
    username: string;
    userImage: string;
  };
  latitude: number;
  longitude: number;
}
