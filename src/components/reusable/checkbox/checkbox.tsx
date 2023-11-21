import React, { useState } from 'react';
// Types
import { THtmlDivProps } from '../../../types/elementProps';
// Functions
import clsx from 'clsx';
// Assets
import TickIcon from '../../../assets/svgs/tickIcon';
// Styles
import classes from './checkbox.module.scss';

interface TCheckboxProps extends THtmlDivProps {
  className?: string;
  color?: 'purple';
  value: boolean;
}

const Checkbox = ({ color = 'purple', className, value, ...props }: TCheckboxProps) => {
  return (
    <div {...props} className={clsx(classes['root'], classes[`color--${color}`], value && classes['is-active'], className)}>
      {value && <TickIcon className={classes['tick']} />}
    </div>
  );
};

export default Checkbox;
