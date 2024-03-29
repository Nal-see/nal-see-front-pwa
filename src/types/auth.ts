export interface LoginBody {
  username: string;
  password: string;
}

export interface IUserInfoResponse {
  id: string;
  username: string;
  email: string;
  newUser: boolean;
  picture: string;
}
