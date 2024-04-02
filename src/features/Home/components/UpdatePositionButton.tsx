import { LocationUpdateBtn } from '@/components/Icon';

const UpdatePositionButton = ({
  renewLocation,
  setCenter,
}: {
  renewLocation: () => void;
  setCenter: () => void;
}) => {
  return (
    <button
      onClick={() => {
        renewLocation();
        setCenter();
      }}
      className="absolute bottom-[70px] right-3 z-[3]"
    >
      <LocationUpdateBtn className="size-[50px]" />
    </button>
  );
};

export default UpdatePositionButton;
