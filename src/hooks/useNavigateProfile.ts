import { useNavigate } from 'react-router-dom';

export const useNavigateProfile = (userId: number | string) => {
  const navigate = useNavigate();

  return navigate(`/user/${userId}`);
};
