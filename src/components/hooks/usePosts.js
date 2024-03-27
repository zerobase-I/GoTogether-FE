import { useMutation, useQueryClient } from '@tanstack/react-query';

import { createPost, deletePost, updatePost } from '../../api/postApi';

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

export default usePosts;
