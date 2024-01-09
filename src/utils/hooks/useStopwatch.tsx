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
    let worker: undefined | Worker;

    if (!isStopwatchActive) {
      worker?.terminate();
      return;
    }

    worker = new Worker(new URL('../../utils/workers/stopwatchWorker.ts', import.meta.url), { name: `${timeElapsed}` });

    worker.addEventListener('message', (event) => {
      const { timeElapsed } = event.data;

      setTimeElapsed(timeElapsed);
    });

    return () => {
      if (worker) {
        worker.terminate();
      }
    };
  }, [isStopwatchActive]);

  return { timeElapsed, isStopwatchActive, toggle, reset };
};

export default useStopwatch;
