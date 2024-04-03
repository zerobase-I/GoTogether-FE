import React, { useState } from 'react';
import PostItem from './PostItem';
import Loading from './Loading';
import Pagination from 'react-js-pagination';
import '../styles/pagination.css';
import { useQuery } from '@tanstack/react-query';
import { getPosts } from '../api/postApi';

const PostBox = ({ searchInput, onSearchClick }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const postPerPage = 5; //한 페이지에서 보여줄 post 개수
  const [filteredResults, setFilteredResults] = useState([]);

  console.log(searchInput);

  //쿼리 키는 가져오는 데이터를 고유하게 설명하므로
  //쿼리 함수에서 사용하는 변경되는 모든 변수를 포함해야 한다.
  const {
    data: postsData,
    error,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ['posts', currentPage - 1, postPerPage],
    queryFn: () => getPosts(currentPage - 1, postPerPage),
    keepPreviousData: true,
  });

  if (isLoading) return <Loading />;
  if (isError) return <p>{error.message}</p>;

  const handlePageChange = (currentPage) => {
    setCurrentPage(currentPage);
  };

  const filterData =
    postsData &&
    postsData.content.filter((data) => {
      return data.title.toLowerCase().includes(searchInput.toLowerCase());
    });

  console.log(postsData);
  console.log(filterData);

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
