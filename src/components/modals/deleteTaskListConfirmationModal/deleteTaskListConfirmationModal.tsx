import React, { useContext } from 'react';
// Functions
import { TaskListBrowserContext } from '../../../contexts/taskListBrowserContext';
import { TaskContext } from '../../../contexts/taskContext';
// Components
import ConfirmationModal from '../confirmationModal/confirmationModal';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  taskListId: string | undefined;
};

const DeleteTaskConfirmationModal = ({ taskListId, isOpen, onClose }: Props) => {
  const { deleteSingleTaskListById } = useContext(TaskContext);
  const { openTaskListIds, deleteOpenTaskListById } = useContext(TaskListBrowserContext);

  const onCancelButtonClick = () => {
    onClose();
  };

  const onDeleteButtonClick = () => {
    if (!taskListId) {
      // TODO: create error popup modal
      return;
    }

    // Delete the task in the browser tab if it exists
    if (openTaskListIds.includes(taskListId)) {
      deleteOpenTaskListById(taskListId);
    }

    deleteSingleTaskListById(taskListId);

    onClose();
  };

  return (
    <ConfirmationModal
      ariaTitle='Delete task confirmation modal'
      title='Delete Task'
      description='Are you sure? You will not be able to recover the deleted task in the future.'
      cancelButtonText='No, keep it. '
      onCancelButtonClick={onCancelButtonClick}
      confirmButtonText='Yes, delete!'
      onConfirmButtonClick={onDeleteButtonClick}
      isOpen={isOpen}
      onClose={onClose}
    />
  );
};

export default DeleteTaskConfirmationModal;
