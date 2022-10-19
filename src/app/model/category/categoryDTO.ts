import {TagDTO} from "../tag/tagDTO";

export interface CategoryDTO {
  id?: number|null,
  name?: string|null,
  description?: string|null,
  picture?: string|null,
  tagDTO?: TagDTO[]|null,
  countBlog?: number|null
}
