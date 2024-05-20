import React from 'react';
import './task.css';

export default class Task extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      done: false,
      editing: false,
      label: props.Task.label,
      className: this.props.Task.className,
    };
    this.key = this.props.Task.key;
  }

  itemDel = () => {
    this.props.onDeleted(this.key);
  };
  handleCheckboxChange = (e) => {
    const isChecked = e.target.checked;
    this.setState(
      () => {
        return {
          done: isChecked,
          className: isChecked ? 'completed' : 'view',
        };
      },
      () => this.props.toogleDone(isChecked, this.key, this.state.className)
    );
  };

  crossOut = (event) => {
    if (!event.target.className.includes('icon-edit')) {
      this.setState(
        (state) => {
          const newDone = !state.done;
          return {
            done: newDone,
            className: newDone ? 'completed' : 'view',
          };
        },
        () => this.props.toogleDone(this.state.done, this.key, this.state.className)
      );
    }
  };

  toggleEditing = () => {
    this.setState((state) => ({
      editing: !state.editing,
    }));
  };

  onSubmit = (event) => {
    event.preventDefault();
    this.props.editingLabelTask(this.key, this.state.label);
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
    console.log('вот просы', this.props);

    const { className, label, createTime, key } = this.props.Task;
    const { done, editing } = this.state;
    let classNames = className;

    if (done) {
      classNames += ' completed';
    }

    return (
      <li key={key} className={classNames} onClick={this.crossOut}>
        <div className="view">
          <input className="toggle" type="checkbox" checked={done} onChange={this.handleCheckboxChange} />
          <label>
            <span className="description">
              {editing ? (
                <form onSubmit={this.onSubmit}>
                  <input
                    className="labaelChangeInput"
                    placeholder="What needs to be done?"
                    autoFocus
                    onChange={this.onLableChange}
                    value={this.state.label}
                  />
                </form>
              ) : (
                <span>{label}</span>
              )}
            </span>
            <span className="created">{createTime}</span>
          </label>
          <button className="icon icon-edit" onClick={this.toggleEditing}></button>
          <button className="icon icon-destroy" onClick={this.itemDel}></button>
        </div>
      </li>
    );
  }
}

Task.defaultProps = {
  changeViewTask: () => {},
  editingLabelTask: () => {},
  onDeleted: () => {},
  toogleDone: () => {},
  todoCount: 'значения нет',
};

const isFunction = (props, propName, componentName) => {
  const value = props[propName];
  if (typeof value !== 'function') {
    return new TypeError(`В компоненте ${componentName}: ${propName} должна быть функцией`);
  }
};

Task.propTypes = {
  Task: (props, propName, componentName) => {
    const value = props[propName];
    if (typeof value !== 'object') {
      return new TypeError(`В компоненте ${componentName}: ${propName} должен быть Объектом`);
    }
  },

  changeViewTask: isFunction,
  editingLabelTask: isFunction,
  onDeleted: isFunction,
  toogleDone: isFunction,
};
