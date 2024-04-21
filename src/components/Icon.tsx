import { cn } from '@/lib/utility';
import React from 'react';

interface IconProps {
  className?: string;
  isActive?: boolean;
  size?: number;
}

export const HomeIcon: React.FC<IconProps> = ({
  className,
  isActive,
  ...rest
}) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
      className={cn(className)}
    >
      <g id="Icon / Inbox">
        <path
          id="Vector 38"
          d="M2.76574 10.1878L11.7657 2.9878C11.9027 2.87823 12.0973 2.87823 12.2343 2.9878L21.2343 10.1878C21.3232 10.259 21.375 10.3667 21.375 10.4806V21C21.375 21.2071 21.2071 21.375 21 21.375H20H16.5C16.2929 21.375 16.125 21.2071 16.125 21V15C16.125 14.1025 15.3975 13.375 14.5 13.375H9.5C8.60254 13.375 7.875 14.1025 7.875 15V21C7.875 21.2071 7.70711 21.375 7.5 21.375H4.5H3C2.79289 21.375 2.625 21.2071 2.625 21V10.4806C2.625 10.3667 2.67678 10.259 2.76574 10.1878Z"
          fill={isActive ? 'var(--accent)' : 'var(--secondary)'}
          stroke={isActive ? 'var(--accent)' : 'var(--secondary)'}
          strokeWidth="1.25"
        />
      </g>
    </svg>
  );
};

export const FeedIcon: React.FC<IconProps> = ({
  className,
  isActive,
  ...rest
}) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
      className={cn(className)}
    >
      <path
        d="M3 4V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V4C21 2.89543 20.1046 2 19 2H5C3.89543 2 3 2.89543 3 4Z"
        fill={isActive ? 'var(--accent)' : 'var(--secondary)'}
      />
      <path
        d="M7 7H17"
        stroke="var(--secondary-foreground)"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7 17.0022H17"
        stroke="var(--secondary-foreground)"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7 12H17"
        stroke="var(--secondary-foreground)"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const CreatePostIcon: React.FC<IconProps> = ({
  className,
  isActive,
  ...rest
}) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
      className={cn(className)}
    >
      <path
        d="M3 4V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V4C21 2.89543 20.1046 2 19 2H5C3.89543 2 3 2.89543 3 4Z"
        fill={isActive ? 'var(--accent)' : 'var(--secondary)'}
      />
      <path
        d="M12 8L12 16"
        stroke="var(--secondary-foreground)"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8 12H16"
        stroke="var(--secondary-foreground)"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const ChatIcon: React.FC<IconProps> = ({
  className,
  isActive,
  ...rest
}) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
      className={cn(className)}
    >
      <rect
        x="2"
        y="3.51233"
        width="15"
        height="10"
        rx="5"
        fill={
          isActive ? 'var(--accent-foreground)' : 'var(--secondary-foreground)'
        }
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7 14.5123C7 11.7509 9.23858 9.51233 12 9.51233H17C19.7614 9.51233 22 11.7509 22 14.5123C22 15.9192 21.419 17.1903 20.4838 18.0988C20.7411 18.9357 21.2177 19.5997 21.6301 20.0908C21.7693 20.2565 21.6549 20.5064 21.4394 20.4864C20.231 20.3748 19.1609 19.9145 18.2832 19.3461C17.8737 19.4546 17.4436 19.5123 17 19.5123H12C9.23858 19.5123 7 17.2738 7 14.5123ZM15.5 14.5123C15.5 15.0646 15.0523 15.5123 14.5 15.5123C13.9477 15.5123 13.5 15.0646 13.5 14.5123C13.5 13.96 13.9477 13.5123 14.5 13.5123C15.0523 13.5123 15.5 13.96 15.5 14.5123ZM18.5 15.5123C19.0523 15.5123 19.5 15.0646 19.5 14.5123C19.5 13.96 19.0523 13.5123 18.5 13.5123C17.9477 13.5123 17.5 13.96 17.5 14.5123C17.5 15.0646 17.9477 15.5123 18.5 15.5123ZM11.5 14.5123C11.5 15.0646 11.0523 15.5123 10.5 15.5123C9.94772 15.5123 9.5 15.0646 9.5 14.5123C9.5 13.96 9.94772 13.5123 10.5 13.5123C11.0523 13.5123 11.5 13.96 11.5 14.5123Z"
        fill={isActive ? 'var(--accent)' : 'var(--secondary)'}
      />
    </svg>
  );
};

