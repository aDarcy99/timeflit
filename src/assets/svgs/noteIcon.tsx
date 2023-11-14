import React, { SVGProps } from 'react';

interface Props extends SVGProps<SVGSVGElement> {
  size?: 'sm' | 'md' | 'lg';
}

const NoteIcon = ({ size = 'md', ...props }: Props) => {
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
      <path d='M9.25 13.25H2.75V2.75H13.25V9.25L9.25 13.25Z' stroke='#BBBABA' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
      <path d='M8.75 13.25V8.75H13.25' stroke='#BBBABA' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
    </svg>
  );
};

export default NoteIcon;
