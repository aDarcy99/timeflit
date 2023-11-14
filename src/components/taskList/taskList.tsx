import React, { useContext, useState, ChangeEvent, useEffect } from 'react';
// Types
import { TaskContext, TTaskList } from '../../contexts/taskContext';
import { DropResult } from 'react-beautiful-dnd';
// Functions
import clsx from 'clsx';
import { DragDropContext } from 'react-beautiful-dnd';
// Components
import Task from './task/task';
import Button from '../reusable/button/button';
import MultilineTextInput from '../reusable/multilineTextInput/multilineTextInput';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import GrabWrapper from '../grabWrapper/grabWrapper';
// Assets
import PlusIcon from '../../assets/svgs/plusIcon';
// Styles
import classes from './taskList.module.scss';
import textClasses from '../../styles/classes/text.module.scss';

type Props = {
  taskList: TTaskList;
};

const TaskList = ({ taskList }: Props) => {
  const { createSingleTask, updateSingleTaskListById, updateTaskItemArrayIndex } = useContext(TaskContext);

  const [nameInput, setNameInput] = useState(taskList.name);

  const onNewTaskButtonClick = () => {
    createSingleTask(taskList.id);
  };

  const onNameInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const newNameInput = e.target.value;

    setNameInput(newNameInput);
  };

  const onNameInputBlur = () => {
    updateSingleTaskListById(taskList.id, { name: nameInput });
  };

  // Draggabble tasks function
  const onDragEnd = ({ source, destination }: DropResult) => {
    // If dropping outside of the droppable area return nothing
    if (!destination) {
      return;
    }

    updateTaskItemArrayIndex(taskList.id, source.index, destination.index);
  };

  useEffect(() => {
    // Change name input whenever current taskList changes
    setNameInput(taskList.name);
  }, [taskList]);

  return (
    <div className={classes['root']}>
      <div className={classes['name-container']}>
        <MultilineTextInput
          className={clsx(classes['name-input'])}
          tabIndex={0}
          variant='transparent'
          text='heading'
          autoResize
          value={nameInput}
          onChange={onNameInputChange}
          onBlur={onNameInputBlur}
        />
        <div className={classes['time-heading-container']}>
          <div className={clsx(classes['estimate-text'], textClasses['subparagraph-text'])}>Estimate</div>
          <div className={clsx(classes['time-heading'], textClasses['subparagraph-text'])}>Actual</div>
        </div>
      </div>
      {taskList.tasks.length > 0 ? (
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId='task-droppable'>
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {taskList.tasks.map((task, idx) => (
                  <Draggable key={task.id} draggableId={task.id} index={idx}>
                    {(provided) => (
                      <GrabWrapper
                        rootProps={{ ...provided.draggableProps, className: classes['task-wrapper'] }}
                        grabberProps={{ ...provided.dragHandleProps }}
                        ref={provided.innerRef}
                      >
                        <Task task={task} />
                      </GrabWrapper>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      ) : null}
      <Button
        className={classes['new-task-list-button']}
        size='sm'
        width='fit-container'
        textAlignment='start'
        color='grey'
        variant='transparent'
        onClick={onNewTaskButtonClick}
      >
        <PlusIcon /> Add new task...
      </Button>
    </div>
  );
};

export default TaskList;
