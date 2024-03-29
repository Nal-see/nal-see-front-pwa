import { LocationUpdateBtn } from '@/components/Icon';

const UpdatePositionButton = ({
  renewLocation,
}: {
  renewLocation: () => void;
}) => {
  return (
    <button
      onClick={() => renewLocation()}
      className="absolute bottom-[70px] right-3 z-10"
    >
      <LocationUpdateBtn className="size-[50px]" />
    </button>
  );
};

export default UpdatePositionButton;
