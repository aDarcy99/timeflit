import React, { useContext, useEffect, useState } from 'react';
// Functions
import { TaskListBrowserContext } from '../../contexts/taskListBrowserContext';
import { TaskContext } from '../../contexts/taskContext';
// Components
import Button from '../reusable/button/button';
import TaskList from '../taskList/taskList';
import Header from './header/header';
import OpenFileConfirmationModal from '../modals/openFileConfirmationModal/openFileConfirmationModal';
// Assets
import FolderIcon from '../../assets/svgs/folderIcon';
import PlusIcon from '../../assets/svgs/plusIcon';
// Styles
import classes from './taskBrowser.module.scss';
import textClasses from '../../styles/classes/text.module.scss';

type TTasskBrowserProps = {};

const TaskBrowser = ({}: TTasskBrowserProps) => {
  const { currentlyOpenTaskList, addNewOpenTaskListId } = useContext(TaskListBrowserContext);
  const { createSingleTaskList, taskLists } = useContext(TaskContext);

  const [isNewTaskCreated, setIsNewTaskCreated] = useState(false);
  const [isOpenFileModalOpen, setIsOpenFileModalOpen] = useState(false);

  const onCreateTaskButtonClick = () => {
    createSingleTaskList();
    setIsNewTaskCreated(true);
  };

  const onOpenFileButtonClick = () => {
    setIsOpenFileModalOpen(true);
  };

  const onOpenFileModalClose = () => {
    setIsOpenFileModalOpen(false);
  };

  useEffect(() => {
    if (!isNewTaskCreated) {
      return;
    }

    addNewOpenTaskListId(taskLists[taskLists.length - 1].id);

    setIsNewTaskCreated(false);
  }, [isNewTaskCreated, taskLists]);

  return (
    <>
      <div className={classes['root']}>
        <Header />
        <main className={classes['display']}>
          {currentlyOpenTaskList ? (
            <TaskList taskList={currentlyOpenTaskList} />
          ) : (
            <div className={classes['dashboard']}>
              <h1 className={textClasses['title-text']}>TimeFlit</h1>
              <p className={textClasses['subtitle-text']}>Simple task tracker</p>
              <div className={classes['button-container']}>
                <Button className={classes['open-file-button']} variant='transparent' color='blue' onClick={onOpenFileButtonClick}>
                  <FolderIcon />
                  Open from file
                </Button>

                <Button className={classes['create-task-button']} variant='transparent' color='blue' onClick={onCreateTaskButtonClick}>
                  <PlusIcon />
                  Create a new task list
                </Button>
              </div>
            </div>
          )}
        </main>
      </div>
      <OpenFileConfirmationModal isOpen={isOpenFileModalOpen} onClose={onOpenFileModalClose} />
    </>
  );
};

export default TaskBrowser;
