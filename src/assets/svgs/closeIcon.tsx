import React, { SVGProps } from 'react';

interface Props extends SVGProps<SVGSVGElement> {
  size?: 'sm' | 'md' | 'lg';
}

const CloseIcon = ({ size = 'md', ...props }: Props) => {
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
    <svg width={getDimensions()} height={getDimensions()} viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
      <path d='M11.25 4.75L4.75 11.25M4.75 4.75L11.25 11.25' stroke='#BBBABA' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
    </svg>
  );
};

export default CloseIcon;
