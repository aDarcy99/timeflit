import React, { FunctionComponent, KeyboardEvent, ReactNode } from 'react';
// Types

// Functions
import clsx from 'clsx';
import FocusLock from 'react-focus-lock';
// Components
import { Portal } from 'react-portal';
// Styles
import classes from './drawer.module.scss';
import Button from '../button/button';
import CloseIcon from '../../../assets/svgs/closeIcon';

export type DrawerProps = {
  isOpen: boolean;
  className?: string;
  onClose: () => void;
  size?: 'sm' | 'md' | 'lg';
  children: ReactNode;
  title: string;
};

/**
 * Generic drawer component. To be used as a wrapper for specific drawer components
 * eg: \<Drawer>{your drawer here}\</Drawer>
 * @param isOpen (boolean): If drawer should be shown
 * @param size ('sm' | 'md' | 'lg'): Size of drawer (optional)
 * @param className (string): Custom styling for this component (optional)
 * @param onClose (function): Function to handle closing of drawer
 */
export const Drawer: FunctionComponent<DrawerProps> = ({ isOpen, className = '', title, size = 'md', onClose, children, ...props }) => {
  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Escape') {
      onClose();
    }
  };

  return isOpen ? (
    <Portal>
      <FocusLock returnFocus disabled={!isOpen}>
        <div className={clsx(classes['root'], !isOpen && classes['is-hidden'], className)}>
          <div className={classes['overlay']} tabIndex={0} aria-label='Close drawer' onClick={onClose} onKeyDown={handleKeyDown} />

          <nav className={clsx(classes['panel'], classes[`size--${size}`])}>
            <Button className={classes['close-button']} aria-label='Close drawer' iconOnly variant='transparent' color='grey' onClick={onClose}>
              <CloseIcon size='lg' />
            </Button>

            {children}
          </nav>
        </div>
      </FocusLock>
    </Portal>
  ) : null;
};

export default Drawer;
