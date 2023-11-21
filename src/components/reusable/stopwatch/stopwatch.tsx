import React, { ChangeEvent, DetailedHTMLProps, ForwardedRef, forwardRef, InputHTMLAttributes, useEffect, useState } from 'react';
// Functions
import clsx from 'clsx';
import { convertSecondsToHoursMinutesSeconds } from '../../../utils/time';
// Components
import Menu from '../menu/menu';
import MenuItem from '../menu/menuItem/menuItem';
import TimeDisplay from '../../timeDisplay/timeDisplay';
// Assets
import PauseIcon from '../../../assets/svgs/pauseIcon';
// Styles
import classes from './stopwatch.module.scss';
import PlayIcon from '../../../assets/svgs/playIcon';
import ResetIcon from '../../../assets/svgs/resetIcon';
import useStopwatch from '../../../utils/hooks/useStopwatch';

export type stopwatchTickEvent = { timeElapsed: number };
export type stopwatchToggleEvent = { isActive: boolean };

interface TStopwatchProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  className?: string;
  variant?: 'filled' | 'transparent';
  text?: 'paragraph' | 'heading';
  initialTimeElapsed?: number;
  onStopwatchReset?: () => void;
  onStopwatchToggle?: ({ isActive }: stopwatchToggleEvent) => void;
  onStopwatchTick?: ({ timeElapsed }: stopwatchTickEvent) => void;
}

const Stopwatch = forwardRef(
  (
    {
      variant = 'filled',
      className,
      text = 'paragraph',
      initialTimeElapsed = 0,
      onStopwatchReset,
      onStopwatchToggle,
      onStopwatchTick,
      ...props
    }: TStopwatchProps,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { timeElapsed, isStopwatchActive, toggle, reset } = useStopwatch({ initialTimeElapsed });

    const secondsElasped = timeElapsed / 100;

    const handleTimerToggle = () => {
      setIsMenuOpen(false);

      // Stopwatch toggle hook
      toggle();

      if (onStopwatchToggle) {
        onStopwatchToggle({ isActive: isStopwatchActive });
      }
    };

    const handleTimerReset = () => {
      setIsMenuOpen(false);

      // Stopwatch reset hook
      reset();

      if (onStopwatchReset) {
        onStopwatchReset();
      }
    };

    const onDisplayClick = () => {
      setIsMenuOpen(true);
    };

    const onMenuClose = () => {
      setIsMenuOpen(false);
    };

    useEffect(() => {
      if (onStopwatchTick) {
        onStopwatchTick({ timeElapsed });
      }
    }, [timeElapsed]);

    return (
      <Menu
        isOpen={isMenuOpen}
        targetElement={
          <TimeDisplay
            className={clsx(classes['root'], className)}
            HoursMinutesSeconds={convertSecondsToHoursMinutesSeconds(secondsElasped)}
            onClick={onDisplayClick}
          />
        }
        position='bottom'
        onClose={onMenuClose}
      >
        <MenuItem className={classes['menu-item']} onClick={handleTimerToggle}>
          {isStopwatchActive ? (
            <>
              <PauseIcon />
              Pause
            </>
          ) : (
            <>
              <PlayIcon />
              Play
            </>
          )}
        </MenuItem>
        <MenuItem className={classes['menu-item']} onClick={handleTimerReset}>
          <ResetIcon /> Reset
        </MenuItem>
      </Menu>
    );
  }
);

Stopwatch.displayName = 'Stopwatch';

export default Stopwatch;
