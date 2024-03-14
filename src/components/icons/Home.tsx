import { SVGProps } from 'react';

interface SvgHomeProps extends SVGProps<SVGSVGElement> {
  mainColor: string;
}

const SvgHome = ({ mainColor, ...props }: SvgHomeProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <path
      fill={mainColor}
      stroke={mainColor}
      strokeWidth={1.25}
      d="m2.766 10.188 9-7.2a.375.375 0 0 1 .468 0l9 7.2c.09.071.141.179.141.293V21a.375.375 0 0 1-.375.375h-4.5a.375.375 0 0 1-.375-.375v-6c0-.898-.727-1.625-1.625-1.625h-5c-.897 0-1.625.727-1.625 1.625v6a.375.375 0 0 1-.375.375H3A.375.375 0 0 1 2.625 21V10.48c0-.113.052-.221.14-.292Z"
    />
  </svg>
);
export default SvgHome;
