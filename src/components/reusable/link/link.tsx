import clsx from 'clsx';
import React, { DetailedHTMLProps, AnchorHTMLAttributes, ReactNode } from 'react';
// Styles
import classes from './link.module.scss';

interface TLinkProps extends DetailedHTMLProps<AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement> {
  children: ReactNode;
  width?: 'fit-content' | 'fit-container';
}

const Link = ({ children, className, width = 'fit-content', ...props }: TLinkProps) => {
  return (
    <a {...props} className={clsx(classes['root'], classes[`width--${width}`], className)}>
      {children}
    </a>
  );
};

export default Link;
