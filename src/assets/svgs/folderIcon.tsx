import React, { SVGProps } from 'react';
import { getObjectProperty } from '../../utils/object';

interface Props extends SVGProps<SVGSVGElement> {
  size?: 'sm' | 'md' | 'lg';
  color?: 'white' | 'grey';
}

const FolderIcon = ({ size = 'md', color = 'white', ...props }: Props) => {
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
      <path
        d='M1.75 2.75V13.25H14.25V4.75H8.25L6.75 2.75H1.75Z'
        stroke={getObjectProperty({ white: 'white', grey: '#BBBABA' }, color, 'white')}
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};

export default FolderIcon;
