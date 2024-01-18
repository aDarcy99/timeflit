import React, { createContext, useMemo, useState } from "react";
// Functions
import merge from "lodash.merge";
import { v4 as uuid } from "uuid";
import useLocalStorageState from "../utils/hooks/useLocalStorageState";
import { reorderArray } from "../utils/array";
import { createSingleFile, readSingleFile } from "../utils/file";
import { latestVersion } from "../constants/versions";

// Task list types
export type TTaskList = {
  id: string;
  name: string;
  tasks: Array<TTask>;
};
type TCreateSingleTaskList = () => void;

type TDeleteSingleTaskListById = (id: string) => void;

type TUpdateSingleTaskListById = (
  id: string,
  data: Partial<TTaskList>,
  options?: { mergeType?: "deep" | "spread" }
) => void;

type TUpdateTaskListItemArrayIndex = (
  startIndex: number,
  endIndex: number
) => void;

type TDuplicateSingleTaskListById = (id: string) => void;

// Task types
export type TTask = {
  taskListId: string;
  id: string;
  isCompleted: boolean;
  name: string;
  description: string;
  time: { isActive: boolean; estimate: number; actual: number };
};

type TUpdateSingleTaskById = (
  taskListId: string,
  taskId: string,
  data: {
    isCompleted?: boolean;
    name?: string;
    description?: string;
    time?: {
      isActive?: boolean;
      estimate?: number;
      actual?: number;
    };
  }
) => void;

type TDeleteSingleTaskById = (taskListId: string, taskId: string) => void;

type TCreateSingleTask = (taskListId: string) => void;

type TUpdateTaskItemArrayIndex = (
  taskListId: string,
  startIndex: number,
  endIndex: number
) => void;

// Task save/load task functions
type TReadTaskListsFromDisk = () => void;

type TSaveTaskListsToDisk = () => void;

type TTaskListProvider = {
  children: any;
};

type TTaskListContext = {
  // Task list values & functions
  taskLists: Array<TTaskList>;
  createSingleTaskList: TCreateSingleTaskList;
  deleteSingleTaskListById: TDeleteSingleTaskListById;
  updateSingleTaskListById: TUpdateSingleTaskListById;
  updateTaskListItemArrayIndex: TUpdateTaskListItemArrayIndex;
  duplicateSingleTaskListById: TDuplicateSingleTaskListById;
  // Task values & functions
  createSingleTask: TCreateSingleTask;
  deleteSingleTaskById: TDeleteSingleTaskById;
  updateSingleTaskById: TUpdateSingleTaskById;
  updateTaskItemArrayIndex: TUpdateTaskItemArrayIndex;
  // Save/load task functions
  readTaskListsFromDisk: TReadTaskListsFromDisk;
  saveTaskListsToDisk: TSaveTaskListsToDisk;
};

function createDefaultTaskList({ name = "New task list" } = {}): TTaskList {
  return JSON.parse(JSON.stringify({ id: uuid(), name, tasks: [] }));
}

function createDefaultTask(taskListId: string): TTask {
  return JSON.parse(
    JSON.stringify({
      taskListId: taskListId,
      id: uuid(),
      isCompleted: false,
      name: "",
      description: "New task description",
      time: { isActive: false, estimate: 0, actual: 0 },
    })
  );
}

// NOTE: the use of undefined! is to allow us to use functions in the context without checking if they are undefined (https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/context/)
export const TaskContext = createContext<TTaskListContext>(undefined!);

