import React from 'react';
// Functions
import clsx from 'clsx';
// Stles
import classes from './divider.module.scss';
import { THtmlDivProps } from '../../../types/elementProps';

interface TDividerProps extends THtmlDivProps {
  orientation?: 'horizontal' | 'vertical';
  text?: string;
}

const Divider = ({ className, orientation = 'horizontal', text, ...props }: TDividerProps) => {
  return <div {...props} className={clsx(classes['root'], classes[`orientation--${orientation}`], className)} />;
};

export default Divider;
