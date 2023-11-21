import React, { ChangeEvent, ForwardedRef, forwardRef, useContext, useEffect, useRef, useState } from 'react';
// Types
import { TaskContext, TTask } from '../../../contexts/taskContext';
import { THtmlDivProps } from '../../../types/elementProps';
// Functions
import clsx from 'clsx';
// Components
import Button from '../../reusable/button/button';
import Checkbox from '../../reusable/checkbox/checkbox';
import MultilineTextInput from '../../reusable/multilineTextInput/multilineTextInput';
import Menu from '../../reusable/menu/menu';
import MenuItem from '../../reusable/menu/menuItem/menuItem';
import TimerInput from '../../reusable/timerInput/timerInput';
import Stopwatch, { stopwatchTickEvent } from '../../reusable/stopwatch/stopwatch';
// Assets
import DeleteIcon from '../../../assets/svgs/deleteIcon';
import KebabIcon from '../../../assets/svgs/kebabIcon';
// Styles
import classes from './task.module.scss';
import GrabIcon from '../../../assets/svgs/grabIcon';

interface TTaskProps {
  task: TTask;
  rootProps?: THtmlDivProps;
}

// TODO: Fix useStopwatch constantly rerendering this component when it should only be re-rendering every second
// - Possible solution would be to create a new component with the useStopwatch state with only the elements we need to rerender

const Task = forwardRef(({ task, rootProps, ...props }: TTaskProps, ref: ForwardedRef<HTMLDivElement>) => {
  const kebabMenuRef = useRef<HTMLButtonElement>(null);

  const { deleteSingleTaskById, updateSingleTaskById } = useContext(TaskContext);

  const [nameInput, setNameInput] = useState(task.name);
  const [checkboxInput, setCheckboxInput] = useState(task.isCompleted);
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);

  // Task item functions

  const onDeleteTaskButtonClick = () => {
    deleteSingleTaskById(task.taskListId, task.id);
  };

  const onCheckboxInputClick = () => {
    const newCheckboxValue = !checkboxInput;

    setCheckboxInput(newCheckboxValue);

    updateSingleTaskById(task.taskListId, task.id, { isCompleted: newCheckboxValue });
  };

  const onNameInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const newNameInput = e.target.value;

    setNameInput(newNameInput);
  };

  const onNameInputBlur = () => {
    updateSingleTaskById(task.taskListId, task.id, { name: nameInput });
  };

  const onEstimateTimeInputBlur = (e: ChangeEvent<HTMLInputElement>) => {
    const estimateTime = Number(e.target.value);

    updateSingleTaskById(task.taskListId, task.id, { time: { estimate: estimateTime } });
  };

  const onOptionsButtonClick = () => {
    setIsOptionsOpen(true);
  };

  const onOptionsMenuClose = () => {
    setIsOptionsOpen(false);
  };

  const onStopwatchToggle = () => {};

  const onStopwatchReset = () => {
    updateSingleTaskById(task.taskListId, task.id, { time: { actual: 0 } });
  };

  const onStopwatchTick = ({ timeElapsed }: stopwatchTickEvent) => {
    const secondsElasped = timeElapsed / 100;

    if (secondsElasped % 1 === 0) {
      updateSingleTaskById(task.taskListId, task.id, { time: { actual: secondsElasped } });
    }
  };

  return (
    <div {...rootProps} ref={ref} key={task.id} className={classes['root']}>
      <div className={clsx(classes['item'], classes['checkbox-item'])}>
        <Checkbox className={classes['checkbox']} value={checkboxInput} onClick={onCheckboxInputClick} />
      </div>
      <div className={clsx(classes['item'], classes['name-item'])}>
        <MultilineTextInput
          className={clsx(classes['name-input'])} //!isCurrentlyEditingName && classes['is-hidden']
          autoResize
          tabIndex={0}
          variant='transparent'
          value={nameInput}
          placeholder='Task name'
          onChange={onNameInputChange}
          onBlur={onNameInputBlur}
        />
      </div>
      <div className={classes['item']}>
        <TimerInput
          rootProps={{ className: classes['time-input'] }}
          variant='transparent'
          initialValue={String(task.time.estimate)}
          onTimerInputBlur={onEstimateTimeInputBlur}
        />
      </div>
      <div className={classes['item']}>
        <Stopwatch
          className={classes['time-input']}
          // TODO: Rework the defaultTimeElapsed prop, current prop name does not give context that the defaultTimeElapsed is expected in milliseconds
          // so we have to multiple the actual time by 100.
          defaultTimeElapsed={task.time.actual * 100}
          onStopwatchTick={onStopwatchTick}
          onStopwatchToggle={onStopwatchToggle}
          onStopwatchReset={onStopwatchReset}
        />
      </div>
      <div className={clsx(classes['item'], classes['menu-item'])}>
        <Menu
          className={classes['options-menu']}
          position='bottom'
          targetElement={
            <Button ref={kebabMenuRef} className={classes['menu']} iconOnly variant='transparent' color='grey' onClick={onOptionsButtonClick}>
              <KebabIcon />
            </Button>
          }
          trigger='custom'
          isOpen={isOptionsOpen}
          onClose={onOptionsMenuClose}
        >
          <MenuItem className={classes['delete-button']} onClick={onDeleteTaskButtonClick}>
            <DeleteIcon />
            Delete
          </MenuItem>
        </Menu>
      </div>
    </div>
  );
});

export default Task;
