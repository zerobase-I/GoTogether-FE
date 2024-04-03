import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { getMyPosts } from '../../api/postApi';
import Loading from '../Loading';
import PostItem from '../PostItem';
import '../../styles/pagination.css';
import Pagination from 'react-js-pagination';
import { useRecoilValue } from 'recoil';
import { UserInfoAtom } from '../../recoil/userInfoAtom';

const MyPostBox = () => {
  const userInfo = useRecoilValue(UserInfoAtom);
  const loginUserId = userInfo.id;
  const [currentPage, setCurrentPage] = useState(1);
  const postPerPage = 10; //한 페이지에서 보여줄 post 개수

  const {
    data: postsData,
    error,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ['myPosts', currentPage - 1],
    queryFn: () => getMyPosts(currentPage - 1, postPerPage, loginUserId),
    keepPreviousData: true,
  });

  if (isLoading) return <Loading />;
  if (isError) return <p>{error.message}</p>;
  console.log(postsData);

  /*   const handlePageChange = (currentPage) => {
    setCurrentPage(currentPage);
  }; */

  return (
    <article className="mb-20">
      {postsData ? (
        postsData.content.map((data) => <PostItem key={data.id} post={data} />)
      ) : (
        <p>게시물이 존재하지 않습니다.</p>
      )}

      {/*       <Pagination
        activePage={currentPage} // 현재 페이지
        itemsCountPerPage={postPerPage} // 한 페이지에서 보여줄 post 개수
        totalItemsCount={postsData && postsData.totalElements} // 총 post 개수
        pageRangeDisplayed={postsData && postsData.totalPages} // paginator의 페이지 범위
        prevPageText={'<'}
        nextPageText={'>'}
        firstPageText="<<"
        lastPageText=">>"
        onChange={handlePageChange}
      ></Pagination> */}
    </article>
  );
};

export default MyPostBox;
