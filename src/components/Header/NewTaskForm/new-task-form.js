import { Component } from 'react';
import './new-task-form.css';

export default class NewTaskForm extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = { label: '' };
  }

  onSubmit = (event) => {
    const { label } = this.state;
    const { addItem } = this.props;
    event.preventDefault();
    addItem(label);
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
    const { label } = this.props;
    return (
      <form onSubmit={this.onSubmit}>
        <input className="new-todo" placeholder="What needs to be done?" onChange={this.onLableChange} value={label} />
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
