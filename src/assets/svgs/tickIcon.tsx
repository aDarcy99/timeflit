import React, { SVGProps } from 'react';

interface Props extends SVGProps<SVGSVGElement> {}

const TickIcon = ({ ...props }: Props) => {
  return (
    <svg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
      <path d='M2.75 8.75L6.25 12.25L13.25 4.75' stroke='black' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
    </svg>
  );
};

export default TickIcon;
