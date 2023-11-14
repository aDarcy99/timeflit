import React, { ForwardedRef, forwardRef, ReactElement, useState } from 'react';
// Types
import { THtmlDivProps } from '../../types/elementProps';
// Components
import Button from '../reusable/button/button';
// Assets
import GrabIcon from '../../assets/svgs/grabIcon';
// Styles
import classes from './grabWrapper.module.scss';
import clsx from 'clsx';

interface TGrabWrapperProps extends THtmlDivProps {
  children: ReactElement;
  rootProps?: THtmlDivProps;
  grabberProps?: any;
}

const GrabWrapper = forwardRef(({ children, rootProps, grabberProps }: TGrabWrapperProps, ref: ForwardedRef<HTMLDivElement>) => {
  return (
    <div {...rootProps} ref={ref} className={clsx(classes['root'], rootProps?.className)}>
      <Button {...grabberProps} variant='unset' className={classes['grabber']}>
        <GrabIcon />
      </Button>
      {children}
    </div>
  );
});

export default GrabWrapper;
