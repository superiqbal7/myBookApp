export interface IBook {
  id?: number;
  title?: string;
  author?: string;
  image?: string;
  seller?: string;
  isbn?: string;
  rating?: number;
  genre?: string;
  userId?: string;
}
export interface credential {
  username: string;
  password: string;
}
export interface IUser extends credential {
  userId: string;
}
