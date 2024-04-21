import { api } from '@/lib/api';

export async function getComments(postId: number): Promise<Comment[]> {
  const response = await api.get(`/api/posts/${postId}/comments`);
  console.log('response.data: ', response.data);
  return response.data.results;
}

export async function postComment(
  postId: number,
  content: string,
  userId: number,
): Promise<void> {
  if (!userId) throw new Error('User not found');
  const response = await api.post(`/api/posts/${postId}/comments`, {
    content,
    userId,
  });
  console.log('response.data: ', response.data);
}

export async function updateComment(
  postId: number,
  commentId: number,
  content: string,
  userId: number,
): Promise<void> {
  const response = await api.patch(
    `/api/posts/${postId}/comments/${commentId}`,
    {
      content,
      userId,
    },
  );
  console.log('response.data: ', response.data);
}

export async function deleteComment(
  postId: number,
  commentId: number,
): Promise<void> {
  const response = await api.delete(
    `/api/posts/${postId}/comments/${commentId}`,
  );
  console.log('response.data: ', response.data);
}

export async function addCommentLike(
  postId: number,
  commentId: number,
): Promise<void> {
  const response = await api.post(
    `/api/posts/${postId}/comment/${commentId}/likes`,
  );
  console.log('response.data: ', response.data);
}

export async function cancelCommentLike(
  postId: number,
  commentId: number,
): Promise<void> {
  const response = await api.post(
    `/api/posts/${postId}/comment/${commentId}/likes/cancel`,
  );
  console.log('response.data: ', response.data);
}
