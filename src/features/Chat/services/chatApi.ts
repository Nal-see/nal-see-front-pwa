import axios from 'axios';

export const getChatList = async () => {
  const response = await axios.get(`https://nalsee.site:8090/chats`, {
    withCredentials: true,
  });

  return response.data;
};

export const getChatMesg = async (chatId: string) => {
  const response = await axios.get(`https://nalsee.site:8090/chats/${chatId}`, {
    withCredentials: true,
  });
  return response.data;
};
