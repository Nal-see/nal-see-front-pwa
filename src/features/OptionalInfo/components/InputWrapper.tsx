import { ReactNode } from 'react';

interface InputWrapperProps {
  children: ReactNode;
  title: string;
}

const InputWrapper = ({ children, title }: InputWrapperProps) => {
  return (
    <div className="border-t-primary-foreground/90 flex w-full flex-row items-center gap-6 border-t py-3">
      <div className="w-[50px] text-nowrap pl-3 text-lg font-semibold">
        {title}
      </div>
      {children}
    </div>
  );
};

export default InputWrapper;
