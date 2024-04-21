import FeedList from './components/FeedList';
import Navbar from '../../components/NalSeeNavbar';

const FeedListPage = () => {
  console.log('FeedListPage');
  return (
    <div className="flex w-dvw flex-col items-center sm:w-[400px]">
      <Navbar />
      <FeedList />
    </div>
  );
};

export default FeedListPage;
