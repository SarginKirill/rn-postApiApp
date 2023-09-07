import { useEffect, useState } from 'react';
import { IPost } from '../Common/Types';

type PostResponse = {
  articles: IPost[];
};

export const usePostList = () => {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<null>(null);
  const [offset, setOffset] = useState(0);

  const fetchData = () => {
    setLoading(true);
    fetch(`https://api.realworld.io/api/articles?offset=${offset}`)
      .then((res) => res.json())
      .then((data: PostResponse) =>
        setPosts((prev) => [...prev, ...data.articles])
      )
      .catch((e) => setError(e))
      .finally(() => {
        setOffset((prev) => prev + 10);
        setLoading(false);
      });
  };

  const reload = () => {
    setPosts([]);
    setOffset(0);
    setLoading(true);
  };

  useEffect(() => {
    if (loading && offset === 0) {
      setError(null);
      fetchData();
    }
  }, [loading]);

  return {
    posts,
    loading,
    error,
    fetchData,
    reload,
  };
};