export const MypageIcon: React.FC<IconProps> = ({
  className,
  isActive,
  ...rest
}) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
      className={cn(className)}
    >
      <path
        d="M9.5249 15.9395L10.1344 13.5324L11.963 12.2249L13.7916 13.5324L14.4012 15.9395C13.1452 17.4895 10.7808 17.4895 9.5249 15.9395Z"
        fill={
          isActive ? 'var(--accent-foreground)' : 'var(--secondary-foreground)'
        }
      />
      <path
        d="M7.06327 9.21582C5.23475 4.40156 9.11366 1.61011 11.8743 2.16677C13.9702 1.7041 15.4403 2.19017 16.6916 3.79978C17.9429 5.40939 17.3011 8.01227 16.6916 9.21582C14.6325 9.29235 14.1733 8.07603 13.6827 7.41048C12.2384 9.81761 8.45964 9.58512 7.06327 9.21582Z"
        fill={isActive ? 'var(--accent)' : 'var(--secondary)'}
      />
      <path
        d="M11.9776 14.7048C8.17229 14.7048 7.61731 10.6929 7.81551 8.68694C9.0047 8.88753 11.7399 8.80729 13.1669 6.88159C13.7614 7.48337 15.1884 8.68694 16.1398 8.68694C16.3379 10.6929 15.7829 14.7048 11.9776 14.7048Z"
        fill={
          isActive ? 'var(--accent-foreground)' : 'var(--secondary-foreground)'
        }
      />
      <path
        d="M7.15352 9.10704C7.40775 9.01074 7.68053 8.97211 7.95181 8.99399L8.42498 12.4906C8.1691 12.5826 7.89569 12.6165 7.62484 12.59C7.35398 12.5635 7.09256 12.4771 6.8598 12.3373C6.62703 12.1976 6.42882 12.0079 6.27975 11.7822C6.13067 11.5565 6.03452 11.3007 5.99834 11.0333C5.96217 10.766 5.98689 10.4941 6.07071 10.2374C6.15452 9.98084 6.29529 9.7461 6.48267 9.55049C6.67005 9.35487 6.89928 9.20334 7.15352 9.10704Z"
        fill={
          isActive ? 'var(--accent-foreground)' : 'var(--secondary-foreground)'
        }
      />
      <path
        d="M16.8467 9.10704C16.5924 9.01074 16.3196 8.97211 16.0484 8.99399L15.5752 12.4906C15.8311 12.5826 16.1045 12.6165 16.3753 12.59C16.6462 12.5635 16.9076 12.4771 17.1404 12.3373C17.3731 12.1976 17.5714 12.0079 17.7204 11.7822C17.8695 11.5565 17.9657 11.3007 18.0018 11.0333C18.038 10.766 18.0133 10.4941 17.9295 10.2374C17.8457 9.98084 17.7049 9.7461 17.5175 9.55049C17.3301 9.35487 17.1009 9.20334 16.8467 9.10704Z"
        fill={
          isActive ? 'var(--accent-foreground)' : 'var(--secondary-foreground)'
        }
      />
      <path
        d="M4 18.8496V20.486C4 21.3222 4.67157 22 5.5 22H12V16.9534C10.6326 16.9534 9.89824 16.0934 9.60956 15.6333C9.54186 15.5254 9.41036 15.4718 9.29124 15.5149L5.32533 16.9493C4.53038 17.2368 4 17.9973 4 18.8496Z"
        fill={isActive ? 'var(--accent)' : 'var(--secondary)'}
      />
      <path
        d="M20 18.8496V20.486C20 21.3222 19.3284 22 18.5 22L12 22V16.9534C13.3674 16.9534 14.1018 16.0934 14.3904 15.6333C14.4581 15.5254 14.5896 15.4718 14.7088 15.5149L18.6747 16.9493C19.4696 17.2368 20 17.9973 20 18.8496Z"
        fill={isActive ? 'var(--accent)' : 'var(--secondary)'}
      />
    </svg>
  );
};

