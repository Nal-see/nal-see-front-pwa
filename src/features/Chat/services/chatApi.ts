import axios from 'axios';

export const getChatList = async () => {
  const response = await axios.get(
    `${import.meta.env.VITE_API_BASE_URL}:8090/chats`,
    {
      withCredentials: true,
    },
  );

  return response.data;
};

export const getChatMesg = async (chatId: string) => {
  const response = await axios.get(
    `${import.meta.env.VITE_API_BASE_URL}:8090/chats/${chatId}`,
    {
      withCredentials: true,
    },
  );
  return response.data;
};

export const exitChat = async (chatId: string) => {
  const response = await axios.post(
    `${import.meta.env.VITE_API_BASE_URL}:8090/exit-room?chatId=${chatId}`,
    null,
    {
      withCredentials: true,
    },
  );
  return response.data;
};
