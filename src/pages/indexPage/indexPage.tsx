import React, { useContext, useState } from 'react';
// Functions
import TaskBrowserProvider from '../../contexts/taskListBrowserContext';
import { TaskContext } from '../../contexts/taskContext';
// Components
import Button from '../../components/reusable/button/button';
import TaskSidebar from '../../components/taskListSidebar/taskListSidebar';
import TaskBrowser from '../../components/taskBrowser/taskBrowser';
// Assets
import FolderIcon from '../../assets/svgs/folderIcon';
// Styles
import classes from './indexPage.module.scss';

type TIndexPageProps = {};

const IndexPage = (props: TIndexPageProps) => {
  const { taskLists } = useContext(TaskContext);

  const [isTaskSidebarOpen, setIsTaskSidebarOpen] = useState(false);

  const onFolderButtonClick = () => {
    setIsTaskSidebarOpen(true);
  };

  const onTaskSidebarClose = () => {
    setIsTaskSidebarOpen(false);
  };

  return (
    <TaskBrowserProvider taskLists={taskLists}>
      <div className={classes['root']}>
        <TaskSidebar isOpen={isTaskSidebarOpen} onClose={onTaskSidebarClose} />
        {/* <Button iconOnly variant='transparent' color='grey' onClick={onFolderButtonClick}>
          <FolderIcon size='lg' />
        </Button> */}
        <TaskBrowser />
      </div>
    </TaskBrowserProvider>
  );
};

export default IndexPage;
