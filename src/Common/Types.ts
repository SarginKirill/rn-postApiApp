export interface IPost {
  slug: string;
  title: string;
  description: string;
  body: string;
  tagList: string[];
  createdAt: string;
  favoritesCount: number;
  author: IAuthor;
}

export interface IAuthor {
  username: string;
  image: string;
}
