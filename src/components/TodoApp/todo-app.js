import { Component } from 'react';
import './todo-app.css';
import { formatDistanceToNow } from 'date-fns';

import Header from '../Header';
import TaskList from '../TaskList';
import Footer from '../Footer';

export default class TodoApp extends Component {
  constructor(props) {
    super(props);
    this.intervalTimeUpdate = 10000;

    this.generateId = 0;

    this.state = {
      taskInfo: [],
      taskState: [
        { label: 'All', className: 'selected', key: 1 },
        { label: 'Active', key: 2 },
        { label: 'Completed', key: 3 },
      ],
    };
  }

  componentDidMount() {
    // this.interval = setInterval(this.timeUpdate, this.intervalTimeUpdate);
    setInterval(this.timeUpdate, this.intervalTimeUpdate);
  }

  toogleDone = (done, key, className) => {
    this.setState(({ taskInfo }) => {
      const newTaskInfo = taskInfo.map((item) => {
        if (item.key === key) {
          const newItem = { ...item };
          newItem.done = done;
          newItem.className = className;
          return newItem;
        }
        return item;
      });
      return {
        taskInfo: newTaskInfo,
      };
    });
  };

  deletItem = (id) => {
    if (id === 'deleteComplete') {
      this.setState(({ taskInfo }) => {
        const newTaskInfo = taskInfo.filter((item) => !item.done);
        return {
          taskInfo: newTaskInfo,
        };
      });
    } else {
      this.setState(({ taskInfo }) => {
        const idx = taskInfo.findIndex((el) => el.key === id);
        const TaskInfoAfterDelElem = taskInfo.filter((_item, index) => index !== idx);
        return {
          taskInfo: TaskInfoAfterDelElem,
        };
      });
    }
  };

  addItem = (text, min, sec) => {
    const newItem = this.createTodoTask(text, min, sec);
    this.setState(({ taskInfo }) => {
      const newArrForItem = [...taskInfo, newItem];
      return {
        taskInfo: newArrForItem,
      };
    });
  };

  editingLabelTask = (key, newLabel) => {
    this.setState(({ taskInfo }) => {
      const newTaskInfo = taskInfo.map((item) => {
        const newItem = { ...item };
        if (item.key === key) {
          newItem.label = newLabel;
        }
        return newItem;
      });
      return {
        taskInfo: newTaskInfo,
      };
    });
  };

  changeViewTask = (key) => {
    let selectedLabel = 'All';
    this.setState(({ taskState, taskInfo }) => {
      const newTaskState = taskState.map((item) => {
        const newItem = { ...item };
        if (newItem.key === key) {
          newItem.className = 'selected';
          selectedLabel = newItem.label;
        } else {
          newItem.className = '';
        }
        return newItem;
      });
      const newTaskInfo = taskInfo.map((item) => {
        const newItem = { ...item };
        if (selectedLabel === 'Active' && item.done) {
          newItem.className = 'editing';
        } else if (selectedLabel === 'Completed' && !item.done) {
          newItem.className = 'editing';
        } else {
          newItem.className = 'view';
        }
        return newItem;
      });

      return {
        taskState: newTaskState,
        taskInfo: newTaskInfo,
      };
    });
  };

  timeUpdate = () => {
    this.setState(({ taskInfo }) => {
      const newTaskInfo = taskInfo.map((item) => {
        const newItem = { ...item };
        const currentTime = new Date().getTime();
        const elapsedTimeSeconds = Math.round(Math.floor((currentTime - item.createTimeForLabel) / 1000) / 10) * 10;
        let createTime;
        if (elapsedTimeSeconds < 60) {
          createTime = `create ${elapsedTimeSeconds} seconds ago`;
        } else {
          createTime = `${formatDistanceToNow(item.createTimeForLabel, { addSuffix: true }).replace(' ago', '')} ${elapsedTimeSeconds % 60} seconds ago`;
        }
        newItem.createTime = createTime;
        return newItem;
      });
      return {
        taskInfo: newTaskInfo,
      };
    });
  };

  createTodoTask(label, min, sec) {
    const createTime = 'create 0 seconds ago';
    this.generateId += 1;
    return {
      className: 'view',
      label,
      createTime,
      createTimeForLabel: new Date().getTime(),
      key: this.generateId,
      done: false,
      min,
      sec,
    };
  }

  render() {
    const { taskInfo, taskState } = this.state;
    const doneCount = taskInfo.filter((el) => el.done).length;
    const todoCount = taskInfo.length - doneCount;
    return (
      <section className="todoapp">
        <Header addItem={this.addItem} />
        <section className="main">
          <TaskList
            taskInfo={taskInfo}
            onDeleted={this.deletItem}
            toogleDone={this.toogleDone}
            editingLabelTask={this.editingLabelTask}
          />
          <Footer
            todoCount={todoCount}
            taskState={taskState}
            changeViewTask={this.changeViewTask}
            onDeleted={this.deletItem}
          />
        </section>
      </section>
    );
  }
}
