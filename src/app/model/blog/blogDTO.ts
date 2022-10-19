
import {TagDTO} from "../tag/tagDTO";

export interface BlogDTO{
  id?: number|null,
  username?: string|null,
  avatar?:string|null,
  categoryId?: number|null,
  title?: string|null,
  describes?: string|null,
  content?: string|null,
  picture?: string|null,
  createAt?: string|null,
  status?: string|null,
  countLike?: number|null,
  countComment?:number|null,
  updateAt?: string|null,
  categoryName?: string|null,
  tag?: TagDTO[]|null
}