const TaskProvider = ({ children }: TTaskListProvider) => {
  const [taskLists, setTaskLists] = useLocalStorageState<Array<TTaskList>>(
    [],
    "taskLists"
  );

  // Task functions
  const createSingleTaskList: TCreateSingleTaskList = () => {
    setTaskLists([...taskLists, createDefaultTaskList()]);
  };

  const deleteSingleTaskListById: TDeleteSingleTaskListById = (id) => {
    setTaskLists(taskLists.filter((task) => task.id !== id));
  };

  const updateSingleTaskListById: TUpdateSingleTaskListById = (
    id,
    data,
    options
  ) => {
    const { mergeType = "deep" } = options || {};

    switch (mergeType) {
      // NOTE: The spread option is required when we need to update array items inside taskLists (e.g. tasks) because the lodash merge function doesnt properly merge changes to array items.
      case "spread":
        setTaskLists(
          taskLists.map((task) =>
            task.id === id ? { ...task, ...data } : task
          )
        );
        return;

      case "deep":
      default:
        setTaskLists(
          taskLists.map((task) => (task.id === id ? merge(task, data) : task))
        );
        return;
    }
  };

  // TODO: think of more descriptive name for this function
  const updateTaskListItemArrayIndex: TUpdateTaskListItemArrayIndex = (
    startIndex,
    endIndex
  ) => {
    const reorderedTasks = reorderArray(taskLists, startIndex, endIndex);

    setTaskLists(reorderedTasks);
  };

  const duplicateSingleTaskListById: TDuplicateSingleTaskListById = (
    taskListId
  ) => {
    let duplicatedTaskList = taskLists.find(
      (taskList) => taskList.id === taskListId
    );

    if (duplicatedTaskList === undefined) {
      console.error("Error duplicating single task list.");
      return;
    }

    // Create new ids in the tasklist for the tasklist and the child tasks
    duplicatedTaskList = {
      id: uuid(),
      name: `Copy of ${duplicatedTaskList.name}`,
      tasks: duplicatedTaskList.tasks.map((task) => ({
        ...task,
        taskListId: duplicatedTaskList?.id as string,
        id: uuid(),
      })),
    };

    setTaskLists([...taskLists, duplicatedTaskList]);
  };

  // Task item functions
  const createSingleTask: TCreateSingleTask = (taskListId) => {
    setTaskLists(
      taskLists.map((task) =>
        task.id === taskListId
          ? { ...task, tasks: [...task.tasks, createDefaultTask(taskListId)] }
          : task
      )
    );
  };

  const deleteSingleTaskById: TDeleteSingleTaskById = (taskListId, taskId) => {
    setTaskLists(
      taskLists.map((task) =>
        task.id === taskListId
          ? { ...task, tasks: task.tasks.filter((task) => task.id !== taskId) }
          : task
      )
    );
  };

  const updateSingleTaskById: TUpdateSingleTaskById = (
    taskListId,
    taskId,
    data
  ) => {
    setTaskLists(
      taskLists.map((task) =>
        task.id === taskListId
          ? {
              ...task,
              tasks: task.tasks.map((task) =>
                task.id === taskId ? merge(task, data) : task
              ),
            }
          : task
      )
    );
  };

  const updateTaskItemArrayIndex: TUpdateTaskItemArrayIndex = (
    taskListId,
    startIndex,
    endIndex
  ) => {
    const currentlyEditingTask = taskLists.find(
      (task) => taskListId === task.id
    );

    if (!currentlyEditingTask) {
      console.log("Error updating task array index");
      return;
    }

    const reorderedTasks = reorderArray(
      currentlyEditingTask.tasks,
      startIndex,
      endIndex
    );

    updateSingleTaskListById(
      taskListId,
      { tasks: reorderedTasks },
      { mergeType: "spread" }
    );
  };

  // Task save/load task functions
  const readTaskListsFromDisk: TReadTaskListsFromDisk = async () => {
    try {
      let file: any = await readSingleFile(); // Note: We don't know what type file is so we have to

      file = JSON.parse(file);

      if (!file.version) {
        console.error("Version does not exist");
      }

      setTaskLists(file.taskLists);
    } catch (error) {
      console.error(error);
    }
  };

  const saveTaskListsToDisk: TSaveTaskListsToDisk = () => {
    createSingleFile(
      JSON.stringify({
        version: latestVersion,
        taskLists,
      }),
      "timeflit_taskLists",
      "application/json"
    );
  };

  const taskContextValue = {
    // Tasks values and functions
    taskLists,
    createSingleTaskList,
    deleteSingleTaskListById,
    updateSingleTaskListById,
    updateTaskListItemArrayIndex,
    duplicateSingleTaskListById,
    // Task values and functions
    createSingleTask,
    deleteSingleTaskById,
    updateSingleTaskById,
    updateTaskItemArrayIndex,
    // Task save/load task functions
    readTaskListsFromDisk,
    saveTaskListsToDisk,
  };

  return (
    <TaskContext.Provider value={taskContextValue}>
      {children}
    </TaskContext.Provider>
  );
};

export default TaskProvider;
