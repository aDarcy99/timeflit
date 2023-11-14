import React, { createContext, ReactNode, useMemo, useState } from 'react';
import { reorderArray } from '../utils/array';
// Functions
import useLocalStorageState from '../utils/hooks/useLocalStorageState';
import { TTaskList } from './taskContext';

// Open task types
type TAddNewOpenTaskListId = (taskId: string) => void;

type TdeleteOpenTaskListById = (taskId: string) => void;

type TUpdateOpenTaskListIdsArrayIndex = (startIndex: number, endIndex: number) => void;

type TTaskListBrowserContext = {
  // Currently editing values and functions
  currentlyOpenTaskListId: string | null;
  setCurrentlyOpenTaskListId: React.Dispatch<React.SetStateAction<string | null>>;
  currentlyOpenTaskList: TTaskList | undefined;
  // Open tasks values and functions
  openTaskLists: Array<TTaskList>;
  openTaskListIds: Array<string>;
  addNewOpenTaskListId: TAddNewOpenTaskListId;
  deleteOpenTaskListById: TdeleteOpenTaskListById;
  updateOpenTaskListIdsArrayIndex: TUpdateOpenTaskListIdsArrayIndex;
};

type TTaskListBrowserProvider = {
  taskLists: Array<TTaskList>;
  children: ReactNode;
};

// NOTE: the use of undefined! is to allow us to use functions in the context without checking if they are undefined (https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/context/)
export const TaskListBrowserContext = createContext<TTaskListBrowserContext>(undefined!);

const TaskListBrowserProvider = ({ children, taskLists }: TTaskListBrowserProvider) => {
  const [openTaskListIds, setOpenTaskListIds] = useLocalStorageState<Array<string>>([], 'openTaskListIds');
  const [currentlyOpenTaskListId, setCurrentlyOpenTaskListId] = useLocalStorageState<string | null>(null, 'currentlyOpenTaskListId');

  // Currently open task derived from currentlyOpenTaskListId
  const currentlyOpenTaskList = useMemo(() => taskLists.find((task) => task.id === currentlyOpenTaskListId), [currentlyOpenTaskListId, taskLists]);

  const taskListsHashMap = useMemo(
    () =>
      taskLists.reduce(
        (acc: { [key: string]: TTaskList }, task: TTaskList) => ({
          ...acc,
          [task.id]: task,
        }),
        {}
      ),
    [taskLists]
  );

  const openTaskLists = useMemo(() => openTaskListIds.map((taskListId) => taskListsHashMap[taskListId]), [openTaskListIds, taskListsHashMap]);

  // Open task functions
  const addNewOpenTaskListId: TAddNewOpenTaskListId = (taskListId) => {
    if (!openTaskListIds.includes(taskListId)) {
      setOpenTaskListIds([...openTaskListIds, taskListId]);
    }

    setCurrentlyOpenTaskListId(taskListId);
  };

  const deleteOpenTaskListById: TdeleteOpenTaskListById = (taskListId) => {
    setOpenTaskListIds(openTaskListIds.filter((openTaskId) => openTaskId !== taskListId));

    // If the delete openTask is open when deleting then assign the new currently open task to the one before the deleted one
    if (taskListId === currentlyOpenTaskListId) {
      const deleteOpenTaskIdx = openTaskListIds.indexOf(taskListId) - 1;

      setCurrentlyOpenTaskListId(openTaskListIds.length <= 1 ? null : openTaskListIds[deleteOpenTaskIdx - 1 < 0 ? 0 : deleteOpenTaskIdx - 1]);
    }
  };

  const updateOpenTaskListIdsArrayIndex: TUpdateOpenTaskListIdsArrayIndex = (startIndex, endIndex) => {
    const reorderedOpenTaskIds = reorderArray(openTaskListIds, startIndex, endIndex);

    setOpenTaskListIds(reorderedOpenTaskIds);
  };

  const taskListBrowserContextValue = {
    // Currently editing values and functions
    currentlyOpenTaskListId,
    currentlyOpenTaskList,
    setCurrentlyOpenTaskListId,
    // Open taskLists values and functions
    openTaskLists,
    openTaskListIds,
    addNewOpenTaskListId,
    deleteOpenTaskListById,
    updateOpenTaskListIdsArrayIndex,
  };

  return <TaskListBrowserContext.Provider value={taskListBrowserContextValue}>{children}</TaskListBrowserContext.Provider>;
};

export default TaskListBrowserProvider;
