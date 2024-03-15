import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { createPost, deletePost, getPosts } from '../../api/postApi';

const usePosts = () => {
  const queryClient = useQueryClient();

  const postQuery = useQuery({
    queryKey: ['posts'],
    queryFn: getPosts,
  });

  const createUpdatePostMutation = useMutation({
    mutationFn: (inputs) => createPost(inputs),
    onSuccess: () => queryClient.invalidateQueries(['posts']),
  });

  const deletePostMutation = useMutation({
    mutationFn: (postId) => deletePost(postId),
    onSuccess: () => queryClient.invalidateQueries(['posts']),
  });

  return { postQuery, createUpdatePostMutation, deletePostMutation };
};

export default usePosts;
