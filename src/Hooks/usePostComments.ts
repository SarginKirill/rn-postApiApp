import { useEffect, useState } from 'react';

export const usePostComments = (slug: string) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchComments = () => {
    fetch(`https://api.realworld.io/api/articles/${slug}/comments`)
      .then((res) => res.json())
      .then((data) => {
        console.log('DATA COMMENTS', data);
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
