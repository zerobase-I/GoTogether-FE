import React, { useState } from 'react';
import PostItem from './PostItem';
import Loading from './Loading';
import Pagination from 'react-js-pagination';
import '../styles/pagination.css';
import { useQuery } from '@tanstack/react-query';
import { getPosts } from '../api/postApi';

const PostBox = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const postPerPage = 5; //한 페이지에서 보여줄 post 개수

  /*   const {
    postQuery: { isLoading, error, data: postsData },
  } = usePosts(currentPage, postPerPage); */

  const {
    data: postsData,
    error,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ['posts', currentPage - 1],
    queryFn: () => getPosts(currentPage - 1, postPerPage),
    keepPreviousData: true,
  });

  if (isLoading) return <Loading />;
  if (isError) return <p>{error.message}</p>;
  console.log(postsData);

  const handlePageChange = (currentPage) => {
    setCurrentPage(currentPage);
  };

  return (
    <article className="mb-20">
      {postsData ? (
        postsData.content.map((data) => <PostItem key={data.id} post={data} />)
      ) : (
        <p>게시물이 존재하지 않습니다.</p>
      )}

      <Pagination
        activePage={currentPage} // 현재 페이지
        itemsCountPerPage={postPerPage} // 한 페이지에서 보여줄 post 개수
        totalItemsCount={postsData && postsData.totalElements} // 총 post 개수
        pageRangeDisplayed={postsData && postsData.totalPages} // paginator의 페이지 범위
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
