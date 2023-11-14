import React, { SVGProps } from 'react';

interface Props extends SVGProps<SVGSVGElement> {
  size?: 'sm' | 'md' | 'lg';
}

const DeleteIcon = ({ size = 'md', ...props }: Props) => {
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
    <svg width='14' height='16' viewBox='0 0 14 16' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
      <path
        d='M2.44768 12.38C2.44768 12.7337 2.60241 13.0728 2.87783 13.3229C3.15325 13.5729 3.52679 13.7134 3.91629 13.7134H9.79072C10.1802 13.7134 10.5538 13.5729 10.8292 13.3229C11.1046 13.0728 11.2593 12.7337 11.2593 12.38V4.38005H2.44768V12.38ZM3.91629 5.71338H9.79072V12.38H3.91629V5.71338ZM9.42357 2.38005L8.68927 1.71338H5.01775L4.28344 2.38005H1.71338V3.71338H11.9936V2.38005H9.42357Z'
        fill='#BBBABA'
      />
    </svg>
  );
};

export default DeleteIcon;
