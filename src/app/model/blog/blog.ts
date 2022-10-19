import {UserInfo} from "../user/userInfo";
import {BlogStatus} from "./blog-status";
import {Category} from "../category/category";

export interface Blog{
  id:number,
  category:Category,
  title:String,
  describes:String,
  content:String,
  picture:String,
  createAt:Date,
  blogStatus:BlogStatus,
  userInfo:UserInfo,
  countLike:number,
  countComment:number
}
