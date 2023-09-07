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

interface IAuthor {
  username: string;
  image: string;
}
