import React, { SVGProps } from 'react';
import { getObjectProperty } from '../../utils/object';

interface Props extends SVGProps<SVGSVGElement> {
  size?: 'sm' | 'md' | 'lg';
  direction?: 'up' | 'down' | 'left' | 'right';
}

const ArrowIcon = ({ size = 'md', direction = 'left', ...props }: Props) => {
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
    <svg
      width={getDimensions()}
      height={getDimensions()}
      viewBox='0 0 16 16'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      style={{ transform: `rotateZ(${getObjectProperty({ left: '0', right: '180', up: '90', down: '270' }, direction, '0')}deg)` }}
      {...props}
    >
      <path d='M7.25 3.75L2.75 8.25M2.75 8.25L7.25 12.75M2.75 8.25H13.25' stroke='#BBBABA' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
    </svg>
  );
};

export default ArrowIcon;
