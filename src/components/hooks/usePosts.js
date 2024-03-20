import { useMutation, useQueryClient } from '@tanstack/react-query';

import { createPost, deletePost, updatePost } from '../../api/postApi';

const usePosts = () => {
  const queryClient = useQueryClient();

  //게시글 불러오기 -> 페이지네이션으로 구현
  /*   const postQuery = useQuery({
    queryKey: ['posts'],
    queryFn: (page, size) => getPosts(page, size),
  });
 */
  //게시글 생성하기
  const createPostMutation = useMutation({
    mutationFn: (inputs) => createPost(inputs),
    onSuccess: () => queryClient.invalidateQueries(['posts']),
  });

  // 게시글 수정하기
  const UpdatePostMutation = useMutation({
    mutationFn: (inputs, postId) => updatePost(inputs, postId),
    onSuccess: () => queryClient.invalidateQueries(['posts']),
  });

  // 게시글 삭제하기
  const deletePostMutation = useMutation({
    mutationFn: (postId) => deletePost(postId),
    onSuccess: () => queryClient.invalidateQueries(['posts']),
  });

  return {
    createPostMutation,
    UpdatePostMutation,
    deletePostMutation,
  };
};

export default usePosts;
