export const formatDate = (date: Date | string): string => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  });
};

export const formatNotificationDate = (date: Date | string): string => {
  const givenDate = new Date(date).getTime() + 1000 * 60 * 60 * 9;
  const now = new Date().getTime();
  const diff = now - givenDate;

  const diffSeconds = Math.floor(diff / 1000);
  const diffMinutes = Math.floor(diff / (1000 * 60));
  const diffHours = Math.floor(diff / (1000 * 60 * 60));
  const diffDays = Math.floor(diff / (1000 * 60 * 60 * 24));

  if (diffSeconds < 60) {
    return `${diffSeconds}초 전`;
  } else if (diffMinutes < 60) {
    return `${diffMinutes}분 전`;
  } else if (diffHours < 24) {
    return `${diffHours}시간 전`;
  } else if (diffDays < 10) {
    return `${diffDays}일 전`;
  } else return new Date(date).toISOString().split('T')[0];
};

export const convertImgSrcToHTTPS = (url: string): string => {
  if (!url.startsWith('https')) {
    const convertedUrl = url.replace('http', 'https');

    return convertedUrl;
  }

  return url;
};
