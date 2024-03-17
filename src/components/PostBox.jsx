import React from 'react';
import PostItem from './PostItem';
import usePosts from './hooks/usePosts';
import Loading from './Loading';

const PostBox = () => {
  const {
    postQuery: { isLoading, error, data: postsData },
  } = usePosts();

  console.log(postsData && postsData.reverse());
  console.log(postsData && postsData);
  return (
    <article className="mb-20">
      {isLoading && <Loading />}
      {error && <p>{error.message}</p>}
      {postsData &&
        postsData
          .reverse()
          .map((data) => <PostItem key={data.id} post={data} />)}
    </article>
  );
};

export default PostBox;
