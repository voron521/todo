import React, { Component } from 'react';
import './todo-app.css';
import Header from '../Header';
import TaskList from '../TaskList';
import Footer from '../Footer';
import { formatDistanceToNow } from 'date-fns';
export default class TodoApp extends Component {
  intervalTimeUpdate = 10000;
  generateId = 0;
  state = {
    taskInfo: [
      // this.createTodoTask("Completed task"),
      // this.createTodoTask("Editing task"),
      // this.createTodoTask("Active task")
    ],
    taskState: [
      { label: 'All', className: 'selected', key: 1 },
      { label: 'Active', key: 2 },
      { label: 'Completed', key: 3 },
    ],
  };
  changeViewTask = (key) => {
    let selectedLabel = 'All';
    this.setState(({ taskState, taskInfo }) => {
      const newTaskState = taskState.map((item) => {
        let newItem = { ...item };
        if (newItem.key === key) {
          newItem.className = 'selected';
          selectedLabel = newItem.label;
        } else {
          newItem.className = '';
        }
        return newItem;
      });
      const newTaskInfo = taskInfo.map((item) => {
        let newItem = { ...item };
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

  editingLabelTask = (key, newLabel) => {
    this.setState(({ taskInfo }) => {
      const newTaskInfo = taskInfo.map((item) => {
        let newItem = { ...item };
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

  createTodoTask(label) {
    const createTime = `create 0 seconds ago`;

    return {
      className: 'view',
      label,
      createTime,
      createTimeForLabel: new Date().getTime(),
      key: this.generateId++,
      done: false,
    };
  }
  addItem = (text) => {
    const newItem = this.createTodoTask(text);
    this.setState(({ taskInfo }) => {
      const newArrForItem = [...taskInfo, newItem];
      return {
        taskInfo: newArrForItem,
      };
    });
  };
  deletItem = (id) => {
    if (id === 'deleteComplete') {
      this.setState(({ taskInfo }) => {
        const newTaskInfo = taskInfo.filter((item) => {
          return !item.done;
        });
        return {
          taskInfo: newTaskInfo,
        };
      });
    } else {
      this.setState(({ taskInfo }) => {
        const idx = taskInfo.findIndex((el) => el.key === id);
        let TaskInfoAfterDelElem = taskInfo.filter((item, index) => {
          return index !== idx;
        });
        return {
          taskInfo: TaskInfoAfterDelElem,
        };
      });
    }
  };

  toogleDone = (done, key, className) => {
    this.setState(({ taskInfo }) => {
      const newTaskInfo = taskInfo.map((item) => {
        if (item.key === key) {
          let newItem = { ...item };
          newItem.done = done;
          newItem.className = className;
          return newItem;
        } else {
          return item;
        }
      });
      return {
        taskInfo: newTaskInfo,
      };
    });
  };
  componentDidMount() {
    this.interval = setInterval(this.timeUpdate, this.intervalTimeUpdate);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }
  timeUpdate = () => {
    this.setState(({ taskInfo }) => {
      const newTaskInfo = taskInfo.map((item) => {
        let newItem = { ...item };
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

  render() {
    let doneCount = this.state.taskInfo.filter((el) => el.done).length;
    let todoCount = this.state.taskInfo.length - doneCount;
    return (
      <section className="todoapp">
        <Header addItem={this.addItem} />
        <section className="main">
          <TaskList
            taskInfo={this.state.taskInfo}
            onDeleted={this.deletItem}
            toogleDone={this.toogleDone}
            editingLabelTask={this.editingLabelTask}
          />
          <Footer
            todoCount={todoCount}
            taskState={this.state.taskState}
            changeViewTask={this.changeViewTask}
            onDeleted={this.deletItem}
          />
        </section>
      </section>
    );
  }
}
