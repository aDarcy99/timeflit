import React, { SVGProps } from 'react';
import { getObjectProperty } from '../../utils/object';

interface Props extends SVGProps<SVGSVGElement> {
  color?: 'white' | 'grey';
}

const PlusIcon = ({ color, ...props }: Props) => {
  return (
    <svg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
      <path
        d='M12.75 7.75H2.75M7.75 2.75V12.75'
        stroke={getObjectProperty({ white: '#BBBABA', grey: 'white' }, color, 'white')}
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};

export default PlusIcon;
