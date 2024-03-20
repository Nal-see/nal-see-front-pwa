import PostCreateHeader from './components/PostCreateHeader';

const PostCreatePage = () => {
  return (
    <div className="flex-1">
      <PostCreateHeader />
      <div className="h-[calc(100dvh-156px)] overflow-y-scroll scrollbar-hide">
        <p>Post Create Page</p>
      </div>
    </div>
  );
};

export default PostCreatePage;
