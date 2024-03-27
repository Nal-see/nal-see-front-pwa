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

export const formatLikeCnt = (likeCnt: number): string => {
  if (likeCnt >= 1000) {
    return `${Math.floor(likeCnt / 1000)}k`;
  } else {
    return likeCnt.toString();
  }
};

// Thunderstorm
// Rain
// Snow
// Fog
// Clear
// Clouds
// 구름많음
// https://lottie.host/dec32a22-f774-4c1b-a864-4dc6848833a7/WlHOBzXf7n.json
// 안개
// https://lottie.host/003c7109-8bfa-4854-bbe4-6330d780c3de/ujOoPsrbWM.json
// 비
//https://lottie.host/808efd18-5a89-45fc-9c55-6ed2a13c19d7/Tb3oLEqrhf.json
// 해
// https://lottie.host/9c939ea7-1110-4fe6-ade9-36692a7f453c/YT7og5PEHG.json
// 눈
// https://lottie.host/113abfc6-7a59-4ace-99dd-2e31f9864a48/AGJk7dM9Is.json
// 번개
// https://lottie.host/fdf3ae81-f4cf-446b-a6fc-69075a7409b0/nz0FAe1vat.json

export const formatWeatherToIcon = (weather: string): string => {
  switch (weather) {
    case 'Thunderstorm':
      return 'https://lottie.host/fdf3ae81-f4cf-446b-a6fc-69075a7409b0/nz0FAe1vat.json';
    case 'Rain':
      return 'https://lottie.host/808efd18-5a89-45fc-9c55-6ed2a13c19d7/Tb3oLEqrhf.json';
    case 'Snow':
      return 'https://lottie.host/113abfc6-7a59-4ace-99dd-2e31f9864a48/AGJk7dM9Is.json';
    case 'Fog':
      return 'https://lottie.host/003c7109-8bfa-4854-bbe4-6330d780c3de/ujOoPsrbWM.json';
    case 'Clear':
      return 'https://lottie.host/9c939ea7-1110-4fe6-ade9-36692a7f453c/YT7og5PEHG.json';
    case 'Clouds':
      return 'https://lottie.host/dec32a22-f774-4c1b-a864-4dc6848833a7/WlHOBzXf7n.json';
    default:
      return '';
  }
};

export const formatWeatherToImage = (weather: string): string => {
  switch (weather) {
    case 'Thunderstorm':
      return '/public/weatherImage/thunder.png';
    case 'Rain':
      return '/public/weatherImage/rain.png';
    case 'Snow':
      return '/public/weatherImage/snow.png';
    case 'Fog':
      return '/public/weatherImage/fog.png';
    case 'Clear':
      return '/public/weatherImage/clear.png';
    case 'Clouds':
      return '/public/weatherImage/cloud.png';
    default:
      return '';
  }
};

const weatherSelector = (weather: string) => {
  // ['Thunderstorm', 'Rain', 'Snow', 'Fog', 'Clear', 'Clouds']
  if (weather === 'Thunderstorm') {
    return '번개';
  }
  if (weather === 'Rain') {
    return '비';
  }
  if (weather === 'Snow') {
    return '눈';
  }
  if (weather === 'Fog') {
    return '안개';
  }
  if (weather === 'Clear') {
    return '맑음';
  }
  if (weather === 'Clouds') {
    return '흐림';
  }
};

export { weatherSelector };
