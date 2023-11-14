import React, { SVGProps } from 'react';

interface TKebabIconProps extends SVGProps<SVGSVGElement> {}

function KebabIcon({ ...props }: TKebabIconProps) {
  return (
    <svg fill='none' height='16' viewBox='0 0 16 16' width='16' xmlns='http://www.w3.org/2000/svg' {...props}>
      <path
        className='path'
        d='M2.5 8.75C2.91421 8.75 3.25 8.41421 3.25 8C3.25 7.58579 2.91421 7.25 2.5 7.25C2.08579 7.25 1.75 7.58579 1.75 8C1.75 8.41421 2.08579 8.75 2.5 8.75Z'
        stroke='#BBBABA'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='1.5'
      />
      <path
        className='path'
        d='M8 8.75C8.41421 8.75 8.75 8.41421 8.75 8C8.75 7.58579 8.41421 7.25 8 7.25C7.58579 7.25 7.25 7.58579 7.25 8C7.25 8.41421 7.58579 8.75 8 8.75Z'
        stroke='#BBBABA'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='1.5'
      />
      <path
        className='path'
        d='M13.5 8.75C13.9142 8.75 14.25 8.41421 14.25 8C14.25 7.58579 13.9142 7.25 13.5 7.25C13.0858 7.25 12.75 7.58579 12.75 8C12.75 8.41421 13.0858 8.75 13.5 8.75Z'
        stroke='#BBBABA'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='1.5'
      />
    </svg>
  );
}

export default KebabIcon;
