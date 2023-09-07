import { useEffect, useState } from 'react';
import { IPost } from '../Common/Types';

type PostResponse = {
  articles: IPost[];
};

export type FilterParams = {
  type: 'author' | 'tag';
  action: string;
};

export const usePostList = () => {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<null>(null);
  const [offset, setOffset] = useState(0);
  const [filters, setFilters] = useState<FilterParams | null>(null);

  const fetchData = (filters?: FilterParams | null) => {
    fetch(
      `https://api.realworld.io/api/articles?${filters?.type}=${filters?.action}&offset=${offset}`
    )
      .then((res) => res.json())
      .then((data: PostResponse) => {
        setPosts((prev) => [...prev, ...data.articles]);
      })
      .catch((e) => setError(e))
      .finally(() => {
        setLoading(false);
      });
  };

  const reload = () => {
    setPosts([]);
    setOffset(0);
    setLoading(true);
    setFilters(null);
  };

  const getMoreData = () => {
    setOffset((prev) => prev + 10);

    setLoading(true);
    fetchData(filters);
  };

  const addFilters = (filters: FilterParams) => {
    setFilters(filters);
    setPosts([]);
    setOffset(0);
    setLoading(true);
  };

  useEffect(() => {
    if (loading && offset === 0) {
      setError(null);
      fetchData(filters);
    }
  }, [loading, filters]);

  return {
    posts,
    loading,
    error,
    fetchData,
    reload,
    addFilters,
    filters,
    getMoreData,
  };
};
