import { useMutation, useQueries, useQueryClient } from '@tanstack/react-query';

import {
  createPost,
  deletePost,
  getPostDetail,
  updatePost,
} from '../../api/postApi';

const usePosts = () => {
  const queryClient = useQueryClient();

  //게시글 불러오기 -> 페이지네이션으로 구현
  /*   const postDetailQuery = useQueries({
    queryKey: ['posts'],
    queryFn: (postId) => getPostDetail(postId),
  }); */

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
    // postDetailQuery,
  };
};

export default usePosts;
