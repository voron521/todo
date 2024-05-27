import React from 'react';
import './task.css';

export default class Task extends React.Component {
  constructor(props) {
    super(props);
    const { Task: task } = props;
    const { label, className, key, min, sec } = task;

    this.state = {
      done: false,
      editing: false,
      label,
      className,
      min,
      sec,
      timerIdState: null,
    };
    this.key = key;
    this.inputRef = React.createRef();
  }

  componentWillUnmount() {
    const { timerIdState } = this.state;
    if (timerIdState !== null) {
      clearInterval(timerIdState);
    }
  }

  itemDel = () => {
    const { onDeleted } = this.props;
    onDeleted(this.key);
  };

  handleCheckboxChange = (e) => {
    const isChecked = e.target.checked;
    const { className } = this.state;
    const { toogleDone } = this.props;
    this.setState(
      () => ({
        done: isChecked,
        className: isChecked ? 'completed' : 'view',
      }),
      () => toogleDone(isChecked, this.key, className)
    );
  };

  timerFunc = () => {
    const { sec, min } = this.state;
    if (sec > 0) {
      this.setState((state) => ({
        sec: state.sec - 1,
      }));
    } else if (min > 0) {
      this.setState((state) => ({
        min: state.min - 1,
        sec: 59,
      }));
    }
  };

  startTimer = () => {
    const { timerIdState } = this.state;
    if (timerIdState === null) {
      const timerId = setInterval(this.timerFunc, 1000);
      this.setState(() => ({
        timerIdState: timerId,
      }));
    }
  };

  crossOut = (event) => {
    const { toogleDone } = this.props;
    if (!event.target.className.includes('icon')) {
      this.setState(
        (state) => {
          const newDone = !state.done;
          return {
            done: newDone,
            className: newDone ? 'completed' : 'view',
          };
        },
        () => {
          const { done, className } = this.state;
          toogleDone(done, this.key, className);
        }
      );
    }
  };

  toggleEditing = () => {
    this.setState(
      (state) => {
        const newEditingState = !state.editing;
        return { editing: newEditingState };
      },
      () => {
        const { editing } = this.state;
        if (editing && this.inputRef.current) {
          this.inputRef.current.focus();
        }
      }
    );
  };

  onSubmit = (event) => {
    const { editingLabelTask } = this.props;
    const { label } = this.state;
    event.preventDefault();
    editingLabelTask(this.key, label);
    this.setState((state) => ({
      editing: !state.editing,
    }));
  };

  onLableChange = (event) => {
    this.setState({
      label: event.target.value,
    });
  };

  stopTimer() {
    const { timerIdState } = this.state;
    if (timerIdState !== null) {
      clearInterval(timerIdState);
    }
    this.setState(() => ({
      timerIdState: null,
    }));
  }

  render() {
    const {
      Task: { className, label, createTime, key },
    } = this.props;
    const { done, editing, label: labelSt, min, sec } = this.state;
    let classNames = className;

    if (done) {
      classNames += ' completed';
    }

    return (
      <li
        key={key}
        className={classNames}
        onClick={this.crossOut}
        // eslint-disable-next-line jsx-a11y/no-noninteractive-element-to-interactive-role
        role="button"
        tabIndex={0}
        onKeyDown={this.handleKeyPress}
      >
        <div className="view">
          <input className="toggle" type="checkbox" checked={done} onChange={this.handleCheckboxChange} />
          <label htmlFor={`checkbox-${key}`}>
            <span className="description">
              {editing ? (
                <form onSubmit={this.onSubmit}>
                  <input
                    ref={this.inputRef}
                    className="labaelChangeInput"
                    placeholder="What needs to be done?"
                    onChange={this.onLableChange}
                    value={labelSt}
                  />
                </form>
              ) : (
                <span>{label}</span>
              )}
            </span>
            <span className="description">
              <button type="button" className="icon icon-play" onClick={this.startTimer.bind(this)} aria-label="play" />
              <button
                type="button"
                className="icon icon-pause"
                onClick={this.stopTimer.bind(this)}
                aria-label="pause"
              />
              <span className="time-span">{sec > 9 ? `${min}:${sec}` : `${min}:0${sec}`}</span>
            </span>
            <span className="created">{createTime}</span>
          </label>
          <button type="button" className="icon icon-edit" onClick={this.toggleEditing} aria-label="Edit" />
          <button type="button" className="icon icon-destroy" onClick={this.itemDel} aria-label="Delete" />
        </div>
      </li>
    );
  }
}

Task.defaultProps = {
  Task: {},
  editingLabelTask: () => {},
  onDeleted: () => {},
  toogleDone: () => {},
};

const isFunction = (props, propName, componentName) => {
  const value = props[propName];
  if (typeof value !== 'function') {
    return new TypeError(`В компоненте ${componentName}: ${propName} должна быть функцией`);
  }
  return undefined;
};

Task.propTypes = {
  Task: (props, propName, componentName) => {
    const value = props[propName];
    if (typeof value !== 'object') {
      return new TypeError(`В компоненте ${componentName}: ${propName} должен быть Объектом`);
    }
    return undefined;
  },

  editingLabelTask: isFunction,
  onDeleted: isFunction,
  toogleDone: isFunction,
};
