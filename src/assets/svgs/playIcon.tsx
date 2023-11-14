import React, { SVGProps } from 'react';

interface TPlayIconProps extends SVGProps<SVGSVGElement> {}

const PlayIcon = (props: TPlayIconProps) => {
  return (
    <svg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
      <path d='M2.93332 2.75V13.25L13.0667 8L2.93332 2.75Z' stroke='#BBBABA' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
    </svg>
  );
};

export default PlayIcon;
