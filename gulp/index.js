'use strict';

const TASK_LIST = ['default'];

const getTask = (taskFilenameBase) => require(`./tasks/${taskFilenameBase}.js`);

const getTaskEnum = (taskList) => taskList
  .reduce((result, taskName) => ({
    ...result,
    [taskName]: getTask(taskName),
  }), {});

module.exports = getTaskEnum(TASK_LIST);
