import { Component } from 'react';

import './task-list.css';
import Task from './Task';

export default class TaskList extends Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  render() {
    const { onDeleted, taskInfo, toogleDone, editingLabelTask } = this.props;
    const tasksArr = taskInfo.map((task) => (
      <Task
        Task={task}
        key={task.key}
        onDeleted={onDeleted}
        toogleDone={toogleDone}
        editingLabelTask={editingLabelTask}
      />
    ));
    return <ul className="todo-list">{tasksArr}</ul>;
  }
}
TaskList.defaultProps = {
  editingLabelTask: () => {},
  toogleDone: () => {},
  onDeleted: () => {},
  taskInfo: [
    {
      className: 'view',
      label: 'ЗАДАЧИ НЕ ПЕРЕДАЮТСЯ!!!',
      createTime: 0,
      createTimeForLabel: 0,
      key: 0,
      done: false,
    },
  ],
};

const isFunction = (props, propName, componentName) => {
  const value = props[propName];
  if (typeof value !== 'function') {
    return new TypeError(`В компоненте ${componentName}: ${propName} должна быть функцией`);
  }
  return undefined;
};

TaskList.propTypes = {
  editingLabelTask: isFunction,
  toogleDone: isFunction,
  onDeleted: isFunction,
  taskInfo: (props, propName, componentName) => {
    const value = props[propName];
    if (!Array.isArray(value)) {
      return new TypeError(`В компоненте ${componentName}: ${propName} должен быть массивом объектов`);
    }
    return undefined;
  },
};
