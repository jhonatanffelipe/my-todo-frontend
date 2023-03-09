export interface IAuthToken {
  accessToken: string;
  refreshToken: string;
  iat: number;
  exp: number;
}
