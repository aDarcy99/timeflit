import React, { ChangeEvent, DetailedHTMLProps, ForwardedRef, forwardRef, InputHTMLAttributes, useState } from 'react';
// Functions
import clsx from 'clsx';
import { convertHoursMinutesSecondsToSeconds } from '../../../utils/time';
// Components
import Menu from '../menu/menu';
import MenuItem from '../menu/menuItem/menuItem';
import TimeDisplay from '../../timeDisplay/timeDisplay';
// Assets
import PauseIcon from '../../../assets/svgs/pauseIcon';
import PlayIcon from '../../../assets/svgs/playIcon';
// Styles
import classes from './timerInput.module.scss';
import textClasses from '../../../styles/classes/text.module.scss';
import { THtmlDivProps, THtmlInputProps } from '../../../types/elementProps';

// TODO: Complete functionality to start timer if we ever need the rest of the timer component (currently this is only being used for setting the estimated time for a task)

interface TTimerInputProps {
  rootProps: THtmlDivProps;
  inputProps?: THtmlInputProps;
  className?: string;
  variant?: 'filled' | 'transparent';
  text?: 'paragraph' | 'heading';
  value?: string;
  state?: 'on' | 'off';
  onTimerReset?: () => void;
  onTimerToggle?: () => void;
  onTimerTick?: (time: number) => void;
  menuOptions?: Array<'toggle' | 'reset' | false>;
}

function convertStringInputToHoursMinutesSecond(timeString: string) {
  // Convert the time string from the user input
  return {
    hours: Number(`${timeString[timeString.length - 6] || 0}${timeString[timeString.length - 5] || 0}`),
    minutes: Number(`${timeString[timeString.length - 4] || 0}${timeString[timeString.length - 3] || 0}`),
    seconds: Number(`${timeString[timeString.length - 2] || 0}${timeString[timeString.length - 1] || 0}`),
  };
}

const TimerInput = forwardRef(
  (
    {
      rootProps,
      inputProps,
      variant = 'filled',
      text = 'paragraph',
      state = 'off',
      onTimerReset,
      onTimerToggle,
      onTimerTick,
      menuOptions = ['reset'],
      ...props
    }: TTimerInputProps,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    const [timerInput, setTimerInput] = useState('');

    const [isTimeSet, setIsTimeSet] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const onTimerInputChange = (e: ChangeEvent<HTMLInputElement>) => {
      // Return nothing if user enters in a value thats not a number or if theres already 6 chars
      if ((!Number(e.target.value) && e.target.value !== '') || e.target.value.includes('.') || e.target.value.length > 6) {
        return;
      }

      setTimerInput(e.target.value);
    };

    const onTimerInputBlur = (e: ChangeEvent<HTMLInputElement>) => {
      if (!e.target.value) {
        return;
      }

      setIsTimeSet(true);
    };

    const handleTimerToggle = () => {
      if (!menuOptions.includes('toggle') || !onTimerToggle) {
        return;
      }

      setIsMenuOpen(false);

      onTimerToggle();
    };

    const handleTimerReset = () => {
      if (!menuOptions.includes('reset')) {
        return;
      }

      setIsMenuOpen(false);
      setIsTimeSet(false);
      setTimerInput('');

      if (onTimerReset) {
        onTimerReset();
      }
    };

    const onDisplayClick = () => {
      if (!isTimeSet) {
        return;
      }

      setIsMenuOpen(true);
    };

    const onMenuClose = () => {
      setIsMenuOpen(false);
    };

    return (
      <Menu
        isOpen={isMenuOpen}
        targetElement={
          <div {...rootProps} className={clsx(classes['root'], rootProps?.className)}>
            <TimeDisplay className={classes['display']} HoursMinutesSeconds={convertStringInputToHoursMinutesSecond(timerInput)} onClick={onDisplayClick} />
            {!isTimeSet ? (
              <input
                {...inputProps}
                ref={ref}
                className={clsx(classes['input'], classes[`variant--${variant}`], textClasses[`${text}-text`], inputProps?.className)}
                type='text'
                value={timerInput}
                onChange={onTimerInputChange}
                onBlur={onTimerInputBlur}
              />
            ) : null}
          </div>
        }
        position='bottom'
        onClose={onMenuClose}
      >
        {menuOptions.includes('toggle') && (
          <MenuItem onClick={handleTimerToggle}>
            {state === 'on' ? (
              <>
                <PauseIcon /> Pause
              </>
            ) : (
              <>
                <PauseIcon />
                Play
              </>
            )}
          </MenuItem>
        )}
        {menuOptions.includes('reset') && <MenuItem onClick={handleTimerReset}>Reset</MenuItem>}
      </Menu>
    );
  }
);

TimerInput.displayName = 'TimerInput';

export default TimerInput;
