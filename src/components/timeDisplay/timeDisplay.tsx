import clsx from 'clsx';
import React, { DetailedHTMLProps, ForwardedRef, forwardRef, HTMLAttributes } from 'react';
// Functions
import { convertSecondsToHoursMinutesSeconds } from '../../utils/time';
// Styles
import classes from './timeDisplay.module.scss';

interface TTimeDisplayProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  HoursMinutesSeconds: { hours: number; minutes: number; seconds: number };
}

const TimeDisplay = forwardRef(({ className, HoursMinutesSeconds, ...props }: TTimeDisplayProps, ref: ForwardedRef<HTMLDivElement>) => {
  const { hours, minutes, seconds } = HoursMinutesSeconds;

  const hoursString = hours.toString();
  const minutesString = minutes.toString();
  const secondsString = seconds.toString();

  const hasHours = hours > 0;
  const hasMinutes = minutes > 0;
  const hasSeconds = seconds > 0;

  return (
    <div {...props} ref={ref} className={clsx(classes['root'], className)}>
      <span className={clsx(classes['display-digit'], hasHours && classes['is-active'])}>{hoursString.length > 1 ? hoursString[0] : 0}</span>
      <span className={clsx(classes['display-digit'], hasHours && classes['is-active'])}>{hoursString.length <= 1 ? hoursString[0] : hoursString[1]}</span>
      <span className={clsx(classes['display-seperator'], hasHours && classes['is-active'])}>h</span>

      <span className={clsx(classes['display-digit'], (hasHours || hasMinutes) && classes['is-active'])}>
        {minutesString.length > 1 ? minutesString[0] : 0}
      </span>
      <span className={clsx(classes['display-digit'], (hasHours || hasMinutes) && classes['is-active'])}>
        {minutesString.length <= 1 ? minutesString[0] : minutesString[1]}
      </span>
      <span className={clsx(classes['display-seperator'], (hasHours || hasMinutes) && classes['is-active'])}>m</span>

      <span className={clsx(classes['display-digit'], (hasHours || hasMinutes || hasSeconds) && classes['is-active'])}>
        {secondsString.length > 1 ? secondsString[0] : 0}
      </span>
      <span className={clsx(classes['display-digit'], (hasHours || hasMinutes || hasSeconds) && classes['is-active'])}>
        {secondsString.length <= 1 ? secondsString[0] : secondsString[1]}
      </span>
      <span
        className={clsx(
          classes['display-seperator'],
          (hasHours || hasMinutes || hasSeconds) && classes['is-active'],
          secondsString !== '0' && classes['is-active']
        )}
      >
        s
      </span>
    </div>
  );
});

export default TimeDisplay;
