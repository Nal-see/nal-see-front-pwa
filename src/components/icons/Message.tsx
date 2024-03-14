import { SVGProps } from 'react';

interface SvgMessageProps extends SVGProps<SVGSVGElement> {
  mainColor: string;
  subColor: string;
}

const SvgMessage = ({ mainColor, subColor, ...props }: SvgMessageProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <rect width={15} height={10} x={2} y={3.512} fill={subColor} rx={5} />
    <path
      fill={mainColor}
      fillRule="evenodd"
      d="M7 14.512a5 5 0 0 1 5-5h5a5 5 0 0 1 3.484 8.587c.257.837.734 1.5 1.146 1.992.14.166.025.415-.19.395-1.209-.111-2.28-.571-3.157-1.14q-.617.165-1.283.166h-5a5 5 0 0 1-5-5m8.5 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0m3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2m-7-1a1 1 0 1 1-2 0 1 1 0 0 1 2 0"
      clipRule="evenodd"
    />
  </svg>
);
export default SvgMessage;
