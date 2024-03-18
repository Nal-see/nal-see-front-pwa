import { LeftOutline } from 'antd-mobile-icons';
import { useNavigate } from 'react-router-dom';

const PostCreateHeader = () => {
  const navigate = useNavigate();

  return (
    <div
      className={`sticky top-auto flex w-full flex-row items-center justify-between gap-2 p-6 pt-16`}
    >
      <LeftOutline fontSize={24} onClick={() => navigate(-1)} />
      <p className="text-xl font-bold">새 게시물</p>
      <button>Next</button>
    </div>
  );
};

export default PostCreateHeader;
