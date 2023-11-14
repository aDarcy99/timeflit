import React, { useContext, useState } from 'react';
// Functions
import { TaskContext, TTaskList } from '../../../contexts/taskContext';
// Components
import Button from '../../reusable/button/button';
import HeaderTab from './headerTab/headerTab';
// Styles
import classes from './header.module.scss';
import { TaskListBrowserContext } from '../../../contexts/taskListBrowserContext';
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd';

type THeaderProps = {};

const Header = ({}: THeaderProps) => {
  const { currentlyOpenTaskListId, openTaskLists, setCurrentlyOpenTaskListId, deleteOpenTaskListById, updateOpenTaskListIdsArrayIndex } = useContext(TaskListBrowserContext);

  const onOpenTaskTabClick = (openTaskId: string) => {
    return () => {
      setCurrentlyOpenTaskListId(openTaskId);
    };
  };

  const onOpenTaskTabClose = (openTaskId: string) => {
    return () => {
      deleteOpenTaskListById(openTaskId);
    };
  };

  // Draggabble tasks function
  const onDragEnd = ({ source, destination }: DropResult) => {
    // If dropping outside of the droppable area return nothing
    if (!destination) {
      return;
    }

    updateOpenTaskListIdsArrayIndex(source.index, destination.index);
  };

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId='task-browser-droppable' direction='horizontal'>
          {(provided) => (
            <header {...provided.droppableProps} ref={provided.innerRef} className={classes['root']}>
              {openTaskLists.map((openTask, idx) => (
                <Draggable key={openTask.id} draggableId={openTask.id} index={idx}>
                  {(provided) => (
                    <HeaderTab
                      {...provided.dragHandleProps}
                      {...provided.draggableProps}
                      ref={provided.innerRef}
                      isOpen={openTask.id === currentlyOpenTaskListId}
                      onClick={onOpenTaskTabClick(openTask.id)}
                      onTabClose={onOpenTaskTabClose(openTask.id)}
                    >
                      {openTask && openTask.name ? openTask.name : '[ Removed task ]'}
                    </HeaderTab>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </header>
          )}
        </Droppable>
      </DragDropContext>
    </>
  );
};

export default Header;
