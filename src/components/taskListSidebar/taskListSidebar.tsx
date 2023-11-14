import React, { MouseEvent, useContext, useEffect, useState } from 'react';
// Functions
import clsx from 'clsx';
import { TaskContext } from '../../contexts/taskContext';
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd';
import { TaskListBrowserContext } from '../../contexts/taskListBrowserContext';
// Components
import Button from '../reusable/button/button';
import DeleteTaskListConfirmationModal from '../modals/deleteTaskListConfirmationModal/deleteTaskListConfirmationModal';
import OpenFileConfirmationModal from '../modals/openFileConfirmationModal/openFileConfirmationModal';
// Assets
import DeleteIcon from '../../assets/svgs/deleteIcon';
import NoteIcon from '../../assets/svgs/noteIcon';
import PlusIcon from '../../assets/svgs/plusIcon';
import ArrowIcon from '../../assets/svgs/arrowIcon';
import DownloadIcon from '../../assets/svgs/downloadIcon';
import FolderIcon from '../../assets/svgs/folderIcon';
// Styles
import classes from './taskListSidebar.module.scss';

type TTaskListSidebarProps = {
  isOpen: boolean;
  onClose: () => void;
};

const TaskListSidebar = ({ onClose, isOpen }: TTaskListSidebarProps) => {
  const { taskLists, createSingleTaskList, updateTaskListItemArrayIndex, saveTaskListsToDisk } = useContext(TaskContext);
  const { addNewOpenTaskListId } = useContext(TaskListBrowserContext);

  const [isSidebarMinimized, setIsSideBarMinimized] = useState(false);
  const [isDeleteTaskListModalOpen, setIsDeleteTaskListModalOpen] = useState(false);
  const [isOpenFileModalOpen, setIsOpenFileModalOpen] = useState(false);
  const [deleteTaskId, setDeleteTaskId] = useState<string | undefined>(undefined);

  const onToggleSidebarButtonClick = () => {
    setIsSideBarMinimized(!isSidebarMinimized);
  };

  // Task list functions
  const onNewTaskListButtonClick = () => {
    createSingleTaskList();
  };

  const onOpenTaskListButtonClick = (taskListId: string) => {
    return () => {
      addNewOpenTaskListId(taskListId);

      onClose();
    };
  };

  const onDeleteTaskListButtonClick = (taskListId: string) => {
    return (e: MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      setIsDeleteTaskListModalOpen(true);
      setDeleteTaskId(taskListId);
    };
  };

  const onDeleteTaskModalClose = () => {
    setIsDeleteTaskListModalOpen(false);
    setDeleteTaskId(undefined);
  };

  const onOpenFileModalClose = () => {
    setIsOpenFileModalOpen(false);
  };

  // Draggabble tasks function
  const onDragEnd = ({ source, destination }: DropResult) => {
    // If dropping outside of the droppable area return nothing
    if (!destination) {
      return;
    }

    updateTaskListItemArrayIndex(source.index, destination.index);
  };

  const onSaveFileButtonClick = () => {
    saveTaskListsToDisk();
  };

  const onOpenFileButtonClick = () => {
    setIsOpenFileModalOpen(true);
  };

  return (
    <>
      <nav className={clsx(classes['root'], isSidebarMinimized && classes['is-minimized'])}>
        <div className={classes['sidebar-content']}>
          <h2 className={classes['heading']}>Timeflit</h2>
          <div className={classes['controls']}>
            <Button
              className={classes['open-file-button']}
              width='fit-container'
              textAlignment='start'
              variant='transparent'
              color='grey'
              onClick={onOpenFileButtonClick}
            >
              <FolderIcon />
              Open from file
            </Button>
            <Button
              className={classes['save-file-button']}
              width='fit-container'
              textAlignment='start'
              variant='transparent'
              color='grey'
              onClick={onSaveFileButtonClick}
            >
              <DownloadIcon />
              Save to file
            </Button>
            <Button
              className={classes['new-task-list-button']}
              width='fit-container'
              textAlignment='start'
              variant='transparent'
              color='grey'
              onClick={onNewTaskListButtonClick}
            >
              <PlusIcon />
              New task list
            </Button>
          </div>
          <h2 className={classes['heading']}>Task Lists</h2>
          <div className={classes['task-list-container']}>
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId='task-droppable'>
                {(provided) => (
                  <div {...provided.droppableProps} ref={provided.innerRef} className={classes['task-list']}>
                    {taskLists.map((taskList, idx) => (
                      <Draggable key={taskList.id} draggableId={taskList.id} index={idx}>
                        {(provided) => (
                          <div
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            ref={provided.innerRef}
                            className={classes['task-list-item']}
                            tabIndex={0}
                            onClick={onOpenTaskListButtonClick(taskList.id)}
                          >
                            {taskList.name}
                            <Button
                              className={classes['delete-button']}
                              iconOnly
                              variant='transparent'
                              color='grey'
                              onClick={onDeleteTaskListButtonClick(taskList.id)}
                            >
                              <DeleteIcon />
                            </Button>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </div>
        </div>

        <Button className={classes['minimize-button']} iconOnly color='grey' variant='transparent' onClick={onToggleSidebarButtonClick}>
          <ArrowIcon size='lg' direction={isSidebarMinimized ? 'right' : 'left'} />
        </Button>
      </nav>
      <DeleteTaskListConfirmationModal isOpen={isDeleteTaskListModalOpen} taskListId={deleteTaskId} onClose={onDeleteTaskModalClose} />
      <OpenFileConfirmationModal isOpen={isOpenFileModalOpen} onClose={onOpenFileModalClose} />
    </>
  );
};

export default TaskListSidebar;
