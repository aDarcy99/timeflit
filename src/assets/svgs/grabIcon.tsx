import React, { SVGProps } from 'react';

interface TGrabIconProps extends SVGProps<SVGSVGElement> {
  size?: 'sm' | 'md' | 'lg';
}

const GrabIcon = ({ size = 'md', ...props }: TGrabIconProps) => {
  const getDimensions = () => {
    switch (size) {
      case 'lg':
        return 24;

      case 'md':
      default:
        return 16;
    }
  };

  return (
    <svg {...props} width={getDimensions()} height={getDimensions()} viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M5.5 3.25C5.91421 3.25 6.25 2.91421 6.25 2.5C6.25 2.08579 5.91421 1.75 5.5 1.75C5.08579 1.75 4.75 2.08579 4.75 2.5C4.75 2.91421 5.08579 3.25 5.5 3.25Z'
        stroke='#BBBABA'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M5.5 8.75C5.91421 8.75 6.25 8.41421 6.25 8C6.25 7.58579 5.91421 7.25 5.5 7.25C5.08579 7.25 4.75 7.58579 4.75 8C4.75 8.41421 5.08579 8.75 5.5 8.75Z'
        stroke='#BBBABA'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M5.5 14.25C5.91421 14.25 6.25 13.9142 6.25 13.5C6.25 13.0858 5.91421 12.75 5.5 12.75C5.08579 12.75 4.75 13.0858 4.75 13.5C4.75 13.9142 5.08579 14.25 5.5 14.25Z'
        stroke='#BBBABA'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M10.496 3.25C10.9102 3.25 11.246 2.91421 11.246 2.5C11.246 2.08579 10.9102 1.75 10.496 1.75C10.0818 1.75 9.746 2.08579 9.746 2.5C9.746 2.91421 10.0818 3.25 10.496 3.25Z'
        stroke='#BBBABA'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M10.496 8.75C10.9102 8.75 11.246 8.41421 11.246 8C11.246 7.58579 10.9102 7.25 10.496 7.25C10.0818 7.25 9.746 7.58579 9.746 8C9.746 8.41421 10.0818 8.75 10.496 8.75Z'
        stroke='#BBBABA'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M10.496 14.25C10.9102 14.25 11.246 13.9142 11.246 13.5C11.246 13.0858 10.9102 12.75 10.496 12.75C10.0818 12.75 9.746 13.0858 9.746 13.5C9.746 13.9142 10.0818 14.25 10.496 14.25Z'
        stroke='#BBBABA'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};

export default GrabIcon;
