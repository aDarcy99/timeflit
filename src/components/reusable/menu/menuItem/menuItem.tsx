import React, { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';
// Functions
import clsx from 'clsx';
// Styles
import classes from './menuItem.module.scss';

interface TMenuItemProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  children: ReactNode;
}

const MenuItem = ({ children, className, ...props }: TMenuItemProps) => {
  return (
    <div {...props} className={clsx(classes['root'], className)}>
      {children}
    </div>
  );
};

export default MenuItem;
