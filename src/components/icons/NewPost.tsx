import { SVGProps } from 'react';

interface SvgNewPostProps extends SVGProps<SVGSVGElement> {
  mainColor: string;
  subColor: string;
}

const SvgNewPost = ({ mainColor, subColor, ...props }: SvgNewPostProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <path
      fill={mainColor}
      d="M3 4v16a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2"
    />
    <path
      stroke={subColor}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.25}
      d="M12 8v8M8 12h8"
    />
  </svg>
);
export default SvgNewPost;
