import { IAuthToken } from "./IAuthToken";
import { IAuthUser } from "./IAuthUser";

export interface IAuthState {
  token: IAuthToken;
  user: IAuthUser;
}
