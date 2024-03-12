import React from 'react';
import PostItem from './PostItem';
import { useQuery } from '@tanstack/react-query';
import { getPosts } from '../api/postApi';

const PostBox = () => {
  const {
    isLoading,
    error,
    data: postsData,
  } = useQuery({
    queryKey: ['posts'],
    queryFn: getPosts,
  });

  return (
    <article className="mb-20">
      {isLoading && <p>Loading 중 입니다.</p>}
      {error && <p>{error.message}</p>}
      {postsData &&
        postsData.map((data) => <PostItem key={data.id} post={data} />)}
    </article>
  );
};

export default PostBox;
