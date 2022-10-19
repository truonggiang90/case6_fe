import {BlogDTO} from "./blogDTO";

export  interface BlogRecentlyPerCategory{
  category?:String,
  blogs?:BlogDTO[]
}
