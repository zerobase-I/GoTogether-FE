import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import {
  createPost,
  deletePost,
  getKeywordFilterPost,
  getPosts,
  updatePost,
} from '../../api/postApi';

const usePosts = () => {
  const queryClient = useQueryClient();

  //게시글 생성하기
  const createPostMutation = useMutation({
    mutationFn: (inputs) => createPost(inputs),
    onSuccess: (currentPage, postPerPage) =>
      queryClient.invalidateQueries(['posts', currentPage, postPerPage]),
  });

  // 게시글 수정하기
  const UpdatePostMutation = useMutation({
    mutationFn: (inputs, postId) => updatePost(inputs, postId),
    onSuccess: (currentPage, postPerPage) =>
      queryClient.invalidateQueries(['posts', currentPage, postPerPage]),
  });

  // 게시글 삭제하기
  const deletePostMutation = useMutation({
    mutationFn: (postId) => deletePost(postId),
    onSuccess: (currentPage, postPerPage) =>
      queryClient.invalidateQueries(['posts', currentPage, postPerPage]),
  });

  return {
    createPostMutation,
    UpdatePostMutation,
    deletePostMutation,
  };
};

// 모든 게시물 가져오기
export const useGetPostQuery = (currentPage, postPerPage) => {
  const getPostQuery = useQuery({
    queryKey: ['posts', currentPage, postPerPage],
    queryFn: () => getPosts(currentPage, postPerPage),
    keepPreviousData: true,
  });

  return { getPostQuery };
};

// 필터링 쿼리
//isTrueFilter 는 조건부 호출을 위한 인수
export const useFilterPosts = (filterInputs, page, size, isTrueFilter) => {
  const filterPosts = useQuery({
    queryKey: ['filterPost', filterInputs],
    queryFn: () => getKeywordFilterPost(filterInputs, page, size),
    enabled: !!isTrueFilter,
  });

  return { filterPosts };
};

export default usePosts;
