import { useEffect, useState } from 'react';
import { IAuthor } from '../Common/Types';

type CommentType = {
  author: IAuthor;
  body: string;
  createdAt: string;
};

type Response = {
  comments: CommentType[];
};

export const usePostComments = (slug: string) => {
  const [comments, setComments] = useState<CommentType[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchComments = () => {
    fetch(`https://api.realworld.io/api/articles/${slug}/comments`)
      .then((res) => res.json())
      .then((data: Response) => {
        console.log('DATA', data);
        setComments(data.comments);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (loading) {
      fetchComments();
    }
  }, [loading]);

  return {
    comments,
  };
};
