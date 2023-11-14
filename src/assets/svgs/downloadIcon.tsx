import React, { SVGProps } from 'react';
import { getObjectProperty } from '../../utils/object';

interface Props extends SVGProps<SVGSVGElement> {
  size?: 'sm' | 'md' | 'lg';
  color?: 'grey' | 'white';
}

const DownloadIcon = ({ size = 'md', color = 'white', ...props }: Props) => {
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
    <svg width={getDimensions()} height={getDimensions()} viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M3.25 13.25H12.25M3.75 6.75L7.75 10.25M7.75 10.25L11.75 6.75M7.75 10.25V1.75'
        stroke={getObjectProperty({ white: 'white', grey: '#BBBABA' }, color, 'white')}
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};

export default DownloadIcon;
