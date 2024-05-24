import React from 'react';
import './task.css';

export default class Task extends React.Component {
  constructor(props) {
    super(props);
    const { Task: task } = props;
    const { label, className, key } = task;

    this.state = {
      done: false,
      editing: false,
      label,
      className,
    };
    this.key = key;
    this.inputRef = React.createRef();
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

  crossOut = (event) => {
    const { toogleDone } = this.props;

    if (!event.target.className.includes('icon-edit')) {
      this.setState(
        (state) => {
          const newDone = !state.done;
          return {
            done: newDone,
            className: newDone ? 'completed' : 'view',
          };
        },

        () => {
          const { done } = this.state;
          const { className } = this.state;
          toogleDone(done, this.key, className);
        }
      );
    }
  };

  toggleEditing = () => {
    const { editing } = this.state;
    this.setState(
      (state) => ({ editing: !state.editing }),
      () => {
        if (editing) {
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

  render() {
    const {
      Task: { className, label, createTime, key },
    } = this.props;
    const { done, editing, label: labelSt } = this.state;
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
