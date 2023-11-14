import React, { SVGProps } from 'react';

interface Props extends SVGProps<SVGSVGElement> {}

const HamburgerIcon = ({ ...props }: Props) => {
  return (
    <svg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
      <path d='M2.75 12.25H13.25M2.75 8.25H13.25M2.75 4.25H13.25' stroke='#BBBABA' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
    </svg>
  );
};

export default HamburgerIcon;