export const KakaoIcon: React.FC<IconProps> = () => {
  return (
    <svg
      width="20"
      height="18"
      viewBox="0 0 20 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <rect width="19.0312" height="18" fill="url(#pattern0)" />
      <defs>
        <pattern
          id="pattern0"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use
            xlinkHref="#image0_201_1458"
            transform="scale(0.00492611 0.00520833)"
          />
        </pattern>
        <image
          id="image0_201_1458"
          width="203"
          height="192"
          xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMsAAADACAYAAACqPJfwAAAACXBIWXMAAEzlAABM5QF1zvCVAAAGMWlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgOS4xLWMwMDIgNzkuZjM1NGVmYywgMjAyMy8xMS8wOS0xMjo0MDoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iIHhtbG5zOnBob3Rvc2hvcD0iaHR0cDovL25zLmFkb2JlLmNvbS9waG90b3Nob3AvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0RXZ0PSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VFdmVudCMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDI1LjUgKFdpbmRvd3MpIiB4bXA6Q3JlYXRlRGF0ZT0iMjAyNC0wMy0wMVQxODo1NzoxNCswOTowMCIgeG1wOk1vZGlmeURhdGU9IjIwMjQtMDMtMDFUMTg6NTg6MTUrMDk6MDAiIHhtcDpNZXRhZGF0YURhdGU9IjIwMjQtMDMtMDFUMTg6NTg6MTUrMDk6MDAiIGRjOmZvcm1hdD0iaW1hZ2UvcG5nIiBwaG90b3Nob3A6Q29sb3JNb2RlPSIzIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOmJjZmQ0MDA5LTc3ZGMtYTg0NS1iYTViLTdlMzBhMThkZTliMCIgeG1wTU06RG9jdW1lbnRJRD0iYWRvYmU6ZG9jaWQ6cGhvdG9zaG9wOmVmMGQwNjUzLTQ3NGMtNDQ0Ny05ZDI0LTk4MjY3N2QyMjRkMiIgeG1wTU06T3JpZ2luYWxEb2N1bWVudElEPSJ4bXAuZGlkOjJhNmI2NTNmLWNjYzctMWI0OC1iZTAyLWE4OGVkYjc3ZjEyYSI+IDx4bXBNTTpIaXN0b3J5PiA8cmRmOlNlcT4gPHJkZjpsaSBzdEV2dDphY3Rpb249ImNyZWF0ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6MmE2YjY1M2YtY2NjNy0xYjQ4LWJlMDItYTg4ZWRiNzdmMTJhIiBzdEV2dDp3aGVuPSIyMDI0LTAzLTAxVDE4OjU3OjE0KzA5OjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgMjUuNSAoV2luZG93cykiLz4gPHJkZjpsaSBzdEV2dDphY3Rpb249ImNvbnZlcnRlZCIgc3RFdnQ6cGFyYW1ldGVycz0iZnJvbSBhcHBsaWNhdGlvbi92bmQuYWRvYmUucGhvdG9zaG9wIHRvIGltYWdlL3BuZyIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6YmNmZDQwMDktNzdkYy1hODQ1LWJhNWItN2UzMGExOGRlOWIwIiBzdEV2dDp3aGVuPSIyMDI0LTAzLTAxVDE4OjU4OjE1KzA5OjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgMjUuNSAoV2luZG93cykiIHN0RXZ0OmNoYW5nZWQ9Ii8iLz4gPC9yZGY6U2VxPiA8L3htcE1NOkhpc3Rvcnk+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+MwM9lgAASRNJREFUeJztvWezJNeZ3/lLn1ne3dvdhCUMvTiGQ0k0osZohjPSShtahSI2FNILfal9tV9gYyNmVyuNocghCYIcgkMANBgQJDwb3UB3X3+rKr3ZF+eczFN5qxsNoD3yH5G3supWZWZlnf95/HOM8jIPBAxD7piAIbf2c6P1P4UKKIFCbFUOeQGZfMwz+VhAnkMh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"
        />
      </defs>
    </svg>
  );
};

export const NotificationIcon: React.FC<IconProps> = ({
  className,
  ...rest
}) => {
  return (
    <svg
      width="38"
      height="38"
      viewBox="0 0 38 38"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
      className={cn(className)}
    >
      <g filter="url(#filter0_d_201_3580)">
        <rect
          x="3"
          y="3"
          width="32"
          height="32"
          rx="16"
          fill="white"
          shapeRendering="crispEdges"
        />
        <g clipPath="url(#clip0_201_3580)">
          <path
            d="M19.4167 11.5191C18.0278 11.395 14.8333 11.817 13.1667 14.4976C11.0833 17.8483 13.1667 24.9221 10.25 25.6667H19.4167"
            stroke="#909396"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
          <path
            d="M18.5833 11.5191C19.9722 11.395 23.1667 11.817 24.8333 14.4976C26.9167 17.8483 24.8333 24.9221 27.75 25.6667H18.5833"
            stroke="#909396"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
          <path
            d="M16.5 27.3333C16.9208 28.3144 17.8818 29 19 29C20.1182 29 21.0792 28.3144 21.5 27.3333H16.5Z"
            fill="#909396"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M20.4436 11.5C20.5854 11.2549 20.6666 10.9702 20.6666 10.6667C20.6666 9.74619 19.9204 9 18.9999 9C18.0794 9 17.3333 9.74619 17.3333 10.6667C17.3333 10.9702 17.4144 11.2549 17.5562 11.5C17.6691 11.6952 17.8205 11.8653 17.9999 12.0001V12H20.0001C20.1795 11.8652 20.3307 11.6951 20.4436 11.5Z"
            fill="#909396"
          />
        </g>
      </g>
      <defs>
        <filter
          id="filter0_d_201_3580"
          x="0"
          y="0"
          width="38"
          height="38"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="1.5" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_201_3580"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_201_3580"
            result="shape"
          />
        </filter>
        <clipPath id="clip0_201_3580">
          <rect
            width="20"
            height="20"
            fill="white"
            transform="translate(9 9)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};

export const NotificationWithBadgeIcon: React.FC<IconProps> = ({
  className,
  ...rest
}) => {
  return (
    <svg
      width="38"
      height="38"
      viewBox="0 0 38 38"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
      className={cn(className)}
    >
      <g filter="url(#filter0_d_201_3600)">
        <rect
          x="3"
          y="3"
          width="32"
          height="32"
          rx="16"
          fill="white"
          style={{ fill: 'white', fillOpacity: 1 }}
          shapeRendering="crispEdges"
        />
        <g clipPath="url(#clip0_201_3600)">
          <path
            d="M19.4167 11.5191C18.0278 11.395 14.8333 11.817 13.1667 14.4976C11.0833 17.8483 13.1667 24.9221 10.25 25.6667H19.4167"
            stroke="#898A8D"
            style={{ stroke: '#898A8D', strokeOpacity: 1 }}
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
          <path
            d="M18.5833 11.5191C19.9722 11.395 23.1667 11.817 24.8333 14.4976C26.9167 17.8483 24.8333 24.9221 27.75 25.6667H18.5833"
            stroke="#898A8D"
            style={{ stroke: '#898A8D', strokeOpacity: 1 }}
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
          <path
            d="M16.5 27.3333C16.9208 28.3144 17.8818 29 19 29C20.1182 29 21.0792 28.3144 21.5 27.3333H16.5Z"
            fill="#898A8D"
            style={{ fill: '#898A8D', fillOpacity: 1 }}
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M20.4436 11.5C20.5854 11.2549 20.6666 10.9702 20.6666 10.6667C20.6666 9.74619 19.9204 9 18.9999 9C18.0794 9 17.3333 9.74619 17.3333 10.6667C17.3333 10.9702 17.4144 11.2549 17.5562 11.5C17.6691 11.6952 17.8205 11.8653 17.9999 12.0001V12H20.0001C20.1795 11.8652 20.3307 11.6951 20.4436 11.5Z"
            fill="#898A8D"
            style={{ fill: '#898A8D', fillOpacity: 1 }}
          />
        </g>
        <circle
          cx="25"
          cy="13"
          r="4"
          fill="#3BA5FF"
          style={{ fill: '#3BA5FF', fillOpacity: 1 }}
        />
      </g>
      <defs>
        <filter
          id="filter0_d_201_3600"
          x="0"
          y="0"
          width="38"
          height="38"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="1.5" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_201_3600"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_201_3600"
            result="shape"
          />
        </filter>
        <clipPath id="clip0_201_3600">
          <rect
            width="20"
            height="20"
            fill="white"
            style={{ fill: 'white', fillOpacity: 1 }}
            transform="translate(9 9)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};

export const NalseeLogo: React.FC<IconProps> = ({ className, ...rest }) => {
  return (
    <svg
      width="421"
      height="126"
      viewBox="0 0 421 126"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
      className={cn(className)}
    >
      <g clipPath="url(#clip0_201_1901)">
        <path
          d="M0 70.5709C0 47.1265 15.5866 34.7345 34.6928 34.7345C53.799 34.7345 69.0505 47.1265 69.0505 70.5709V117.962C69.0505 121.479 66.7041 123.823 63.1845 123.823H55.3074C51.7878 123.823 49.4415 121.479 49.4415 117.962V71.4082C49.4415 58.3463 43.5755 51.6479 34.6928 51.6479C25.8101 51.6479 19.4414 58.3463 19.4414 71.4082V117.962C19.4414 121.479 17.095 123.823 13.5755 123.823H5.86594C2.34637 123.823 0 121.479 0 117.962V70.5709Z"
          fill="#3BA5FF"
        />
        <path
          d="M115.978 70.236H129.721V67.0542C129.721 57.1741 124.861 51.6479 115.978 51.6479C109.274 51.6479 102.402 53.1551 98.0449 54.1598C94.5253 55.1646 91.8438 53.49 91.0058 49.9733L89.8326 45.7868C88.827 42.1027 90.6706 39.2559 94.0225 38.2512C97.3745 37.2464 106.592 34.7345 115.978 34.7345C136.09 34.7345 149.498 47.294 149.498 67.0542V97.0295C149.498 113.608 134.246 126 116.313 126C98.3801 126 83.1287 113.441 83.1287 97.0295C83.1287 79.2788 96.5365 70.236 115.978 70.236ZM116.313 109.087C124.693 109.087 129.721 103.058 129.721 97.0295V84.6375H115.81C106.425 84.6375 103.073 90.3311 103.073 96.6946C103.073 103.058 107.43 109.087 116.313 109.087Z"
          fill="#3BA5FF"
        />
        <path
          d="M166.254 8.27586C166.254 4.75921 168.098 2.07985 171.785 1.57747L179.159 0.0703379C183.182 -0.432041 185.863 1.74493 185.863 5.59651V117.962C185.863 121.479 183.517 123.823 179.997 123.823H172.12C168.601 123.823 166.254 121.479 166.254 117.962V8.27586Z"
          fill="#3BA5FF"
        />
        <path
          d="M202.12 110.426C202.958 107.077 205.807 105.737 209.327 106.742C213.349 107.747 219.215 109.087 226.087 109.087C233.629 109.087 238.992 105.235 238.992 100.044C238.992 83.9676 201.785 89.9962 201.785 60.0209C201.785 45.4519 213.517 34.7345 232.455 34.7345C239.997 34.7345 245.863 35.9067 249.886 37.0789C252.902 37.9162 255.081 40.763 254.076 44.2797L252.735 49.471C251.729 53.1551 249.048 54.4947 245.528 53.49C242.511 52.6527 237.819 51.6479 232.455 51.6479C224.746 51.6479 221.897 55.332 221.897 60.0209C221.897 75.0923 258.936 68.7288 258.936 99.7088C258.936 112.938 248.377 126 226.087 126C217.036 126 209.159 124.158 205.305 122.986C202.12 121.981 199.941 119.469 200.947 115.618L202.12 110.426Z"
          fill="#3BA5FF"
        />
        <path
          d="M270.162 70.7383C270.162 47.294 285.581 34.7345 304.519 34.7345C323.458 34.7345 339.044 48.1313 339.044 67.5566V80.1161C339.044 83.6327 336.698 85.9772 333.179 85.9772H289.603V89.1589C289.603 102.723 296.139 109.087 307.368 109.087C315.078 109.087 321.447 107.579 325.301 106.575C328.821 105.737 331.503 107.077 332.341 110.426L333.514 115.45C334.352 119.134 332.676 121.981 329.324 122.986C323.961 124.493 317.592 126 307.368 126C285.245 126 270.162 113.273 270.162 89.1589V70.7383ZM319.435 71.5756V67.5566C319.435 58.5138 313.57 51.6479 304.519 51.6479C295.469 51.6479 289.603 58.0114 289.603 68.7288V71.5756H319.435Z"
          fill="#3BA5FF"
        />
        <path
          d="M352.117 70.7383C352.117 47.294 367.536 34.7345 386.475 34.7345C405.413 34.7345 421 48.1313 421 67.5566V80.1161C421 83.6327 418.654 85.9772 415.134 85.9772H371.559V89.1589C371.559 102.723 378.095 109.087 389.324 109.087C397.034 109.087 403.402 107.579 407.257 106.575C410.777 105.737 413.458 107.077 414.296 110.426L415.469 115.45C416.307 119.134 414.631 121.981 411.279 122.986C405.916 124.493 399.547 126 389.324 126C367.201 126 352.117 113.273 352.117 89.1589V70.7383ZM401.391 71.5756V67.5566C401.391 58.5138 395.525 51.6479 386.475 51.6479C377.425 51.6479 371.559 58.0114 371.559 68.7288V71.5756H401.391Z"
          fill="#3BA5FF"
        />
      </g>
      <defs>
        <clipPath id="clip0_201_1901">
          <rect width="421" height="126" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export const LocationUpdateBtn: React.FC<IconProps> = ({
  className,
  ...rest
}) => {
  return (
    <svg
      width="38"
      height="38"
      viewBox="0 0 38 38"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
      className={cn(className)}
    >
      <g filter="url(#filter0_d_201_3616)">
        <rect
          x="3"
          y="3"
          width="32"
          height="32"
          rx="16"
          fill="white"
          shapeRendering="crispEdges"
        />
        <circle cx="19" cy="19" r="4" fill="#3BA5FF" />
        <circle cx="19" cy="19" r="7.5" stroke="#3BA5FF" />
        <path
          d="M19 11.5V9M26.5 19H29M19 26.5V29M11.5 19H9"
          stroke="#3BA5FF"
          strokeLinecap="round"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_201_3616"
          x="0"
          y="0"
          width="38"
          height="38"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="1.5" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_201_3616"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_201_3616"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
};
