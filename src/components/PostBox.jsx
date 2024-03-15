import React from 'react';
import PostItem from './PostItem';
import usePosts from './hooks/usePosts';

const PostBox = () => {
  const {
    postQuery: { isLoading, error, data: postsData },
  } = usePosts();

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
