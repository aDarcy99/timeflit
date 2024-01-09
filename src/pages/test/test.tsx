import React, { useEffect, useState } from 'react';
import { Droppable, Draggable, DragDropContext, DropResult } from 'react-beautiful-dnd';
import Button from '../../components/reusable/button/button';
import { reorderArray } from '../../utils/array';
// Styles
import classes from './test.module.scss';
import '../../utils/workers/testWorker';

type Props = {};

const TestPage = (props: Props) => {
  const [isWorkerActive, setIsWorkerActive] = useState(false);
  const [number, setNumber] = useState(0);

  const onWorkerButtonClick = () => {
    setIsWorkerActive(!isWorkerActive);
  };

  useEffect(() => {
    let worker: undefined | Worker;

    if (!isWorkerActive) {
      worker?.terminate();
      return;
    }

    worker = new Worker(new URL('../../utils/workers/testWorker.ts', import.meta.url), { name: `${new Date().getTime() + number}` });

    worker.addEventListener('message', (event) => {
      const { originalTime, timeElapsed } = event.data;

      document.title = timeElapsed;

      setNumber(timeElapsed);
    });

    return () => {
      if (worker) {
        worker.terminate();
      }
    };
  }, [isWorkerActive]);

  return (
    <div>
      <h2>Test page</h2>
      {number}
      <Button onClick={onWorkerButtonClick}>{!isWorkerActive ? 'Turn on' : 'Turn off'}</Button>
    </div>
  );
};

export default TestPage;
