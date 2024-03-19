const contents = [
  'hello',
  'world',
  'this is a comment',
  'I like this post',
  'I don’t care about this postI don’t care about this postI don’t care about this postI don’t care about this postI don’t care about this postI don’t care about this postI don’t care about this postI don’t care about this postI don’t care about this postI don’t care about this post',
  'I’m indifferent to this post',
];

const usernames = [
  'John',
  'Jane',
  'Doe',
  'Alice',
  'Bob',
  'Charlie',
  'David',
  'Eve',
  'Frank',
  'Grace',
];

export type Comment = {
  id: number;
  content: string;
  likeCNT: number;
  createDate: string;
  userId: number;
  userImage: string;
  username: string;
  postId: number;
  isLiked: boolean;
};

// Remove the existing declaration of comments: const comments: Comment[] = [];

const comments: Comment[] = [];

for (let i = 1; i <= 105; i++) {
  const comment: Comment = {
    id: i,
    content: contents[i % contents.length],
    likeCNT: 20,
    createDate: '2024-03-14T21:37:21.988414',
    userId: 1,
    userImage: 'https://placehold.co/92x62',
    username: usernames[i % usernames.length],
    postId: i,
    isLiked: i % 2 === 0 ? true : false,
  };
  comments.push(comment);
}

export default comments;
