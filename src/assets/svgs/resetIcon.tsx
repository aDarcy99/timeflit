import React, { SVGProps } from 'react';

interface Props extends SVGProps<SVGSVGElement> {}

const ResetIcon = ({ ...props }: Props) => {
  return (
    <svg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
      <path
        d='M4.75 5.25H1.75M1.75 5.25C1.75 5.25 4.25 1.75 8 1.75C9.6576 1.75 11.2473 2.40848 12.4194 3.58058C13.5915 4.75268 14.25 6.3424 14.25 8C14.25 9.6576 13.5915 11.2473 12.4194 12.4194C11.2473 13.5915 9.6576 14.25 8 14.25C4.548 14.25 1.75 11.25 1.75 8.75M1.75 5.25V1.75'
        stroke='#BBBABA'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};

export default ResetIcon;
