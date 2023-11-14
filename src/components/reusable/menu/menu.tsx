import clsx from 'clsx';
import React, { ReactElement } from 'react';
// Components
import Popover, { TPopoverProps } from '../popover/popover';
// Styles
import classes from './menu.module.scss';

interface TMenuProps extends TPopoverProps {
  children: any;
  direction?: 'row' | 'column';
}

const Menu = ({ children, direction = 'column', ...props }: TMenuProps) => {
  return (
    <Popover {...props} className={clsx(classes['root'], classes[`direction--${direction}`])}>
      {children}
    </Popover>
  );
};

export default Menu;
