import clsx from 'clsx';
import React, { ReactNode, useContext } from 'react';
// Functions
import { TaskListBrowserContext } from '../../../contexts/taskListBrowserContext';
import { TaskContext } from '../../../contexts/taskContext';
// Components
import Button from '../../reusable/button/button';
import Modal, { ModalProps } from '../../reusable/modal/modal';
// Styles
import classes from './confirmationModal.module.scss';

type TConfirmationModalProps = {
  isOpen: boolean;
  onClose: () => void;
  rootProps?: ModalProps;
  ariaTitle: string;
  title: ReactNode;
  description: ReactNode;
  cancelButtonText: string;
  confirmButtonText: string;
  onCancelButtonClick: () => void;
  onConfirmButtonClick: () => void;
};

const ConfirmationModal = ({
  isOpen,
  onClose,
  rootProps,
  ariaTitle,
  title,
  description,
  onCancelButtonClick,
  onConfirmButtonClick,
  cancelButtonText,
  confirmButtonText,
  ...props
}: TConfirmationModalProps) => {
  return (
    <Modal {...rootProps} className={clsx(classes['root'], rootProps?.className)} title={ariaTitle} isOpen={isOpen} onClose={onClose}>
      <h2 className={classes['title']}>{title}</h2>
      <p className={classes['description']}>{description}</p>
      <div className={classes['button-container']}>
        <Button onClick={onCancelButtonClick} variant='transparent' color='grey'>
          {cancelButtonText}
        </Button>
        <Button onClick={onConfirmButtonClick}>{confirmButtonText}</Button>
      </div>
    </Modal>
  );
};

export default ConfirmationModal;
