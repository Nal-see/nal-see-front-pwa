type FeedItemProps = {
  postId: string;
  image: string;
};

const FeedItem = ({ item }: { item: FeedItemProps }) => {
  return (
    <div key={item.postId}>
      <img src={item.image} alt="user" />
    </div>
  );
};

export default FeedItem;
