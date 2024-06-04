import { useState, useEffect, useRef, useCallback } from 'react';
import './todo-app.css';
import { formatDistanceToNow } from 'date-fns';

import Header from '../Header';
import TaskList from '../TaskList';
import Footer from '../Footer';

function TodoApp() {
  const intervalTimeUpdate = 10000;
  const [taskInfo, setTaskInfo] = useState([]);
  const [taskState, setTaskState] = useState([
    { label: 'All', className: 'selected', key: 1 },
    { label: 'Active', key: 2 },
    { label: 'Completed', key: 3 },
  ]);
  const generateId = useRef(0);
  const intervalRef = useRef(null);

  const timeUpdate = useCallback(() => {
    setTaskInfo((prevTaskInfo) =>
      prevTaskInfo.map((item) => {
        const currentTime = new Date().getTime();
        const elapsedTimeSeconds = Math.round((currentTime - item.createTimeForLabel) / 10000) * 10;
        let createTime;
        if (elapsedTimeSeconds < 60) {
          createTime = `create ${elapsedTimeSeconds} seconds ago`;
        } else {
          createTime = `${formatDistanceToNow(item.createTimeForLabel, { addSuffix: true }).replace(' ago', '')} ${elapsedTimeSeconds % 60} seconds ago`;
        }
        return { ...item, createTime };
      })
    );
  }, []);

  useEffect(() => {
    intervalRef.current = setInterval(timeUpdate, intervalTimeUpdate);
    return () => clearInterval(intervalRef.current);
  }, [timeUpdate]);

  const toogleDone = useCallback((done, key, className) => {
    setTaskInfo((prevTaskInfo) =>
      prevTaskInfo.map((item) => {
        if (item.key === key && (item.done !== done || item.className !== className)) {
          return { ...item, done, className };
        }
        return item;
      })
    );
  }, []);

  const deletItem = useCallback((id) => {
    setTaskInfo((prevTaskInfo) => {
      if (id === 'deleteComplete') {
        return prevTaskInfo.filter((item) => !item.done);
      }
      return prevTaskInfo.filter((item) => item.key !== id);
    });
  }, []);

  const addItem = useCallback((text, min, sec) => {
    const newItem = createTodoTask(text, min, sec);
    setTaskInfo((prevTaskInfo) => [...prevTaskInfo, newItem]);
  }, []);

  const editingLabelTask = useCallback((key, newLabel) => {
    setTaskInfo((prevTaskInfo) =>
      prevTaskInfo.map((item) => {
        if (item.key === key && item.label !== newLabel) {
          return { ...item, label: newLabel };
        }
        return item;
      })
    );
  }, []);

  const changeViewTask = useCallback((key) => {
    setTaskState((prevTaskState) => {
      let selectedLabel = 'All';
      const newTaskState = prevTaskState.map((item) => {
        if (item.key === key) {
          selectedLabel = item.label;
          return { ...item, className: 'selected' };
        }
        return { ...item, className: '' };
      });

      setTaskInfo((prevTaskInfo) =>
        prevTaskInfo.map((item) => {
          let className = item.done ? 'completed' : 'view';
          if (selectedLabel === 'Active' && item.done) {
            className = 'editing';
          } else if (selectedLabel === 'Completed' && !item.done) {
            className = 'editing';
          }
          return { ...item, className };
        })
      );

      return newTaskState;
    });
  }, []);

  const createTodoTask = (label, min, sec) => {
    generateId.current += 1;
    const createTime = 'create 0 seconds ago';
    return {
      className: 'view',
      label,
      createTime,
      createTimeForLabel: new Date().getTime(),
      key: generateId.current,
      done: false,
      min,
      sec,
    };
  };

  const doneCount = taskInfo.filter((el) => el.done).length;
  const todoCount = taskInfo.length - doneCount;

  return (
    <section className="todoapp">
      <Header addItem={addItem} />
      <section className="main">
        <TaskList
          taskInfo={taskInfo}
          onDeleted={deletItem}
          toogleDone={toogleDone}
          editingLabelTask={editingLabelTask}
        />
        <Footer todoCount={todoCount} taskState={taskState} changeViewTask={changeViewTask} onDeleted={deletItem} />
      </section>
    </section>
  );
}

export default TodoApp;
