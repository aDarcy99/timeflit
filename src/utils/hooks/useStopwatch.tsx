import React, { useEffect, useState } from 'react';

type TUseStopWatchProps = {
  initialTimeElapsed?: number;
};

const useStopwatch = (options?: TUseStopWatchProps) => {
  const { initialTimeElapsed } = options || {};

  const [timeElapsed, setTimeElapsed] = useState<number>(initialTimeElapsed || 0);

  const [isStopwatchActive, setIsTimerActive] = useState(false);

  const toggle = () => {
    setIsTimerActive(!isStopwatchActive);
  };

  const reset = () => {
    setIsTimerActive(false);
    setTimeElapsed(0);
  };

  useEffect(() => {
    let timerId: NodeJS.Timer;

    if (isStopwatchActive) {
      timerId = setInterval(() => {
        setTimeElapsed(timeElapsed + 1);
      }, 10);
    }

    return () => clearInterval(timerId);
  }, [isStopwatchActive, timeElapsed]);

  return { timeElapsed, isStopwatchActive, toggle, reset };
};

export default useStopwatch;
