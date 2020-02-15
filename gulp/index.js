'use strict';

const TASK_LIST = [
  'assemble',
  'clean',
  'develop',
  'stylus',
  'text',
];

const getTask = (taskFileName) => require(`./tasks/${taskFileName}.js`);

const getTaskEnum = (taskList) => taskList
  .reduce((result, taskName) => ({
    ...result,
    [taskName]: getTask(taskName),
  }), {});

module.exports = getTaskEnum(TASK_LIST);
