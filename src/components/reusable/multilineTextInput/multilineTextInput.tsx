import React, { ForwardedRef } from 'react';
// Functions
import clsx from 'clsx';
// Components
import TextArea, { TextareaAutosizeProps } from 'react-textarea-autosize';
// Styles
import classes from './multiLineTextInput.module.scss';
import textClasses from '../../../styles/classes/text.module.scss';

interface TMultilineTextInputProps extends TextareaAutosizeProps {
  autoResize?: boolean;
  text?: 'paragraph' | 'heading';
  variant?: 'filled' | 'transparent';
}

/**
 * @summary Multi-line text input component
 * @param {*} className
 * @param {*} autoResize - Determines whether the textarea height is dynamic or set to default scrollbar.
 */
const MultilineTextInput = React.forwardRef(
  ({ className, autoResize = false, variant = 'filled', text = 'paragraph', ...props }: TMultilineTextInputProps, ref: ForwardedRef<HTMLTextAreaElement>) => {
    return (
      <TextArea
        {...props}
        ref={ref}
        className={clsx(classes['root'], classes[`variant--${variant}`], autoResize && classes['is-autoResize'], textClasses[`${text}-text`], className)}
      />
    );
  }
);

export default MultilineTextInput;
