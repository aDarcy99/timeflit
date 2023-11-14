import React, { DetailedHTMLProps, ForwardedRef, forwardRef, HTMLAttributes, InputHTMLAttributes, LabelHTMLAttributes, ReactNode } from 'react';
// Types
import { THtmlDivProps, THtmlInputProps, THtmlLabelProps } from '../../../types/elementProps';
// Functions
import clsx from 'clsx';
// Styles
import classes from './textInput.module.scss';
import textClasses from '../../../styles/classes/text.module.scss';

export interface TTextInputProps {
  rootProps?: THtmlDivProps;
  labelProps?: THtmlLabelProps;
  descriptionProps?: THtmlDivProps;
  inputProps?: THtmlInputProps;
  errorProps?: THtmlDivProps;
  variant?: 'filled' | 'transparent' | 'outlined';
  label?: ReactNode;
  description?: ReactNode;
  error?: ReactNode;
}

const TextInput = forwardRef(
  (
    { rootProps, labelProps, descriptionProps, inputProps, errorProps, variant = 'filled', label, description, error, ...props }: TTextInputProps,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    return (
      <div {...rootProps} ref={ref} className={clsx(classes['root'], classes[`variant--${variant}`], rootProps?.className)}>
        {label && (
          <label {...labelProps} className={clsx(classes['label'], labelProps?.className)}>
            {label}
          </label>
        )}
        {description && <div className={clsx(classes['description'], descriptionProps?.className)}>{description}</div>}
        <input {...inputProps} className={clsx(classes['input'], error && classes['has-error'], inputProps?.className)} />
        {error && (
          <div {...errorProps} className={clsx(classes['error'], errorProps?.className)}>
            {error}
          </div>
        )}
      </div>
    );
  }
);

TextInput.displayName = 'TextInput';

export default TextInput;
