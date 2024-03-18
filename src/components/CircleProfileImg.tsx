interface ICircleProfileImg {
  profileImgUrl: string;
  size: string;
}

const CircleProfileImg = ({ profileImgUrl, size }: ICircleProfileImg) => {
  return (
    <div className={`${size} overflow-hidden rounded-full`}>
      <img src={profileImgUrl} className="w-full" />
    </div>
  );
};

export default CircleProfileImg;
