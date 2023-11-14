import React, { DetailedHTMLProps, ForwardedRef, forwardRef, ReactNode } from 'react';
// Functions
import clsx from 'clsx';
// Styles
import classes from './button.module.scss';

interface ButtonProps extends DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  children?: ReactNode;
  className?: string;
  variant?: 'filled' | 'transparent' | 'unset';
  size?: 'sm' | 'md' | 'lg';
  width?: 'fit-content' | 'fit-container';
  color?: 'red' | 'green' | 'purple' | 'grey' | 'blue';
  textAlignment?: 'start' | 'center' | 'end';
  iconOnly?: boolean;
}

const Button = forwardRef(
  (
    {
      children,
      className,
      variant = 'filled',
      size = 'md',
      width = 'fit-content',
      color = 'purple',
      textAlignment = 'center',
      iconOnly = false,
      ...props
    }: ButtonProps,
    ref: ForwardedRef<HTMLButtonElement>
  ) => {
    return (
      <button
        {...props}
        ref={ref}
        className={clsx(
          classes['root'],
          classes[`variant--${variant}`],
          classes[`size--${size}`],
          classes[`width--${width}`],
          classes[`color--${color}`],
          classes[`text-alignment--${textAlignment}`],
          iconOnly && classes['icon-only'],
          className
        )}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
