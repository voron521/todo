import { Component } from 'react';
import './new-task-form.css';

export default class NewTaskForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      label: '',
      minutes: '',
      seconds: '',
    };
  }

  onSubmit = (event) => {
    event.preventDefault();
    const { label, minutes, seconds } = this.state;
    const { addItem } = this.props;
    const min = minutes === '' ? 0 : minutes;
    const sec = seconds === '' ? 0 : seconds;

    addItem(label, min, sec);
    this.setState({
      label: '',
      minutes: '',
      seconds: '',
    });
  };

  onLableChange = (event) => {
    this.setState({
      label: event.target.value,
    });
  };

  minInput = (event) => {
    const enteredValue = parseInt(event.target.value, 10);
    if (typeof enteredValue !== 'number') {
      // eslint-disable-next-line no-alert
      alert('в поля минуты и секунды вводите числа');
    } else if (enteredValue) {
      this.setState({
        minutes: enteredValue,
      });
    } else {
      this.setState({
        minutes: 0,
      });
    }
  };

  secInput = (event) => {
    const enteredValue = parseInt(event.target.value, 10);
    if (typeof enteredValue !== 'number') {
      // eslint-disable-next-line no-alert
      alert('в поля минуты и секунды вводите числа');
    } else if (enteredValue < 60) {
      this.setState({
        seconds: enteredValue,
      });
    } else {
      this.setState({
        seconds: 0,
      });
    }
  };

  handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      this.onSubmit(event);
    }
  };

  render() {
    const { label, minutes, seconds } = this.state;
    return (
      <form onSubmit={this.onSubmit} className="new-todo-form">
        <input
          className="new-todo"
          placeholder="Task?"
          onChange={this.onLableChange}
          value={label}
          onKeyDown={this.handleKeyDown}
        />
        <input
          className="new-todo-form__timer"
          placeholder="Min"
          onChange={this.minInput}
          value={minutes}
          onKeyDown={this.handleKeyDown}
        />
        <input
          className="new-todo-form__timer"
          placeholder="Sec(<60)"
          onChange={this.secInput}
          value={seconds}
          onKeyDown={this.handleKeyDown}
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
    return undefined;
  },
};
