import React, { Component } from 'react';
import './new-task-form.css';

export default class NewTaskForm extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = { label: '' };
  }
  onSubmit = (event) => {
    event.preventDefault();
    this.props.addItem(this.state.label);
    this.setState({
      label: '',
    });
  };
  onLableChange = (event) => {
    this.setState({
      label: event.target.value,
    });
  };
  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          autoFocus
          onChange={this.onLableChange}
          value={this.state.label}
        />
      </form>
    );
  }
}

NewTaskForm.defaultProps = {
  addItem: () => {},
};
NewTaskForm.propTypes = {
  addItem: (props, propName, componentName) => {
    const value = props[propName];
    if (typeof value !== 'function') {
      return new TypeError(`В компоненте ${componentName}: ${propName} должна быть функцией`);
    }
  },
};
