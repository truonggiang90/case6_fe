export interface CommentDTO {
  id?:number|null,
  content?:string|null,
  createAt?:string|null,
  username?:string|null,
  avatar?:string|null,
  idUserInfo?:number|null,
  idBlog?:number|null,
  idCommentParent?:number|null
}
