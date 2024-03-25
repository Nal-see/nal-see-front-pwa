export const formatDate = (dateString: string): string => {
  const uploadDate = new Date(dateString);
  const currentDate = new Date();
  const timeDiff = currentDate.getTime() - uploadDate.getTime();

  const seconds = Math.floor(timeDiff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days >= 30) {
    return '한달전';
  } else if (days >= 7) {
    return '일주일전';
  } else if (days > 0) {
    return `${days}일전`;
  } else if (hours > 0) {
    return `${hours}시간전`;
  } else if (minutes > 0) {
    return `${minutes}분전`;
  } else {
    return '방금';
  }
};
