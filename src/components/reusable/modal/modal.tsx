import React, { FunctionComponent, KeyboardEvent, ReactNode } from 'react';
// Types

// Functions
import clsx from 'clsx';
import FocusLock from 'react-focus-lock';
// Components
import { Portal } from 'react-portal';
// Styles
import classes from './modal.module.scss';

export type ModalProps = {
  children: ReactNode;
  className?: string;
  isOpen: boolean;
  portalSelector?: string;
  onClose: () => void;
  title: string;
  size?: 'sm' | 'md' | 'lg';
};

/**
 * Generic modal component. To be used as a wrapper for specific modal components
 * eg: \<Modal>{your modal here}\</Modal>
 * @param isOpen (boolean): If modal should be shown
 * @param size ('sm' | 'md' | 'lg'): Size of modal (optional)
 * @param portalSelector (string): Classname of element in which Portal should be attached to. Defaults to body.
 * @param className (string): Custom styling for this component (optional)
 * @param onClose (function): Function to handle closing of modal
 */
export const Modal: FunctionComponent<ModalProps> = ({ children, isOpen, portalSelector, className, title, onClose, size = 'md', ...props }) => {
  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Escape') {
      onClose();
    }
  };

  return isOpen ? (
    <Portal node={document && portalSelector ? document.querySelectorAll(portalSelector)[0] : null}>
      <FocusLock returnFocus disabled={!isOpen}>
        <div className={clsx(classes['root'], !isOpen && classes['is-hidden'])}>
          <div className={classes['overlay']} tabIndex={0} aria-label='Close modal' onClick={onClose} onKeyDown={handleKeyDown} />
          <div className={clsx(classes['panel'], classes[`size--${size}`], className)}>{children}</div>
        </div>
      </FocusLock>
    </Portal>
  ) : null;
};

export default Modal;
