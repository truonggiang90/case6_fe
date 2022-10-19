import {Role} from "./role";

export interface User{
  id?: number,
  token?:string,
  type?:string,
  username?:string
  roles?:Role[]
}
