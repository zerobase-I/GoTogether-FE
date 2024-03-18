import React, { useState } from 'react';
import PostItem from './PostItem';
import usePosts from './hooks/usePosts';
import Loading from './Loading';
import Pagination from 'react-js-pagination';
import '../styles/pagination.css';

const PostBox = () => {
  const [page, setPage] = useState(1);

  const {
    postQuery: { isLoading, error, data: postsData },
  } = usePosts();

  const handlePageChange = (page) => {
    setPage(page);
  };

  return (
    <article className="mb-20">
      {isLoading && <Loading />}
      {error && <p>{error.message}</p>}
      {postsData &&
        postsData
          .map((data) => <PostItem key={data.id} post={data} />)
          .reverse()}
      <Pagination
        activePage={page} // 현재 페이지
        itemsCountPerPage={5} // 한 페이지에서 보여줄 post 개수
        totalItemsCount={300} // 총 post 개수
        pageRangeDisplayed={5} // paginator의 페이지 범위
        prevPageText={'<'}
        nextPageText={'>'}
        firstPageText="<<"
        lastPageText=">>"
        onChange={handlePageChange}
      ></Pagination>
    </article>
  );
};

export default PostBox;
