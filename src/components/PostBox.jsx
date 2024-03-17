import React from 'react';
import PostItem from './PostItem';
import usePosts from './hooks/usePosts';
import Loading from './Loading';

const PostBox = () => {
  const {
    postQuery: { isLoading, error, data: postsData },
  } = usePosts();

  return (
    <article className="mb-20">
      {isLoading && <Loading />}
      {error && <p>{error.message}</p>}
      {postsData &&
        postsData
          .map((data) => <PostItem key={data.id} post={data} />)
          .reverse()}
    </article>
  );
};

export default PostBox;
