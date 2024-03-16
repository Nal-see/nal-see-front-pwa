export const formatDate = (dateString: string): string => {
  const uploadDate = new Date(dateString);
  const currentDate = new Date();
  const timeDiff = currentDate.getTime() - uploadDate.getTime();

  const seconds = Math.floor(timeDiff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days >= 30) {
    return '한 달 전';
  } else if (days >= 7) {
    return '일주일 전';
  } else if (days > 0) {
    return `${days}일 전`;
  } else if (hours > 0) {
    return `${hours}시간 전`;
  } else if (minutes > 0) {
    return `${minutes}분 전`;
  } else {
    return '방금 전';
  }
};
