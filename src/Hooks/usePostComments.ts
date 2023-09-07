import { useEffect, useState } from 'react';

type Response = {
  comments: [];
};

export const usePostComments = (slug: string) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchComments = () => {
    fetch(`https://api.realworld.io/api/articles/${slug}/comments`)
      .then((res) => res.json())
      .then((data: Response) => {
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
