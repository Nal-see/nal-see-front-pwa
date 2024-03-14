import axios from 'axios';

export const getFeedList = async () => {
  const response = await axios.get('/feed');
  return response.data;
};
