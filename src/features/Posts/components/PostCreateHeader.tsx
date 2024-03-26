import { Button } from '@/components/ui/button';
import { IPostCreateHeader } from '@/types/postCreate';
import { CloseOutline, LeftOutline } from 'antd-mobile-icons';
import { MouseEvent, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

const PostCreateHeader = ({ step, setStep }: IPostCreateHeader) => {
  const navigate = useNavigate();

  const setPrevious = useCallback(() => {
    setStep(step - 1);
  }, [step]);

  const setNext = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      setStep(step + 1);
    },
    [step],
  );

  return (
    <div
      className={`border-b-primary-foreground/30 sticky top-auto flex w-full flex-row items-center justify-between gap-2 border p-6`}
    >
      {step === 0 ? (
        <CloseOutline fontSize={20} onClick={() => navigate(-1)} />
      ) : (
        <LeftOutline fontSize={20} onClick={setPrevious} />
      )}

      <p className="pl-2 text-xl font-bold">새 게시물</p>
      {step < 2 ? (
        <Button
          type="button"
          onClick={setNext}
          variant="textOnly"
          size="textOnly"
          className="text-md font-bold"
        >
          Next
        </Button>
      ) : (
        <Button
          type="submit"
          variant="textOnly"
          size="textOnly"
          className="text-base font-bold text-accent"
        >
          등록
        </Button>
      )}
    </div>
  );
};

export default PostCreateHeader;
