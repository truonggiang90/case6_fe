import {UserStatus} from "./userStatus";
import {User} from "./user";

export interface UserInfo {
  id: number,
  name: string,
  email: string,
  avatar: string,
  about: string,
  birthday: string,
  registerDate : Date,
  user: User,
  userStatus: UserStatus,
}
