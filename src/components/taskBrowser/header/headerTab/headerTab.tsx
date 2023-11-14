import clsx from 'clsx';
import React, { ForwardedRef, forwardRef, MouseEvent, ReactNode } from 'react';
import CloseIcon from '../../../../assets/svgs/closeIcon';
import Button from '../../../reusable/button/button';
// Styles
import classes from './headerTab.module.scss';

type TTabProps = {
  children: string;
  className?: string;
  onClick?: () => void;
  onTabClose?: (e: MouseEvent<HTMLButtonElement>) => void;
  isOpen?: boolean;
};

const HeaderTab = forwardRef(({ children, className, isOpen, onClick, onTabClose, ...props }: TTabProps, ref: ForwardedRef<HTMLDivElement>) => {
  const handleTabClose = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    if (onTabClose) {
      onTabClose(e);
    }
  };

  return (
    <div {...props} ref={ref} className={clsx(classes['root'], isOpen && classes['is-open'], className)} onClick={onClick} title={children}>
      <p className={classes['text']}>{children}</p>
      <Button className={classes['close-button']} iconOnly variant='transparent' color='grey' onClick={handleTabClose}>
        <CloseIcon />
      </Button>
    </div>
  );
});

export default HeaderTab;
