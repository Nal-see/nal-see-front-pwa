export interface INotificationData {
  createAt: string;
  message: string;
  senderId: number;
  senderImage: string;
  senderName: string;
  postId: number | null;
  commentId: number | null;
  userId: number | null;
}
export interface INotificationItemProps {
  notification: INotificationData;
}
