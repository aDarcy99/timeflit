import React, { SVGProps } from 'react';

interface TPauseIconProps extends SVGProps<SVGSVGElement> {}

const PauseIcon = (props: TPauseIconProps) => {
  return (
    <svg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
      <path
        d='M2.75 2.75H6.25V13.25H2.75V2.75ZM9.75 2.75H13.25V13.25H9.75V2.75Z'
        stroke='#BBBABA'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};

export default PauseIcon;
