import React, { useState } from 'react';
// Functions
import clsx from 'clsx';
// Assets
import TickIcon from '../../../assets/svgs/tickIcon';
// Styles
import classes from './checkbox.module.scss';

type TCheckboxProps = {
  className?: string;
  color?: 'purple';
};

const Checkbox = ({ color = 'purple', className }: TCheckboxProps) => {
  const [isActive, setIsActive] = useState(false);

  const onCheckboxClick = () => {
    setIsActive(!isActive);
  };

  return (
    <div className={clsx(classes['root'], classes[`color--${color}`], isActive && classes['is-active'], className)} onClick={onCheckboxClick}>
      {isActive && <TickIcon className={classes['tick']} />}
    </div>
  );
};

export default Checkbox;
