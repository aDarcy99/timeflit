import React, { useContext } from 'react';
// Functions
import { TaskContext } from '../../../contexts/taskContext';
// Components
import ConfirmationModal from '../confirmationModal/confirmationModal';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const OpenFileConfirmationModal = ({ isOpen, onClose }: Props) => {
  const { readTaskListsFromDisk } = useContext(TaskContext);

  const onCancelButtonClick = () => {
    onClose();
  };

  const onOpenFileButtonClick = async () => {
    await readTaskListsFromDisk();

    onClose();
  };

  return (
    <ConfirmationModal
      ariaTitle='Open file confirmation modal'
      title='Open File'
      description='Are you sure? You will permanently lose all your current task lists.'
      cancelButtonText='No, keep current task lists.'
      onCancelButtonClick={onCancelButtonClick}
      confirmButtonText='Yes, open new file!'
      onConfirmButtonClick={onOpenFileButtonClick}
      isOpen={isOpen}
      onClose={onClose}
    />
  );
};

export default OpenFileConfirmationModal;
